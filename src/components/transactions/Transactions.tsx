import { Button, Collapse } from "antd";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { IOutcomes, OutcomesPagination, OutcomesHash, TransactionType } from "../../@types";
import { IOutcome } from "../../@types/IOutcome";
import { LoadingMask } from "../../atoms/LoadingMask";
import Alert from "../alert";
import { LoadingWrapper } from "../containers";
import { Transaction, TransactionCreate, TransactionNav, TransactionUpdate } from ".";
import { newOutcome } from "../../generators/emptyObjects";
const { Panel } = Collapse;

type BtnStatus = {
  left: boolean;
  right: boolean;
};

const TransactionsContainer = styled.div<{
  reveal: boolean;
}>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  height: 460px;
  width: 100%;
`;

const PanelWrapper = styled.div`
  width: 100%;
  min-height: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Transactions = ({
  category,
  type,
  fetchData,
  updateBalance
}: {
  category: string;
  type: TransactionType;
  fetchData: (offset: number, type: TransactionType) => Promise<IOutcomes>;
  updateBalance: () => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [outcomes, setOutcomes] = useState<OutcomesHash>({});
  const [pages, setPages] = useState<OutcomesPagination>({ current: 0, fixed: 0});
  const [page, setPage] = useState(1);
  const [disableBtns, setDisableBtns] = useState<BtnStatus>({ left: false, right: false });
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [outcome, setOutcome] = useState<IOutcome>(newOutcome(type));

  const handleLeftClick = () => page > 1 && setPage(page - 1);

  const handleRightClick = () => page < pages[type] && setPage(page + 1);

  const handleBlock = useCallback(() => {
    if (!loading) {
      if (page === 1) {
        setDisableBtns({ left: true, right: false });
      } else if (page === pages[type]) {
        setDisableBtns({ left: false, right: true });
      } else {
        setDisableBtns({ left: false, right: false });
      }
    } else {
      setDisableBtns({ left: true, right: true });
    }
  }, [loading, page, pages, type]);

  const handleTransactionClick = (id: number) => {
    if (outcomes && outcomes[page].length) {
      setShowUpdate(true);
      const obj = outcomes[page]
        .find((outcome) => outcome.id === id)
        if (obj) setOutcome(obj);
    }
  };

  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setOutcome(newOutcome(type));
  };

  const fetchOutcomes = useCallback(async (page: number, offset: number): Promise<void> => {
    try {
      setLoading(true);
      const data = await fetchData(offset, type);
      if (data) {
        setOutcomes({...outcomes,  [page]: data.outcomes });
        setPages({ current: data.total_pages, fixed: data.total_pages });
        setTimeout(() => setLoading(false), 1500);
      }
    } catch (error) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: 'There was an error, please try again later'
      }), 1000);
    }
  }, [fetchData, outcomes, type]);

  const handleCreate = useCallback(async () => {
    await fetchOutcomes(page, (page * 5) - 5);
    await updateBalance();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = useCallback(async (outcome: IOutcome) => {
    if (outcomes && outcomes[page].length) {
      const updatedOutcomes = outcomes[page].map(out => {
        if (out.id === outcome.id) {
          return outcome;
        } else {
          return out;
        }
      });
      setOutcomes({ ...outcomes, [page]: updatedOutcomes });
      await updateBalance();
    }
  }, [outcomes, page, updateBalance]);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  useEffect(() => {
    if (page && !outcomes[page]) {
      setReveal(false);
      fetchOutcomes(page, (page * 5) - 5);
    }
  }, [page, outcomes, fetchOutcomes]);

  useEffect(() => {
    handleBlock();
  }, [page, handleBlock]);

  return (
    <>
      <Collapse
        style={{ margin: '16px 0' }}
        defaultActiveKey={category}
        collapsible='disabled'
        expandIcon={() =>
          <AddTransaction
            disabled={!disableBtns.left || (disableBtns.left && disableBtns.right)}
            onClick={() => setShowNew(true)}
          />
        }
        expandIconPosition='end'
      >
        <Panel header={category} key={category} >
          <PanelWrapper>
            {loading
              ? (<LoadingWrapper height='450px'>
                  <LoadingMask />
                </LoadingWrapper>)
              : (<TransactionsContainer reveal={reveal} >
                  {(outcomes[page] || []).map(transaction =>
                    <Transaction
                      key={transaction.id}
                      item={transaction}
                      onClick={() => handleTransactionClick(transaction.id)}
                    />)}
                </TransactionsContainer>
              )
            }
          </PanelWrapper>
          <TransactionNav
            leftClick={handleLeftClick}
            rightClick={handleRightClick}
            leftDisabled={disableBtns.left}
            rightDisabled={disableBtns.right}
            currentPage={page}
          />
        </Panel>
      </Collapse>
      <TransactionCreate
        open={showNew}
        type={type}
        closeModal={() => setShowNew(false)}
        handleCreate={handleCreate}
      />
      <TransactionUpdate
        outcome={outcome}
        open={showUpdate}
        type={type}
        closeModal={handleCloseUpdate}
        handleUpdate={handleUpdate}
      />
    </>
  );
};

const AddTransaction = ({
  disabled,
  onClick
}: {
  disabled: boolean;
  onClick: () => void;
}): JSX.Element =>
  <Button disabled={disabled} onClick={onClick}>
    +
</Button>;