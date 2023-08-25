export interface IEvents {
  subscribeEvent(nameEvent: string, callback: (...args: any[]) => void): void;
  unsubscribeEvent(nameEvent: string, callback: (key: string) => void): void;
  emitDataEvent(nameEvent: string, ...args: any[]): void;
}