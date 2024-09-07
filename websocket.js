class WebSocketService {
  socketRef = null;
  reciveSocket = null
  sendSocket = null
  static instance = null;
  callbacks = null;

  static getInstance() {
    if (WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor(){
    this.receiveSocket = null;
    this.sendSocket = null;
    this.callbacks = new Map();
  }

  connect(URL) {
    console.log(URL);
    this.socketRef = new WebSocket(URL);
    this.socketRef.onopen = () => {
      console.log("Connected to the WebSocket server");
    };
    this.socketRef.onmessage = (event) => {
      const message = JSON.parse(event?.data);
      this.callbacks?.get("new_message")(message);
      console.log(event.data);
    };
  }

  newChatMessage(chatMessage) {
    this.socketRef?.send(JSON.stringify(chatMessage));
  }

  addCallbacks(newMessageCallbacks) {
    this.callbacks = new Map([["new_message", newMessageCallbacks]]);
  }
}

const WebSocketInstance = WebSocketService.getInstance();
export default WebSocketInstance;
