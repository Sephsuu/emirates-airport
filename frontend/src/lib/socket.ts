import { io, Socket } from "socket.io-client";

const URL = "http://localhost:3001";
let socket: Socket | null = null;

export const getSocket = (): Socket => {
	if (!socket) {
		socket = io(URL, {
			transports: ["websocket"],
		});
	}
	return socket;
};