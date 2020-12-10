export default interface Table<T> {
  sortColumn: { path: string; order: 'asc | desc' };
  onSort: (arg: any) => void;
  columns: { path: string; label: string };
  data: T;
}
