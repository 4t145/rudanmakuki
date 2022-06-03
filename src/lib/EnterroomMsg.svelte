<script lang="ts">
    import type {EnterRoomEvent} from 'bilive-danmaku-json';
    import FansMedal from './FansMedal.svelte';
    export let data:EnterRoomEvent['data'];
</script>

<div class="enterroom-msg">
{#if data}
    {#if data.fans_medal}
        <div class = "fans-medal">
            <FansMedal fans_medal={data.fans_medal}/>
        </div>
    {/if}
    <span class="uname">{data.user.uname}</span>进入了房间
{/if}
</div>
<style>
    .fans-medal {
        width: 8em;
        height: 100%;
        text-shadow: none;
        font-size: smaller;
        margin-right: 4px;
    }
    .uname {
        padding-left: 4px;
        padding-right: 4px;
    }
    .enterroom-msg {
        color: white;
        align-items: center;
        text-shadow: 0px 0px 4px chartreuse, 0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black;

        display: flex;
        padding: 0;
        width: 100%;
        height: 1.5em;
    }
</style>