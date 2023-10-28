// 发布-订阅
// 事件总线

type Key = string | symbol;

type Events = (...args: any[]) => void;

class Observer {
  all: Map<Key, Events[]>;
  constructor() {
    this.all = new Map();
  }

  on(type: Key, handler: Events) {
    const handlers = this.all.get(type);
    if (handlers) {
      handlers.push(handler);
    } else {
      this.all.set(type, [handler]);
    }
  }

  off(type: Key, handler: Events) {
    const handlers = this.all.get(type);
    if (handlers) {
      if (handler) {
        const i = handlers.indexOf(handler);
        if (i > -1) {
          handlers.splice(i, 1);
        }
      } else {
        this.all.set(type, []);
      }
    }
  }

  emit(type: Key, args?: any) {
    const handlers = this.all.get(type);
    if (handlers) {
      handlers.forEach((handler) => handler(args));
    }
  }
}

const observer = new Observer();

window.eventBus = observer;
