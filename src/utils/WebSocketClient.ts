export class WebSocketClient {
  private webSocket: WebSocket;
  constructor() {
    this.webSocket = new WebSocket("ws://localhost:3001");
    this.webSocket.binaryType = "arraybuffer";
  }
  addOnMessageListener(listener: (event: MessageEvent<any>) => void) {
    this.webSocket.onmessage = listener
  }
  send(message: any) {
    this.webSocket.send(message);
  }
}

const webSocketClient = new WebSocketClient();
export default webSocketClient;
