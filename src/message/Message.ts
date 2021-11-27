export default interface Message<S, C> {
  code: string;
  sender: S;
  context: C;
}
