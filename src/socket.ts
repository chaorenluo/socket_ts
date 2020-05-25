
interface socketEvent {
  message: Function,
  open: Function,
  close: Function,
  error: Function
}
enum eventType {
  message = 'message',
  close = 'close',
  error = 'error',
  open = 'open'
}

class socket {

  opts: socketEvent;
  connection_url: string;
  socket: WebSocket;

  constructor(opts: socketEvent, connection_url: string) {
    this.opts = opts;
    this.connection_url = connection_url;
    this.connect();
  }

  connect() {
    if (window.WebSocket && this.connection_url) {
      if (this.connection_url.startsWith("//")) {
        const scheme = window.location.protocol == "https" ? "wss" : "ws";
        this.connection_url =   scheme + ":" + this.connection_url;
      }
      this.socket = new WebSocket(this.connection_url);
      this.initEvent();
    } else {
      console.log(window.WebSocket,this.connection_url)
      throw new Error("wsurl為空或该浏览器不支持websocket");
    }
  }

  private initEvent() {
    for (const key in eventType) {
      this.addListener(key);
    }
  }

  private addListener(event: string) {
    this.socket.addEventListener(event, (e) => {
      switch (event) {
        case eventType.open:
          this.opts.open(e)
          break;
        case eventType.message:
          this.opts.message(e)
          break;
        case eventType.close:
          this.opts.close(e)
          break;
        case eventType.error:
          this.opts.error(e)
          break;
        default:
          break;
      }
    })
  }

  send(data: any, closeCallback: Function) {
    if (this.socket.readyState >= 2) {
      closeCallback && closeCallback();
    } else {
      this.socket.send(data);
    }
  }
  
  close() {
    this.socket.close();
  }

}
