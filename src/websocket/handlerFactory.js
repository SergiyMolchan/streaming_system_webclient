import messageHandlerList from './messageHandlerList';

export default function handlerFactory(event) {
    return messageHandlerList[event];
}