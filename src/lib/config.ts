import type {Event} from 'bilive-danmaku-json';

export type Config = {
    filter: FilterConfig,
    interface: {
        show_medal: boolean,
    }
    broadcaster: BroadcastorConfig,
}

export type BroadcastorConfig = {
    on: boolean,
    ratio: number,
}

export type FilterConfig = {
    danmaku: {
        ignore_emoticon: boolean,
        ignore_junk: boolean,
        keyword_bl: Array<string>,
    },
    gift: {
        ignore_silver: boolean,
        ignore_below: number,
    },
}
type Filter = (evt:Event)=>boolean;

export const DEFAULT_CONFIG:Config = {
    filter: {
        danmaku: {
            ignore_emoticon: false,
            ignore_junk: true,
            keyword_bl: [],
        },
        gift: {
            ignore_silver: false,
            ignore_below: 0,
        },
    },
    interface: {
        show_medal: true,
    },
    broadcaster: {
        on: false,
        ratio: 0,
    }
}

export function as_filter(config: FilterConfig): Filter {
    return ((evt:Event) => {
        let pass = true;
        if(evt.tag==='Danmaku') {
            const cfg = config.danmaku;
            const dmk = evt.data;
            const dmk_msg = dmk.message;
            if(cfg.ignore_junk && dmk.junk_flag===2 ) {
                return false;
            };
            if(cfg.ignore_emoticon && dmk_msg.tag==='Emoticon') {
                return false;
            } else if (dmk_msg.tag==='Plain'){
                for(const blwd of cfg.keyword_bl) {
                    if (dmk_msg.data.message.includes(blwd)) {
                        return false;
                    }
                }
            }
        } else if (evt.tag==='Gift') {
            const cfg = config.gift;
            const dmk = evt.data;
            if(cfg.ignore_silver && dmk.gift.coin_type==='silver') {
                return false;
            } 
            if(dmk.gift.coin_type ==='gold' && dmk.gift.coin_count < cfg.ignore_below) {
                return false;
            }
        }
        return true;
    });
}