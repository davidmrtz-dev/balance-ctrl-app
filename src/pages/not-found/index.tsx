import styled from "styled-components";
import { FontText } from "../../atoms/text";

const NotFoundContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(25vh - 64px);
`;

const NotFound = (): JSX.Element => {
  return (
    <NotFoundContainer>
      {FontText('Not found purchases')}
    </NotFoundContainer>
  );
};

export default NotFound;
