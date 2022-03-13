import EE from 'eventemitter3';

export class EventEmitter {
  private emitter: EE;
  constructor() {
    this.emitter = new EE();
  }

  subscribe = (event: string, listener: (...args: any[]) => void) => {
    this.emitter.on(event, listener);
  };

  unsubscribe = (event: string, listener: (...args: any[]) => void) => {
    this.emitter.removeListener(event, listener);
  };

  emit = (event: string, payload: any, error = false) => {
    this.emitter.emit(event, payload, error);
  };
}

const eventEmitterClient = new EventEmitter();

export default eventEmitterClient;
