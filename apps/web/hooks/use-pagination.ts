import React from "react";

export const usePagination = (data: Array<any> = [], pageSize: number) => {
  const [page, setPage] = React.useState(1);

  const maxPage = Math.ceil(data.length / pageSize);

  const currentData = () => {
    const begin = (page - 1) * pageSize;
    const end = begin + pageSize;
    return data.slice(0, end);
  };

  const next = () => {
    setPage((page) => Math.min(page + 1, maxPage));
  };

  return { next, currentData, page, maxPage };
};
