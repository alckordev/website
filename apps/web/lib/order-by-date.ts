export const orderByDate = (prev: any, current: any) =>
  new Date(current.createdAt).valueOf() - new Date(prev.createdAt).valueOf();
