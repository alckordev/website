export const orderByDate = (prev: any, current: any) =>
  new Date(current.date).valueOf() - new Date(prev.date).valueOf();
