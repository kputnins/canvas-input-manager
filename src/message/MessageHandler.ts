import Message from './Message';

type MessageHandler<S, C> = (message: Message<S, C>) => void;

export default MessageHandler;
