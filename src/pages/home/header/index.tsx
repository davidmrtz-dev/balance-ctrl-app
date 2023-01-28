import styled from "styled-components";
import { Content } from "../../../@types";
import { LoadingMask } from "../../../atoms/LoadingMask";
import { MiddleContent } from "./MiddleContent";
import { TopContent } from "./TopContent";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 360px;
`;

const Header = ({
  content,
  region,
  updating
}: {
  content: Content | null;
  region: string;
  updating: boolean;
}): JSX.Element =>  <HeaderContainer>
  {updating ? <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <LoadingMask />
  </div> : (<div style={{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: 20
  }}>
    <TopContent
      content={content}
      region={region}
    />
    <MiddleContent content={content} />
  </div>)}
</HeaderContainer>;

export default Header;




