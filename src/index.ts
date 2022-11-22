/* eslint-disable @typescript-eslint/unbound-method */

import { MessageManager } from "@kputnins/message-manager";

export enum InputEventMessage {
  KEY_DOWN = "KEY_DOWN",
  KEY_UP = "KEY_UP",
  MOUSE_MOVE = "MOUSE_MOVE",
  MOUSE_CLICK = "MOUSE_CLICK",
  MOUSE_DOWN = "MOUSE_DOWN",
  MOUSE_UP = "MOUSE_UP",
}

export class InputManager {
  private static keyboardKeys: Map<string, boolean> = new Map();

  private static mouseButtons: Map<number, boolean> = new Map();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static init(canvas: HTMLCanvasElement): void {
    window.addEventListener("keydown", InputManager.onKeyDown);
    window.addEventListener("keyup", InputManager.onKeyUp);
    canvas.addEventListener("mousemove", InputManager.onMouseMove);
    canvas.addEventListener("click", InputManager.onMouseClick);
    canvas.addEventListener("mousedown", InputManager.onMouseDown);
    canvas.addEventListener("mouseup", InputManager.onMouseUp);
  }

  private static onMouseMove(event: MouseEvent): void {
    MessageManager.send(InputEventMessage.MOUSE_MOVE, "INPUT_MANAGER", event);
  }

  private static onMouseClick(event: MouseEvent): void {
    MessageManager.send(InputEventMessage.MOUSE_CLICK, "INPUT_MANAGER", event);
  }

  private static onMouseDown(event: MouseEvent): void {
    InputManager.mouseButtons.set(event.button, true);
    MessageManager.send(InputEventMessage.MOUSE_UP, "INPUT_MANAGER", event);
  }

  private static onMouseUp(event: MouseEvent): void {
    InputManager.mouseButtons.delete(event.button);
    MessageManager.send(InputEventMessage.MOUSE_DOWN, "INPUT_MANAGER", event);
  }

  public static isMouseDown(eventButton: number): boolean {
    return InputManager.mouseButtons.get(eventButton) === true;
  }

  public static isMouseUp(eventButton: number): boolean {
    return !InputManager.mouseButtons.get(eventButton);
  }

  private static onKeyDown(event: KeyboardEvent): void {
    InputManager.keyboardKeys.set(event.code, true);
    MessageManager.send(InputEventMessage.KEY_DOWN, "INPUT_MANAGER", event);
  }

  private static onKeyUp(event: KeyboardEvent): void {
    InputManager.keyboardKeys.delete(event.code);
    MessageManager.send(InputEventMessage.KEY_UP, "INPUT_MANAGER", event);
  }

  public static isKeyDown(eventCode: string): boolean {
    return InputManager.keyboardKeys.get(eventCode) === true;
  }

  public static isKeyUp(eventCode: string): boolean {
    return !InputManager.keyboardKeys.get(eventCode);
  }
}
