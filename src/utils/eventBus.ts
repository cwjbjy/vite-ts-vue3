import mitt from 'mitt';

window.eventBus = {};

const emitter = mitt();

window.eventBus.$on = emitter.on;
window.eventBus.$off = emitter.off;
window.eventBus.$emit = emitter.emit;
