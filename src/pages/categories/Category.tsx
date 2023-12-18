import { Typography } from "antd";
import styled from "styled-components";
import { ICategory } from "../../@types";
import { ActionButton } from "../../atoms/ActionButton";
import { theme } from "../../Theme";

const CategoriesContainer = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 5px 0;
  cursor: default;
  position: relative;
  flex-direction: column;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px 10px;
`;

export const Category = ({
  category,
  onClick
}: {
  category: ICategory;
  onClick: () => void;
}): JSX.Element => <CategoriesContainer>
    <CategoryContainer>
      <Typography.Text style={{
            ...theme.texts.brandSubFont,
            width: '50%'
          }}>
        <strong>Name:</strong>
      </Typography.Text>
      <Typography.Text style={{
        ...theme.texts.brandSubFont,
        width: '50%',
      }}>
        {category.name}
      </Typography.Text>
    </CategoryContainer>
    <CategoryContainer>
      <Typography.Text style={{
        ...theme.texts.brandSubFont,
        width: '50%'
      }}>
        <strong>Status:</strong>
      </Typography.Text>
      <Typography.Text style={{
          ...theme.texts.brandSubFont,
          width: '50%',
        }}>
        {category["discarded?"] ? 'Discarded' : 'Active'}
      </Typography.Text>
    </CategoryContainer>
  <ActionButton onClick={onClick} />
</CategoriesContainer>;

