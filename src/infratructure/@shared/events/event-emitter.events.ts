import 'reflect-metadata';
import { EventEmitter } from 'events';
import { injectable } from 'inversify';

export interface IEvents {
    subscribeEvent(nameEvent: string, callback: (...args: any[]) => void): void;
    unsubscribeEvent(nameEvent: string, callback: (key: string) => void): void;
    emitDataEvent(nameEvent: string, ...args: any[]): void;
}

@injectable()
export class Events implements IEvents {
    private eventEmitter: EventEmitter;
    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    public subscribeEvent(nameEvent: string, callback: (...args: any[]) => void): void {
        this.eventEmitter.on(nameEvent, callback);
    }

    public unsubscribeEvent(nameEvent: string, callback: (key: string) => void): void {
        this.eventEmitter.off(nameEvent, callback);
    }

    public emitDataEvent(nameEvent: string, ...args: any[]): void {
        this.eventEmitter.emit(nameEvent, args);
    }
}
