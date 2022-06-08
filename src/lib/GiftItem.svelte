<script lang="ts">

    import Card,{Content} from '@smui/card';
    import type {GiftEvent} from 'bilive-danmaku-json'
    import Avatar from './Avatar.svelte';
    import FansMedal from './FansMedal.svelte'
    export let gift:GiftEvent["data"];
  </script>
  
  <Card style="--mdc-theme-surface: #ffffff88">
    <Content>
      <div class="gift">
        <div class="gift-avatar">
          <Avatar src={gift.user.face}  height="54px" href={`https://space.bilibili.com/${gift.user.uid}`}/>
        </div>
        <div class="gift-uname-medal">
          <div class="gift-uname">
            {gift.user.uname}
          </div>
          <div class="gift-medal">
          {#if gift.fans_medal}
            <FansMedal fans_medal = {gift.fans_medal}></FansMedal>
          {/if}
          </div>
        </div>
        <div class="gift-msg">
          {gift.gift.action}<strong>{gift.gift.gift_name}</strong>x{gift.gift.num}
        </div>
        <div class="gift-price">
          {#if gift.gift.coin_type==='gold'}
          <span class="rmb-sign">￥</span>{gift.gift.num*gift.gift.price/1000}
          {:else}
          {gift.gift.num*gift.gift.price}<span class="guazi-sign">Pt</span>
          {/if}
        </div>
      </div>
    </Content>
  </Card>
  
  <style>
    .gift-msg strong {
      color: green;
    }
    .gift{
      display: grid; 
      grid-template-areas: 
        "avatar uname-medal price"
        "avatar msg         price";
      grid-template-columns: 54px auto 72px;
      grid-template-rows: 27px 27px;
      column-gap: 1em;
    }
    .gift-uname-medal {
      display: flex;
      grid-area: uname-medal;
      align-items:center;
    }
    .gift-medal {
      width: 7em;
      height: 65%;
      font-size: small;
      display: inline;
    }
    .gift-uname {
      display: flex;
      font-size: 20px;
      font-family: "Heiti";
      justify-content: left;
      align-items: center;
      color: black;
      font-weight: bolder;
      padding-right: 0.4em;
    }
    .gift-avatar {
      grid-area: avatar;

    }
    .gift-price {
      font-family: monospace;
      font-size: 20px;
      font-weight: bolder;
      display: flex;
      align-items: center;
      justify-content: center;
      grid-area: price;
    }
    .gift-price>.rmb-sign {
      font-size: 16px;
    }
    .gift-msg {
      align-items: center;
      display: flex;
      grid-area: msg;
    }
  </style>