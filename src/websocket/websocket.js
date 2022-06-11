import handlerFactory from "./handlerFactory";

const webSocket = new WebSocket('ws://localhost:8080', 'json');

webSocket.addEventListener('message', async message => {
    const payload = JSON.parse(message.data);
    const handler = handlerFactory(payload.event);
    handler(payload.data);
});

export default webSocket;