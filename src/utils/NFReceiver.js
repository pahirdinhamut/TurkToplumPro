export default class NotificationReceiver {
  domain = "turktoplum.net";
  url = "";
  scoket = null;
  new_msg_callback = null;
  token = "";

  constructor(token, username, new_msg_callback) {
    if (this.socket) {
      return;
    }
    this.url = "wss://" + this.domain + `/ws/notification/${username}/`;
    this.token = token;
    this.new_msg_callback = new_msg_callback;
    this.connect();
  }

  connect() {
    this.scoket = new WebSocket(this.url, [], { headers: { auth: this.token } });

    this.scoket.onopen = () => {
      console.log("notification socket is opened");
    };

    this.scoket.onmessage = (e) => {
      // a message was received
      const data = JSON.parse(e.data);
      this.new_msg_callback(data);
      console.log("on notification socket receive msg: ", data);
    };

    this.scoket.onerror = (e) => {
      // an error occurred
      console.log("on notification socket error: ", e.message);
    };

    this.scoket.onclose = (e) => {
      // connection closed
      console.log("on notification socket close: ", e.code, e.reason);
    };
  }

  close_socket() {
    if (this.scoket) {
      this.scoket.close();
    }
  }
}
