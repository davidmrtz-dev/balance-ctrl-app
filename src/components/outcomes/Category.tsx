import styled from "styled-components";
import { theme } from "../../Theme";
import { ICategory } from "../../@types";
import { SubFontText } from "../../atoms/text";

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 11px;
  border-radius: 6px;
  margin: 8px 0;
  background-color: ${theme.colors.whites.normal};
  border: 1px solid ${theme.colors.grays.light};
`;

const CategoryContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Category = (category: ICategory): JSX.Element => {
  return(<CategoryWrapper>
    <CategoryContentWrapper>
      {SubFontText(category.name)}
    </CategoryContentWrapper>
  </CategoryWrapper>)
};
