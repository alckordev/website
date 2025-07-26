import { useState } from "react";

export default function usePaging<T>(data: T[], size: number) {
  const [page, setPage] = useState(1);

  const maxPages = Math.ceil(data.length / size);

  const getData = (): T[] => {
    const start = (page - 1) * size;
    const end = start + size;
    return data.slice(0, end);
  };

  const goToNext = () => setPage((page) => Math.min(page + 1, maxPages));

  return { getData, goToNext, page, maxPages };
}
