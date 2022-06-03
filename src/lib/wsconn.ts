import type {Event} from 'bilive-danmaku-json';
type Filter = (evt: Event)=>boolean;

export class WsConn {
    filters: Array<Filter> = [];
    ws: WebSocket;
    onevent: (evt:Event) => void = ()=>{};
    constructor(url:string) {
        this.ws = new WebSocket(url);
        this.ws.onmessage = (evt) => {
            let event:Event = JSON.parse(evt.data);
            let pass = true;
            for(let filter of this.filters) {
                pass = pass && filter(event);
            }
            if(pass) {
                this.onevent(event)
            }
        }
    }


    reconnect() {
        this.ws.close();
        let old_ws = this.ws;
        this.ws = new WebSocket(old_ws.url);
        this.ws.onmessage = old_ws.onmessage;
    }

    bind_status() {

    }
}


export interface FilterRule {

}
