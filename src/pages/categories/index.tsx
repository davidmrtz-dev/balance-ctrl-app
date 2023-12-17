import { Typography } from "antd";
import styled from "styled-components";
import { theme } from "../../Theme";
import { FontText } from "../../atoms/text";
// import Title from "../../components/outcomes/title";
import { useState } from "react";
import { CategoryCreate } from "../../components/categories";

// const CategoriesContainer = styled.div`
//   opacity: ${p => p.reveal ? 1 : 0};
//   transition: opacity 1s ease-in-out;
//   min-height: 100vh;
// `;

const Categories = (): JSX.Element => {
  const [showNew, setShowNew] = useState(true);

  return (<>
    {/* {Title('Categories', () => {})} */}
    <CategoryCreate open={showNew} closeModal={() => setShowNew(false)} />
  </>);
};

const LinkComponent = ({
  href,
  text
}: {
  href: string;
  text: string;
}): JSX.Element => <a
    target='_blank'
    rel="noreferrer"
    style={{ color: 'inherit' }}
    href={href}
  >
  {text}
</a>;

export default Categories;
