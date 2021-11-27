/* eslint-disable @typescript-eslint/unbound-method */
import MessageManager from '../message/MessageManager';
import InputEventMessage from './InputEventMessage';

export enum SENDER {
  'INPUT_MANAGER' = 'INPUT_MANAGER',
}

class InputManager {
  private static _keys: boolean[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static init(canvas: HTMLCanvasElement): void {
    // Set all key states to not-pressed
    for (let i = 0; i < 256; i += 1) {
      InputManager._keys[i] = false;
    }

    window.addEventListener('keydown', InputManager.onKeyDown);
    window.addEventListener('keyup', InputManager.onKeyUp);
    canvas.addEventListener('mousemove', InputManager.onMouseMove);
    canvas.addEventListener('click', InputManager.onMouseClick);
    canvas.addEventListener('mousedown', InputManager.onMouseDown);
    canvas.addEventListener('mouseup', InputManager.onMouseUp);
  }

  private static onMouseMove(event: MouseEvent): void {
    MessageManager.send(
      InputEventMessage.MOUSE_MOVE,
      SENDER.INPUT_MANAGER,
      event
    );
  }

  private static onMouseClick(event: MouseEvent): void {
    MessageManager.send(
      InputEventMessage.MOUSE_CLICK,
      SENDER.INPUT_MANAGER,
      event
    );
  }

  private static onMouseDown(event: MouseEvent): void {
    MessageManager.send(
      InputEventMessage.MOUSE_UP,
      SENDER.INPUT_MANAGER,
      event
    );
  }

  private static onMouseUp(event: MouseEvent): void {
    MessageManager.send(
      InputEventMessage.MOUSE_DOWN,
      SENDER.INPUT_MANAGER,
      event
    );
  }

  public static isKeyDown(keyCode: number): boolean {
    return InputManager._keys[keyCode] === true;
  }

  public static isKeyUp(keyCode: number): boolean {
    return InputManager._keys[keyCode] === false;
  }

  private static onKeyDown(event: KeyboardEvent): void {
    InputManager._keys[parseInt(event.code)] = true;
    MessageManager.send(
      InputEventMessage.KEY_DOWN,
      SENDER.INPUT_MANAGER,
      event
    );
  }

  private static onKeyUp(event: KeyboardEvent): void {
    InputManager._keys[parseInt(event.code)] = false;
    MessageManager.send(InputEventMessage.KEY_UP, SENDER.INPUT_MANAGER, event);
  }
}

export default InputManager;
