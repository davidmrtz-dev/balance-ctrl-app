import { Button, Typography } from "antd";
import styled from "styled-components";
import { theme } from "../../Theme";

const OutcomeContainer = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 5px 0;
  cursor: default;
`;

const OutcomeGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
`;

const OutcomeActions = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 100px;
`;

export const Outcome = (): JSX.Element => {
  return <OutcomeContainer>
    <div style={{ flex: 4, textAlign: 'initial' }}>
      <OutcomeGrid>
        <div style={{ gridArea: '1 / 1 / 2 / 2' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            Name:
          </Typography.Text>
        </div>
        <div style={{ gridArea: '1 / 2 / 2 / 3', textAlign: 'center' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            Recreation
          </Typography.Text>
        </div>
        <div style={{ gridArea: '2 / 1 / 3 / 2' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            Date:
          </Typography.Text>
        </div>
        <div style={{ gridArea: '2 / 2 / 3 / 3', textAlign: 'center' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            12-02-2023
          </Typography.Text>
        </div>
        <div style={{ gridArea: '3 / 1 / 4 / 2' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            Amount:
          </Typography.Text>
        </div>
        <div style={{ gridArea: '3 / 2 / 4 / 3', textAlign: 'center' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            $1550.50
          </Typography.Text>
        </div>
        <div style={{ gridArea: '4 / 1 / 5 / 2' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            Payments:
          </Typography.Text>
        </div>
        <div style={{ gridArea: '4 / 2 / 5 / 3', textAlign: 'center' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            12 months
          </Typography.Text>
        </div>
        <div style={{ gridArea: '5 / 1 / 6 / 2' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            Type:
          </Typography.Text>
        </div>
        <div style={{ gridArea: '5 / 2 / 6 / 3', textAlign: 'center' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            Fixed
          </Typography.Text>
        </div>
        <div style={{ gridArea: '6 / 1 / 7 / 2' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            Status:
          </Typography.Text>
        </div>
        <div style={{ gridArea: '6 / 2 / 7 / 3', textAlign: 'center' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            Active
          </Typography.Text>
        </div>
      </OutcomeGrid>
    </div>
    <OutcomeActions>
      <Button>Delete</Button>
      <Button>Update</Button>
    </OutcomeActions>
  </OutcomeContainer>
};