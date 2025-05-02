import { chatBaseUrl } from "./axiosConfig";

class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {
        this.socketRef = null;
        this.isConnected = false;
    }

    connect(chatUrl) {

        if (chatUrl) {
            const path = `${chatBaseUrl}ws/${chatUrl}/`;
            this.socketRef = new WebSocket(path);

            this.socketRef.onopen = () => {
                this.isConnected = true;
            };

            this.socketRef.onmessage = (e) => {
                this.socketNewMessage(e.data);
            };

            this.socketRef.onerror = (error) => {
            };

            this.socketRef.onclose = () => {
                this.isConnected = false;
                this.connect(chatUrl);
            };
        }
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        if (command === "messages") {
            this.callbacks[command](parsedData.messages);
        }
        if (command === "new_message") {
            this.callbacks[command](parsedData.message);
        }
    }

    fetchMessages(chat_id) {
        let user_data_str = localStorage.getItem("user_data");
        let user_data = JSON.parse(user_data_str);

        this.sendMessage({
            command: "fetch_messages",
            chat_id: chat_id,
            token: user_data.access_token,
        });
    }

    newChatMessage(message) {
        this.sendMessage({
            command: "new_message",
            ...message,
        });
    }

    addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks["messages"] = messagesCallback;
        this.callbacks["new_message"] = newMessageCallback;
    }

    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify({ ...data }));
        } catch (error) {
        }
    }

    state() {
        return this.socketRef.readyState;
    }

    waitForSocketConnection(callback) {
        const socket = this.socketRef;

        const recursion = this.waitForSocketConnection;
        setTimeout(() => {
            if (socket.readyState === 1) {
                if (callback !== null) {
                    callback();
                }
                return;
            } else {
                recursion(callback);
            }
        }, 1);
    }
}

const WebSocketMessagesInstance = WebSocketService.getInstance();

export default WebSocketMessagesInstance;
