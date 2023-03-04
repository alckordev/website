export function formatThreadData(threads: any) {
  const data = Object.keys(threads).map((key) => {
    return {
      ...threads[key],
      key,
    };
  });
  return data[0];
}
