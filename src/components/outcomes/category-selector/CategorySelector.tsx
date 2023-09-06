import { useEffect, useState } from "react";
import { ICategory, IOutcome } from "../../../@types";
import { getCategories } from "../../../api/core/Category";
import Alert from "../../alert";
import { Select } from "antd";
import { Category } from "./Category";

export const CategorySelector = ({
  enableSelector,
  values,
  setValues
}: {
  enableSelector: boolean;
  values: IOutcome;
  setValues: (values: IOutcome) => void;
}): JSX.Element => {
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

  const handleSelectorChange = (value: number) => {
    const category = selectorData.categories.find(cat => cat.id === value);

    if (!category) return;

    setValues({ ...values, categories: [category] });
  };

  useEffect(() => {
    if (enableSelector && !selectorData.categories.length) {
      fetchCategories();
    }
  }, [enableSelector, selectorData.categories]);

  return (
    enableSelector ? (
      <Select
        defaultValue={values.categories[0]?.id}
        onChange={handleSelectorChange}
        style={{ width: '100%', margin: '8px 0' }}
        options={selectorData.options}
      />
    ) : (
      <Category {...values.categories[0]} key={values.categories[0]?.id} />
    )
  );
};
