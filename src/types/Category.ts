export default interface Category {
  _id: string;
  name: string;
}

export interface CategoryCheck extends Category {
  checked: boolean;
}
