// import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { CategoryCreate, Title } from "../../components/categories";
import { getCategories } from "../../api/core/Category";
import { ICategory } from "../../@types";
import Alert from "../../components/alert";
import styled from "styled-components";
import { LoadingMask } from "../../atoms/LoadingMask";
import { Category } from "./Category";

const CategoriesContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const Categories = (): JSX.Element => {
  const [showNew, setShowNew] = useState(false);
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
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  }, []);

  const handleCreate = async (category: ICategory) => {
    if (categories.length) {
      setCategories(categories => [category, ...categories]);
    }
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
          <Category key={category.id} category={category} onClick={() => {}} />
        )}
      </CategoriesContainer>
    }
    <CategoryCreate
      open={showNew}
      closeModal={() => setShowNew(false)}
      handleCreate={handleCreate}
    />
  </>);
};

export default Categories;
