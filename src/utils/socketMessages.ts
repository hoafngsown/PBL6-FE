import * as io from "socket.io-client";

const socketMessage = io.connect(API_URL);

export default socketMessage;
