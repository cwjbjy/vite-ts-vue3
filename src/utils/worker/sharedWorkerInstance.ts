export const isSupportSharedWorker = typeof SharedWorker !== 'undefined';

export function sharedWorkerInstance(url: string, options: WorkerOptions): SharedWorker {
  // 如果不支持的时候，mock一个假的，什么也不做
  if (!isSupportSharedWorker) {
    return {
      port: {
        start: () => {},
        postMessage: () => {},
        onmessage: null,
      },
    } as unknown as SharedWorker;
  }
  return new SharedWorker(url, options);
}
