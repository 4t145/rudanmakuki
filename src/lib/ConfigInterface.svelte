<script lang="ts">
    import type { Config } from "./config";
    import List, { Item, Separator, Text } from '@smui/list';
    import Checkbox from '@smui/checkbox';
    import Chip, { Set, TrailingAction } from '@smui/chips';
    import FormField from '@smui/form-field';
    import Button from '@smui/button';
    import Textfield from '@smui/textfield';
    
    export let config: Config;

    let blword_input:string = '';
    let blword_invalid:boolean;
    $: blword_invalid = (blword_input==='' || config.filter.danmaku.keyword_bl.includes(blword_input));
</script>

<div id="config">
    <h1>过滤器</h1>
    <h2>弹幕</h2>
    <List nonInteractive>
        <FormField>
            <Checkbox bind:checked = {config.filter.danmaku.ignore_emoticon} />
            <span slot="label">忽略表情</span>
        </FormField>
        <FormField>
            <Checkbox bind:checked = {config.filter.danmaku.ignore_junk} />
            <span slot="label">忽略抽奖弹幕</span>
        </FormField>
    </List>
    <h3>屏蔽关键词</h3>
    <FormField>

    <Set chips={config.filter.danmaku.keyword_bl} let:chip input>
        <Chip {chip}>
            <Text>{chip}</Text>
            <TrailingAction icon$class="material-icons">cancel</TrailingAction>
        </Chip>
    </Set>
    </FormField>
    <Textfield bind:value={blword_input} bind:invalid={blword_invalid}></Textfield>
    <Button on:click={()=>{
        if(!blword_invalid){
            config.filter.danmaku.keyword_bl = [...config.filter.danmaku.keyword_bl, blword_input];
            blword_input = '';
        }
    }}>添加</Button>

    <h2>礼物</h2>
    <FormField>
        <Checkbox bind:checked = {config.filter.gift.ignore_silver} />
        <span slot="label">忽略免费礼物</span>
    </FormField>
    <h3>最低价格</h3>
    <FormField>
        <Textfield
        bind:value={config.filter.gift.ignore_below}
        type="number"
        input$step="10"
        />
    </FormField>
    <h1>界面</h1>
    <FormField>
        <Checkbox bind:checked = {config.interface.show_medal} />
        <span slot="label">展示粉丝牌</span>
    </FormField>
    <!-- <h1>播音员</h1>
    <FormField>
        <Checkbox bind:checked = {config.broadcaster.on} />
        <span slot="label">启用播音员</span>
    </FormField> -->
</div>

<style>
    #config {
        padding-left: 30px;
    }
</style>