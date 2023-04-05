export type PaginatedQueryResult<T> = {
  total: number;
  currentPage: number;
  items: T[];
};
