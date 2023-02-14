import { Button, Collapse, DatePicker, Form, Input, InputNumber, Modal, Select, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { IOutcomes, OutcomesPagination, OutcomesHash, TransactionType } from "../../@types";
import { LoadingMask } from "../../atoms/LoadingMask";
import { theme } from "../../Theme";
import Alert from "../alert";
import { LoadingWrapper } from "../containers";
import { Transaction, TransactionNav } from "./transaction";
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

const Transactions = ({
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
  const [waitNew, setWaitNew] = useState(false);

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

  const handleConfirm = () => {
    setWaitNew(true);
    setTimeout(() => {
      setWaitNew(false);
      setShowNew(false);
    }, 3000);
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
          text: 'There was an error, please try again later.'
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

  return(
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
                  {(outcomes[page] || []).map(transaction => <Transaction key={transaction.id} item={transaction} />)}
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
        loading={waitNew}
        onConfirm={handleConfirm}
        onCancel={() => setShowNew(false)}
      />
    </>
  );
};

const TransactionModal = ({
  open,
  loading,
  onConfirm,
  onCancel
}: {
  open: boolean;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}): JSX.Element =>
  <Modal
    destroyOnClose
    maskClosable={false}
    closable={false}
    open={open}
    title={<Typography.Text
      style={{...theme.texts.brandFont, fontWeight: 'normal'}}
      > New outcome
      </Typography.Text>}
    onOk={onConfirm}
    onCancel={onCancel}
    style={{
      maxWidth: 360
    }}
    footer={[
      <Button key="cancel" onClick={onCancel} disabled={loading}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" loading={loading} onClick={onConfirm}>
        Submit
      </Button>
    ]}
  >
    <TransactionForm />
</Modal>

const TransactionForm = (): JSX.Element => {
  const onChange = (value: number | null) => {
    console.log('changed', value);
  };

  return(
    <Form
    name='new-transaction'
    layout='vertical'
    initialValues={{}}
    onValuesChange={() => {}}
    style={{ width: '100%' }}
    >
      <Form.Item label="Type" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="current">Current</Select.Option>
          <Select.Option value="fixed">Fixed</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Description" rules={[{ required: true }]}>
        <Input maxLength={20} />
      </Form.Item>
      <Form.Item label='Amount' rules={[{ required: true }]}>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as unknown as 0}
          onChange={onChange}
        />
      </Form.Item>
      <Form.Item label="Purchase date" rules={[{ required: true }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
    </Form>
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

export default Transactions;