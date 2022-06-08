<script lang="ts">
  import type {Event, GiftEvent, DanmakuEvent, SuperChatEvent, WatchedUpdateEvent, GuardBuyEvent, EnterRoomEvent} from 'bilive-danmaku-json'
  import { onMount } from "svelte";
  import DanmakuItem from './lib/DanmakuItem.svelte';
  import SuperChatItem from './lib/SuperChatItem.svelte';
  import ConfigInterface from './lib/ConfigInterface.svelte';
  import EnterroomMsg from './lib/EnterroomMsg.svelte';
  import InfoBar from './lib/InfoBar.svelte';
  import GiftItem from './lib/GiftItem.svelte';
  import { WsConn } from './lib/wsconn';
  import Tab, { Label } from '@smui/tab';
  import { type Config, DEFAULT_CONFIG, as_filter} from './lib/config';
  import TabBar from '@smui/tab-bar';
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import { fade } from 'svelte/transition';

  import Button from '@smui/button';
  // import { page } from '$app/stores';
  // let new URLSearchParams()
  let roomid:string|null = null;
  let config:Config = DEFAULT_CONFIG;
  let toogle_config:boolean = false;
  let innerHeight:number;
  let ws_status:'on'|'off'|'connecting' = 'off';
  let watched: number = 0 ;
  let popularity: number = 0;
  let chat_buffer: (GiftEvent|DanmakuEvent|SuperChatEvent)[] = [];
  const CHAT_BUFFER_SIZE = 64;
  let gift_buffer: GiftEvent['data'][] = [];
  let superchat_buffer: SuperChatEvent['data'][] = [];
  let enterroom_data:EnterRoomEvent['data'];
  let chat_area:HTMLElement;
  const TABS = ['chat', 'gift-log', 'superchat-log'];
  let active_tab:'chat'|'gift-log'|'superchat-log' = 'chat';
  let chat_interface_height:number;
  $: if(chat_area) {
    chat_interface_height = innerHeight - chat_area.offsetTop;
  };
  
  onMount(()=>{
    const config_json = localStorage.getItem("config");
    if(config_json) {
      config = JSON.parse(config_json);
    }
    const urlParams = new URLSearchParams(window.location.search);
    roomid = urlParams.get('roomid');
    const PORT:string|null = urlParams.get('port');
    const CONN_URL = `ws://localhost:${PORT?PORT:10200}/${roomid}/json`;
    
    let conn = new WsConn(CONN_URL);
    ws_status = 'connecting';
    conn.filters = [as_filter(config.filter)];
    conn.ws.onopen = () => {
      ws_status = 'on';
    }
    conn.ws.onclose = () => {
      ws_status = 'off';
    }

    conn.onevent = (event) => {
      switch (event.tag) {
        case 'PopularityUpdate':
          popularity = event.data.popularity;
          break;
        case 'WatchedUpdate':
          watched = event.data.num;
          break;
        case 'Danmaku':
          if(chat_buffer.length<=CHAT_BUFFER_SIZE) {
            chat_buffer = [...chat_buffer, event];
          } else {
            chat_buffer = [...chat_buffer, event].slice(1);
            setTimeout(()=>{
              if(active_tab==='chat'&&chat_area) {
                chat_area.lastElementChild.scrollIntoView(false);
              }
            }, 100)
          }
          break;
        case 'Gift':
          let chat_merged_flag = false;
          for (const recent of chat_buffer.slice(-10)) {
            if (recent.tag==='Gift') {
              if (recent.data.user.uid === event.data.user.uid && recent.data.gift.gift_name === event.data.gift.gift_name) {
                recent.data.gift.num += event.data.gift.num;
                recent.data.gift.coin_count += event.data.gift.coin_count;
                chat_merged_flag = true;
                break;
              }
            }
          }
          if (!chat_merged_flag) {            
            if(chat_buffer.length<=CHAT_BUFFER_SIZE) {
              chat_buffer = [...chat_buffer, event];
            } else {
              chat_buffer = [...chat_buffer, event].slice(1);
            }
          }
          let gift_merged_flag = false;

          for (const recent of gift_buffer.slice(-10)) {
            if (recent.user === event.data.user && recent.gift.gift_name === event.data.gift.gift_name) {
              recent.gift.num += event.data.gift.num;
              recent.gift.coin_count += event.data.gift.coin_count;
              gift_merged_flag = true;
              break;
            }
          }
          if (!gift_merged_flag) {
            gift_buffer = [event.data, ...gift_buffer];
          }
          break;
        case 'SuperChat':
          if(chat_buffer.length<=CHAT_BUFFER_SIZE) {
            chat_buffer = [...chat_buffer, event];
          } else {
            chat_buffer = [...chat_buffer, event].slice(1);
          }
          superchat_buffer = [event.data,...superchat_buffer];
          break;
        case 'EnterRoom':
          enterroom_data = event.data;
          break;
        default:
          break;
      }
    }
  });
</script>
<svelte:window bind:innerHeight/>

<Dialog
  bind:open = {toogle_config}
  selection
  aria-labelledby="dialog-title"
  aria-describedby="dialog-content"
  surface$style="width: 850px; max-width: calc(100vw - 32px);background:white;"
>
  <Title id="dialog-title">设置</Title>
  <Content id="dialog-content">
    <ConfigInterface bind:config></ConfigInterface>
  </Content>
  <Actions>
    <Button on:click={() => (null)}>
      <Label>应用</Label>
    </Button>
    <Button on:click={() => (localStorage.setItem("config", JSON.stringify(config)))}>
      <Label>保存</Label>
    </Button>
  </Actions>
</Dialog>

<div id="info">
  <InfoBar bind:watched bind:popularity bind:ws_status bind:roomid bind:toogle_config></InfoBar>
</div>
<div id="tab-page">
  <div id="tab-bar">
    <TabBar tabs={TABS} let:tab bind:active = {active_tab} >
      <Tab {tab}>
        <Label>
          {#if tab==='chat'}
            CHAT
          {:else if tab==='gift-log'}
            礼物记录
          {:else}
            SC记录
          {/if}
        </Label>
      </Tab>
    </TabBar>
  </div>
  <div>
    {#if active_tab==='chat'}
    <div id="enterroom-interface">
      <EnterroomMsg bind:data={enterroom_data}></EnterroomMsg>
    </div>
    <div id="chat-interface" bind:this={chat_area} style="height: {chat_interface_height}px;" >
      {#each chat_buffer as chat}
        {#if chat.tag === 'Danmaku'}
          <DanmakuItem danmaku={chat.data} bind:show_medal= {config.interface.show_medal}></DanmakuItem>
        {:else if chat.tag === 'Gift'}
          <GiftItem gift={chat.data}></GiftItem>
        {:else if chat.tag === 'SuperChat'}
          <SuperChatItem superchat={chat.data}></SuperChatItem>
        {:else}
          else
        {/if}
      {/each}
    </div>
    {:else if active_tab==='gift-log'}
    <div id="gift-log">
      {#each gift_buffer as gift}
      <GiftItem gift={gift}></GiftItem>
      {/each}
    </div>

    {:else if active_tab==='superchat-log'}
    <div  id="superchat-log">
      {#each superchat_buffer as superchat}
      <SuperChatItem superchat={superchat}></SuperChatItem>
      {/each}
    </div>

    {:else}
    <div>

    </div>
    {/if}
  </div>
</div>

<style>
  :root {
    font-family: monospace;
  }
  #info {
    height: auto;
  }
  #chat-interface {
    font-size: 16px;
    display: block;
    resize: vertical;
    overflow-y: auto;
  }
</style>

