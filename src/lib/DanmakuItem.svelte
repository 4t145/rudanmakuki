<script lang="ts">
  import type {Event, DanmakuEvent} from 'bilive-danmaku-json'
  import { onMount } from 'svelte';
  import FansMedal from './FansMedal.svelte'
  export let danmaku:DanmakuEvent["data"];
  export let show_medal = true;
  let self:HTMLElement;
</script>

<div class="danmaku" bind:this={self}>
  {#if show_medal}
  <div class="danmaku-medal">
  {#if danmaku.fans_medal}
    <FansMedal fans_medal = {danmaku.fans_medal}></FansMedal>
  {/if}
  </div>
  {/if}

  <span class="danmaku-uname">
    {danmaku.user.uname}
  </span>
  {#if danmaku.message.tag === 'Emoticon'}
    <span class="danmaku-emoticon">
      <img referrerPolicy="no-referrer" src="{danmaku.message.data.emoticon.url}" alt="[表情:{danmaku.message.data.alt_message}]" height="54px">
    </span>
  {:else}
    <!-- <span class="danmaku-plain-text"> -->
      {danmaku.message.data.message}
    <!-- </span> -->
  {/if}
</div>

<style>
  .danmaku {
    display: block;
    height: auto;
    word-break: break-all;
    text-shadow: 0px 0px 4px chartreuse, 0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black;
    color: white;
    font-size: small;
    line-height: 1.5em;
    overflow-wrap: anywhere;
  }

  .danmaku-medal {
    text-shadow: none;
    font-size: small;
    width: 7em;
  }

  .danmaku-uname, .danmaku-medal, .danmaku-emoticon {
    position: relative;
    display: inline-block;

    vertical-align: auto;
  }

  .danmaku-uname {
    font-family: 'Heiti';
    font-size: small;
    padding-left: 3px;
    padding-right: 0.4em;
    paint-order: stroke fill;
    text-shadow: 0px 0px 3px white,
  }

</style>