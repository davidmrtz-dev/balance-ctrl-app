export type ICategories = {
  categories: ICategory [];
};

export type ICategory = {
  id: number;
  name: string;
  'discarded?'?: boolean;
};
