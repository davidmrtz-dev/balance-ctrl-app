// import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { CategoryCreate, CategoryUpdate } from "../../components/categories";
import { getCategories } from "../../api/core/Category";
import { ICategory } from "../../@types";
import Alert from "../../components/alert";
import styled from "styled-components";
import { LoadingMask } from "../../atoms/LoadingMask";
import { Category } from "./Category";
import { Title } from "../../components/title/Title";

const CategoriesContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const Categories = (): JSX.Element => {
  const [category, setCategory] = useState<ICategory | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [categories, setCategories] = useState<ICategory []>([]);

  const fetchCategories = useCallback(async (): Promise<void> => {
    try {
      const data = await getCategories();

      setCategories(data.categories);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (err: any) {
      if (err === undefined) return;

      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.errors || 'There was an error, please try again later'
      }), 1000);
    }
  }, []);

  const handleCategoryClick = (category: ICategory) => {
    setCategory(category);
    setShowUpdate(true);
  }

  const handleUpdateClose = () => {
    setShowUpdate(false);
    setCategory(null);
  }

  const handleCreate = (category: ICategory) => {
    setCategories(categories => [category, ...categories]);
  };

  const handleUpdate = (category: ICategory) => {
    if (!categories.length) return;

    const updatedCategories = categories.map(c => c.id === category.id ? category : c);
    setCategories(updatedCategories);
  };

  const handleDelete = (id: number) => {
    if (!categories.length) return;

    const updatedCategories = categories.filter(c => c.id !== id);
    setCategories(updatedCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return (<>
    {Title('Categories', () => setShowNew(true))}
    {loading
      ? <LoadingMask fixed />
      : <CategoriesContainer reveal={reveal}>
        {(categories || []).map(category =>
          <Category key={category.id} category={category} onClick={() => handleCategoryClick(category)} />
        )}
      </CategoriesContainer>
    }
    <CategoryCreate
      open={showNew}
      closeModal={() => setShowNew(false)}
      handleCreate={handleCreate}
    />
    {category && <CategoryUpdate
      category={category}
      open={showUpdate}
      closeModal={handleUpdateClose}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />}
  </>);
};

export default Categories;
