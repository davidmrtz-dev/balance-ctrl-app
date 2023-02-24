import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { IOutcome } from "../../@types";
import { theme } from "../../Theme";
import { formatCurrency, formatViewDate, capitalizeFirst } from "../../utils";

const OutcomeContainer = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 5px 0;
  cursor: default;
  position: relative;
`;

const OutcomeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(6, 1fr);
  padding: 10px;
`;

export const Outcome = (outcome: IOutcome): JSX.Element => {
  return <OutcomeContainer>
    <div style={{ textAlign: 'initial' }}>
      <OutcomeGrid>
        <div style={{ gridArea: '1 / 1 / 2 / 2' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            <strong>Name:</strong>
          </Typography.Text>
        </div>
        <div style={{ gridArea: '1 / 2 / 2 / 3', textAlign: 'center' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            {outcome.description}
          </Typography.Text>
        </div>
        <div style={{ gridArea: '2 / 1 / 3 / 2' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            <strong>Purchase date:</strong>
          </Typography.Text>
        </div>
        <div style={{ gridArea: '2 / 2 / 3 / 3', textAlign: 'center' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            {formatViewDate(outcome.purchase_date)}
          </Typography.Text>
        </div>
        <div style={{ gridArea: '3 / 1 / 4 / 2' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            <strong>Amount:</strong>
          </Typography.Text>
        </div>
        <div style={{ gridArea: '3 / 2 / 4 / 3', textAlign: 'center' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            {formatCurrency(outcome.amount)}
          </Typography.Text>
        </div>
        <div style={{ gridArea: '4 / 1 / 5 / 2' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            <strong>Payments:</strong>
          </Typography.Text>
        </div>
        <div style={{ gridArea: '4 / 2 / 5 / 3', textAlign: 'center' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            {outcome.quotas ? `${outcome.quotas} months` : 'N/A'}
          </Typography.Text>
        </div>
        <div style={{ gridArea: '5 / 1 / 6 / 2' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            <strong>Type:</strong>
          </Typography.Text>
        </div>
        <div style={{ gridArea: '5 / 2 / 6 / 3', textAlign: 'center' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            {capitalizeFirst(outcome.transaction_type)}
          </Typography.Text>
        </div>
        <div style={{ gridArea: '6 / 1 / 7 / 2' }}>
          <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
            <strong>Status:</strong>
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
    <ActionBtn onClick={() => {}} />
  </OutcomeContainer>
};

const ActionBtn = ({
  onClick
}: {
  onClick: () => void;
}): JSX.Element => <FontAwesomeIcon
  onClick={onClick}
  style={{
    position: 'absolute',
    top: 5,
    right: 5,
    cursor: 'pointer'
  }}
  color={theme.colors.blacks.normal}
  icon={faEdit}
/>