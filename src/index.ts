export default (connection_url, option) => {
  const event = ['message', 'close', 'error', 'open'];

  const opts = Object.assign({}, option);

  const instance = {
    socket: '',
    is_connect: false,

    connect() {
      if ('WebSocket' in window && connection_url) {
        if (connection_url.startsWith('//')) {
          const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
          connection_url = scheme + ':' + connection_url;
        }

        this.socket = new WebSocket(connection_url);
        this.initEvent();
      } else {
        console.log('wsurl為空');
      }
    },
    initEvent() {
      for (let i = 0; i < event.length; i++) {
        this.addListener(event[i]);
      }
    },
    addListener(event) {
      this.socket.addEventListener(event, (e) => {
        switch (event) {
          case 'open':
            this.is_connect = true;
            break;
          case 'close':
            this.is_connect = false;
            break;
        }
        typeof opts[event] == 'function' && opts[event](e);
      });
    },
    send(data, closeCallback) {
      console.log('socket ---> ' + data);

      if (this.socket.readyState >= 2) {
        console.log('ws已經關閉');
        closeCallback && closeCallback();
      } else {
        this.socket.send(data);
      }
    },
    close() {
      this.socket.close();
    }
  };

  instance.connect();
  return instance;
};
