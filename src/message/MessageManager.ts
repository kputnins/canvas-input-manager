import type Message from './Message';
import type MessageHandler from './MessageHandler';

class MessageManager {
  private static _subscriptions: {
    [code: string]: MessageHandler<any, any>[];
  } = {};

  /**
   * Attach a subscriber to listen to all Messages of a certain Message code
   *
   * @static
   * @param {string} code Message code
   * @param {MessageHandler} handler Callback function to execute upon receiving a message
   * @memberof Message
   */
  public static subscribe(
    code: string,
    handler: MessageHandler<any, any>
  ): void {
    if (!MessageManager._subscriptions[code]) {
      MessageManager._subscriptions[code] = [];
    }
    MessageManager._subscriptions[code]?.push(handler);
  }

  /**
   * Remove a subscriber from a certain Message code
   *
   * @static
   * @param {string} code Message code
   * @param {MessageHandler} handler Callback function to be unsubscribed
   * @memberof Message
   */
  public static unsubscribe(
    code: string,
    handler: MessageHandler<any, any>
  ): void {
    if (!MessageManager._subscriptions[code]) {
      console.warn(
        `Cannot unsubscribe from code ${code} as it is not currently registered`
      );
    } else {
      const index = MessageManager._subscriptions[code]?.indexOf(handler);
      if (index) {
        MessageManager._subscriptions[code]?.splice(index, 1);
        if (MessageManager._subscriptions[code]?.length === 0) {
          delete MessageManager._subscriptions[code];
        }
      }
    }
  }

  /**
   * Sends the message, by executing all the subscribed callback functions
   *
   * @static
   * @param {string} code Message code
   * @param {S} sender Sender of the message
   * @param {C} [context] Extra data to send with the message
   * @memberof Message
   */
  public static send<S, C>(code: string, sender: S, context: C): void {
    if (MessageManager._subscriptions[code]) {
      const message: Message<S, C> = { code, sender, context };
      MessageManager._subscriptions[code]?.forEach((handler) =>
        handler(message)
      );
    }
  }
}

export default MessageManager;
