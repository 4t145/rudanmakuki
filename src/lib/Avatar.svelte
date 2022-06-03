<script lang="ts">
    export let src:string;
    export let href:string;
    export let height:string;
</script>


<a href={href} target="_blank">
    <img class="avatar" referrerPolicy="no-referrer" src={src} alt="<avatar>" height={height}>
</a>
<style>
    .avatar {
        border:groove 0px;
        border-radius: 15%;
    }
    .avatar:hover {
        filter: brightness(1.1)  drop-shadow(1px 1px 2px black);
    }
</style>