import styled from "styled-components";
import { FontText } from "../../atoms/text";

const NotFoundContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotFound = (): JSX.Element => {
  return (
    <NotFoundContainer>
      {FontText('Not Found')}
    </NotFoundContainer>
  );
};

export default NotFound;
