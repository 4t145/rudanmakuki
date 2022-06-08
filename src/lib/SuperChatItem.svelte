<script lang="ts">
    import Card, {Content} from '@smui/card';

    import type {SuperChatEvent} from 'bilive-danmaku-json'
    import Avatar from './Avatar.svelte';
    import FansMedal from './FansMedal.svelte'
    export let superchat:SuperChatEvent["data"];
  </script>
  
<Card style="--mdc-theme-surface: #ffffff88">
  <Content>

    <div class="superchat">
      <div class="superchat-avatar">
        <Avatar src={superchat.user.face} height="54px" href={`https://space.bilibili.com/${superchat.user.uid}`}/>
      </div>
      <div class="superchat-uname-medal">
        <div class="superchat-uname">
          {superchat.user.uname}
        </div>
        <div class="superchat-medal">
        {#if superchat.fans_medal}
          <FansMedal fans_medal = {superchat.fans_medal}></FansMedal>
        {/if}
        </div>
      </div>
      <div class="superchat-msg">
        {superchat.message}
      </div>
      <div class="superchat-price">
        <span class="rmb-sign">￥</span>{superchat.price}
      </div>
    </div>
  </Content>
</Card>
  
  <style>
    .superchat{
      display: grid; 
      grid-template-areas: 
        "avatar uname-medal price"
        "msg    msg         price  ";
      grid-template-columns: 54px auto 72px;
      grid-template-rows: 54px auto;
      column-gap: 1em;
      row-gap: 0.4em;

    }

    .superchat-uname-medal {
      grid-area: uname-medal;
      display: flex;
      align-items:center;
    }
    .superchat-medal {
      width: 7em;
      height: 1.4em;
      font-size: small;
      display: inline;
    }
    .superchat-uname {
      display: flex;
      font-size: 20px;
      font-family: "Heiti";
      justify-content: left;
      align-items: center;
      color: black;
      font-weight: bolder;
      padding-right: 0.4em;
    }
    .superchat-avatar {
      grid-area: avatar;
    }
    .superchat-price {
      font-family: monospace;
      font-size: 20px;
      font-weight: bolder;
      display: flex;
      align-items: center;
      justify-content: center;
      grid-area: price;
    }
    .superchat-price>.rmb-sign {
      font-size: 16px;
    }
    .superchat-msg {
      color: black;
      font-size: large;
      font-family: 'Heiti';
      grid-area: msg;
    }
  </style>