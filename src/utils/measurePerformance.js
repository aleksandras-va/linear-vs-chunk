import { performance } from 'perf_hooks';

const measurePerformance = (callback, ...args) => {
  const t1 = performance.now();
  const result = callback(...args);
  const t2 = performance.now();

  const seconds = (t2 - t1) / 1.0;

  console.info(`"${callback.name}" took ${seconds.toFixed(3)} ms`);

  return result;
};

export { measurePerformance };
