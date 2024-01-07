import { useEffect, useState } from "react";
import { ICategory } from "../../@types";
import { getCategories } from "../../api/core/Category";
import { Select } from "antd";
import Alert from "../../components/alert";

export const Selector = (): JSX.Element => {
  const [selectorData, setSelectorData] =
    useState<{
      categories: ICategory[],
      options: { value: number; label: string }[]
    }>({ categories: [], options: [] });

  const fetchCategories = async () => {
    try {
      const storedCategories = localStorage.getItem('categories');

      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        const selectorOptions = parsedCategories.map((cat: ICategory) => ({ value: cat.id, label: cat.name }));
        setSelectorData({ categories: parsedCategories, options: selectorOptions });
      } else {
        const data = await getCategories();
        const selectorOptions = data.categories.map((cat: ICategory) => ({ value: cat.id, label: cat.name }));
        setSelectorData({ categories: data.categories, options: selectorOptions });

        localStorage.setItem('categories', JSON.stringify(data.categories));
      }
    } catch (error: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: (error.message || 'There was an error, please try again later')
      }), 1000);
    }
  };

  useEffect(() => {
    if (!selectorData.categories.length) {
      fetchCategories();
    }
  }, [selectorData.categories]);

  return (<Select
    defaultValue={'lele'}
    onChange={() => {}}
    style={{ width: '100%', margin: '8px 0' }}
    options={selectorData.options}
  />);
};
