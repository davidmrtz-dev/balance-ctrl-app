import { Button, Collapse, Modal, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { IOutcomes, OutcomesPagination, OutcomesHash, TransactionType, IOutcomeNew } from "../../@types";
import { IOutcome, newOutcome } from "../../@types/IOutcome";
import { createOutcome } from "../../api/core/Outcome";
import { LoadingMask } from "../../atoms/LoadingMask";
import { theme } from "../../Theme";
import Alert from "../alert";
import { LoadingWrapper } from "../containers";
import { Transaction, TransactionForm, TransactionNav } from ".";
const { Panel } = Collapse;

type Category = 'Recent Outcomes' | 'Fixed Outcomes' | 'Regular Income' | 'Unfixed Income';

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
  keepOpen,
  fetchData,
  type
}: {
  category: Category;
  keepOpen?: boolean;
  fetchData: (offset: number, type: TransactionType) => Promise<IOutcomes>;
  type: TransactionType;
}): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [outcomes, setOutcomes] = useState<OutcomesHash>({});
  const [pages, setPages] = useState<OutcomesPagination>({ current: 0, fixed: 0});
  const [page, setPage] = useState(1);
  const [disableBtns, setDisableBtns] = useState<BtnStatus>({ left: false, right: false });
  const [showNew, setShowNew] = useState(false);

  const handleLeftClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleRightClick = () => {
    if (page < pages.current) {
      setPage(page + 1);
    }
  };

  const handleBlock = useCallback(() => {
    if (!loading) {
      if (page === 1) {
        setDisableBtns({ left: true, right: false });
      } else if (page === pages.current) {
        setDisableBtns({ left: false, right: true });
      } else {
        setDisableBtns({ left: false, right: false });
      }
    } else {
      setDisableBtns({ left: true, right: true });
    }
  }, [loading, page, pages]);

  const handleNew = (outcome: IOutcome) => {
    const rest = outcomes[1].splice(0, 4);
    setOutcomes({ 1: [outcome, ...rest] });
  };

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 100);
  }, [loading]);

  useEffect(() => {
    const fetchOutcomes = async (page: number, offset: number): Promise<void> => {
      try {
        setLoading(true);
        const data = await fetchData(offset, type);
        if (data) {
          setOutcomes({...outcomes,  [page]: data.outcomes });
          setPages({ current: data.total_pages, fixed: data.total_pages });
          setTimeout(() => setLoading(false), 1000);
        }
      } catch(error) {
        Alert({
          icon: 'error',
          title: 'Ops!',
          text: 'There was an error, please try again later'
        });
      }
    };

    if (page && !outcomes[page]) {
      setReveal(false);
      fetchOutcomes(page, (page * 5) - 5);
    }
  }, [page, outcomes, fetchData, type]);

  useEffect(() => {
    handleBlock();
  }, [page, handleBlock]);

  return (
    <>
      <Collapse
        style={{ margin: '16px 0' }}
        defaultActiveKey={keepOpen ? category : undefined}
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
                    <Transaction key={transaction.id} item={transaction} />)}
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
      <TransactionModal
        open={showNew}
        type={type}
        closeModal={() => setShowNew(false)}
        handleCreate={handleNew}
      />
    </>
  );
};

const TransactionModal = ({
  open,
  type,
  closeModal,
  handleCreate
}: {
  open: boolean;
  type: TransactionType;
  closeModal: () => void;
  handleCreate: (outcome: IOutcome) => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<IOutcomeNew>(newOutcome(type));

  const handleSubmit = async() => {
    if (Object.values(values).some(val => val === '')) {
      Alert({
        icon: 'error',
        text: 'All fields are required',
      });
      return;
    }

    setLoading(true);

    try {
      const outcome = await createOutcome({
        ...values
      });
      setTimeout(() => {
        handleCreate(outcome);
        setValues(newOutcome(type));
        setLoading(false);
        closeModal();
      }, 1000);
    } catch(err: any) {
      setTimeout(() => {
        Alert({
          icon: 'error',
          text: (err.error || err.errors[0] || 'There was an error, please try again.'),
        });
        setValues(newOutcome(type));
        setLoading(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(newOutcome(type));
    closeModal();
  };

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<Typography.Text
        style={{...theme.texts.brandFont, fontWeight: 'normal'}}
        > New {type} outcome
        </Typography.Text>}
      style={{
        maxWidth: 360
      }}
      footer={[
        <Button key="cancel" onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
          Submit
        </Button>
      ]}
    >
      <TransactionForm
        values={values}
        setValues={setValues}
      />
    </Modal>
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