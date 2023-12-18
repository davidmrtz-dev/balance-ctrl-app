// import styled from "styled-components";
import { Title } from "./Title";
import { useState } from "react";
import { CategoryCreate } from "../../components/categories";

// const CategoriesContainer = styled.div`
//   opacity: ${p => p.reveal ? 1 : 0};
//   transition: opacity 1s ease-in-out;
//   min-height: 100vh;
// `;

const Categories = (): JSX.Element => {
  const [showNew, setShowNew] = useState(false);

  return (<>
    {Title('Categories', () => setShowNew(true))}
    <CategoryCreate open={showNew} closeModal={() => setShowNew(false)} />
  </>);
};

export default Categories;
