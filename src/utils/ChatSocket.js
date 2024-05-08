export default class ChatSocket {
  ws = null;
  url = "";
  token = "";
  onReceive = null;
  #maxReconnect = 5;
  current_user = null;
  msgList = [];
  reportStatus = null; //connected(active) a , //closed(inactive) i ,  //error e

  constructor(token, room_id, receiver, user, onReceive, ReportSocketStatus) {
    //"192.168.0.109:8000";
    this.url = `wss://turktoplum.net/ws/chat/${room_id}/${receiver}/`;
    this.token = token;
    this.onReceive = onReceive;
    this.current_user = user;
    this.reportStatus = ReportSocketStatus;
  }

  connect() {
    this.ws = new WebSocket(this.url, [], { headers: { auth: this.token } });

    this.ws.onmessage = (e) => {
      // a message was received
      const data = JSON.parse(e.data);
      if (data && data.type === "chat_message") {
        //data.user(who should receive the message usually the other person)
        if (data.user === this.current_user) {
          console.log("sending seen signal: ", data.user, this.current_user);
          this.ws.send(JSON.stringify({ type: "seen", message: "write what ever you want,ignored", msg_id: data.msg_id }));
        }
        this.onReceive({ text: data.message, send_to: data.user });
        //setChatHistory([{ text: data.message, send_to: data.user }, ...chatHistory]);
      }

      console.log("on chat receive msg: ", data);
    };
    this.ws.onopen = () => {
      if (this.msgList.length > 0) {
        console.log("sending message from msgList");
        for (let msg of this.msgList) {
          this.ws.send(msg);
        }
        this.msgList = [];
      }
      console.log("on chat open msg: ");
      this.reportStatus("a");
    };

    this.ws.onerror = (e) => {
      // an error occurred
      console.log("on chat error: ", e.message);
      this.reportStatus("e");
    };

    this.ws.onclose = (e) => {
      // connection closed
      console.log("on chat close: ", e.code, e.reason);
      this.reportStatus("i");
    };
  }

  sendMSG(msg) {
    if (this.ws == null || this.isClosed()) {
      console.log("socked closed saved to list");
      this.connect();
      this.msgList.push(msg);
    } else {
      this.ws.send(msg);
    }
  }

  closeSocket() {
    if (this.ws) {
      this.ws.close();
    }
  }

  isClosed() {
    if (!this.ws) {
      return true;
    }
    if (this.ws.readyState === this.ws.CLOSED) {
      return true;
    }
    return false;
  }
}
