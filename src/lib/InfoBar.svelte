<script lang="ts">
  import Button, {Label} from '@smui/button';
  import {Icon} from '@smui/common'
  import IconButton from '@smui/icon-button';
  export let popularity:number;
  export let watched:number;
  export let ws_status:'on'|'off'|'connecting';
  export let roomid:string|null;
  export let toogle_config: boolean;
</script>

<div class="info-bar">
  <div class="status">
    <div class={
      {
        'connecting':'yellow',
        'on':'green',
        'off':'red',
      }[ws_status]
    }>
      <Icon class="material-icons">power</Icon>
    </div>
    <Icon class="material-icons">house</Icon>{roomid} 
    <Icon class="material-icons">people</Icon>{popularity} 
    <Icon class="material-icons">visibility</Icon>{watched}
  </div>
  <div class="buttons">
    <Button on:click={()=>{toogle_config = true;}} >
      <Label>设置</Label>
      <Icon class="material-icons">
        build
      </Icon>
    </Button>
  </div>
</div>

<style>
  .info-bar {
    display: flex;
    font-family: 'heiti';
    justify-content: space-between;
  }

  .buttons {
    width: 100px;
  }


  .status{
    display: flex;
    align-items: center;
  }

  .yellow {
    color: yellow;
  }
  
  .red {
    color: red;
  }

  .green {
    color: green;
  }
</style>