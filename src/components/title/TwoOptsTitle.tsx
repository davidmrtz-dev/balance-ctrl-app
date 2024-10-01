import { Button, Popover, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components"
import { TransactionType } from "../../@types";
import { theme } from "../../Theme";

const TitleWrapper = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const TwoOptsTitle = (
  text: string,
  setType: (type: TransactionType) => void,
  opt_1: string,
  opt_2: string,
  idAdd: string
): JSX.Element => {
  const [open, setOpen] = useState(false);

  return(<TitleWrapper>
    <Typography.Text style={{
      ...theme.texts.brandH5,
      paddingLeft: 5
    }}>
      {text}
    </Typography.Text>
    <Popover
      open={open}
      content={<div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Button style={{
          ...theme.texts.brandSubFont,
          marginBottom: 5
        }}
        onClick={() => {
          setType('current');
          setOpen(false);
        }}
        >
          {opt_1}
        </Button>
        <Button style={{
          ...theme.texts.brandSubFont
        }}
        onClick={() => {
          setType('fixed');
          setOpen(false);
        }}
        >
          {opt_2}
        </Button>
      </div>}
      title={'Payment method'}
      trigger="click"
      overlayStyle={{ width: 150 }}
    >
      <Button
        id={idAdd}
        style={{
          ...theme.texts.brandSubFont,
          width: 46
        }}
        onClick={() => setOpen(!open)}
        >
          +
        </Button>
    </Popover>
  </TitleWrapper>);
};
