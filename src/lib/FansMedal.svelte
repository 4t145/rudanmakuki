<script lang="ts">
    import type {FansMedal} from 'bilive-danmaku-json'
    export let fans_medal:FansMedal;
</script>

<div class="medal">
    {#if fans_medal}
        <div class="medal-name">{fans_medal.medal_name}</div>
        <div class="medal-level">{fans_medal.medal_level}</div>
    {/if}
</div>

<style>
    .medal {
      display: flex;
      height: 100%;
      font-family: 'Heiti';
      --primary: green;
      --secondary: black;
      box-shadow: 1px 1px 3px black;
      box-sizing: border-box;
      border-radius: 4px 4px 4px 4px;
    }
    .medal-name {
      background-color: white;
      color: green;
      width: 70%;
      border: solid 0px;
      box-sizing: border-box;
      border-radius: 4px 0px 0px 4px;
    }
    .medal-level {
      background-color:var(--secondary);
      color: white;
      font-family: 'monospace';
      width: 30%;
      border: solid 0px;
      box-sizing: border-box;
      border-radius: 4px 4px 4px 4px;
    }
    .medal-level, .medal-name {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
</style>