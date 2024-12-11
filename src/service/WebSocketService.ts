type ListenerCallback = (message: any) => void;

class WebSocketService {
    private url: string;
    private socket: WebSocket | null;
    private listeners: ListenerCallback[];

    constructor(url: string) {
        this.url = url;
        this.socket = null;
        this.listeners = [];
    }

    connect(): void {
        if (this.socket) {
            console.log('WebSocket is already connected.');
            return;
        }

        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log('WebSocket connection opened.');
        };

        this.socket.onmessage = (event: MessageEvent) => {
            const message = event.data;
            const parsedMessage = JSON.parse(message);
            console.log("Parsed message:", parsedMessage);
            console.log("Type of parsed message:", typeof parsedMessage);

            // Notify all listeners
            this.listeners.forEach((callback) => callback(parsedMessage));
        };

        this.socket.onerror = (error: Event) => {
            console.error('WebSocket error:', error);
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed.');
            this.socket = null;
        };
    }

    addListener(callback: ListenerCallback): void {
        this.listeners.push(callback);
    }

    removeListener(callback: ListenerCallback): void {
        this.listeners = this.listeners.filter((listener) => listener !== callback);
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}

const webSocketService = new WebSocketService('ws://localhost:8080/ticketUpdates');
export default webSocketService;