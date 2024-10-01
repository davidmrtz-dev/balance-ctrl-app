import { Button, Collapse, Tooltip } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  IOutcome,
  IOutcomes,
  OutcomesHash,
  TransactionType
} from "../../../@types";
import { LoadingMask } from "../../../atoms/LoadingMask";
import Alert from "../../alert";
import { LoadingWrapper } from "../../containers";
import {
  Outcome,
  OutcomesNavigation
} from ".";
import { theme } from "../../../Theme";
import { OutcomeCreate, OutcomeUpdate } from "../../outcomes";
import { FontText } from "../../../atoms/text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
const { Panel } = Collapse;

const OutcomesContainer = styled.div<{
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

export const Outcomes = ({
  id,
  idAdd,
  idPagination,
  category,
  type,
  updateBalance,
  getOutcomes
}: {
  id: string;
  idAdd: string;
  idPagination: string;
  category: string;
  type: TransactionType;
  updateBalance: () => Promise<void>;
  getOutcomes: ({
    page,
    pageSize,
    signal
  }: {
    page: number,
    pageSize: number,
    signal: AbortSignal
  }) => Promise<IOutcomes>;
}): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [outcomes, setOutcomes] = useState<OutcomesHash>({});
  const [outcome, setOutcome] = useState<IOutcome>({} as IOutcome);
  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<{
    current_page: number,
    per_page: number,
    total_pages: number,
    total_per_page: number
  }>({
    current_page: 0,
    per_page: 0,
    total_pages: 0,
    total_per_page: 0
  });
  const abortController = useRef<AbortController | null>(null);

  const handleOutcomeClick = (outcome: IOutcome) => {
    setOutcome(outcome);
    setShowUpdate(true);
  };

  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setOutcome({} as IOutcome);
  };

  const fetchOutcomes = useCallback(async (): Promise<void> => {
    if (abortController.current) {
      abortController.current.abort();
    }

    const newAbortController = new AbortController();
    abortController.current = newAbortController;

    try {
      const data = await getOutcomes({
        page,
        pageSize: 5,
        signal: newAbortController.signal
      });

      setOutcomes(outcomes => ({...outcomes,  [page]: data.outcomes }));
      setMeta(data.meta);
      setTimeout(() => setLoading(false), 1500);
    } catch (err: any) {
      if (err === undefined) return;

      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  }, [page, getOutcomes]);

  const handleCreate = useCallback(async (_outcome: IOutcome) => {
    await fetchOutcomes();
    await updateBalance();
  }, [fetchOutcomes, updateBalance]);

  const handleUpdate = useCallback(async (outcome: IOutcome) => {
    if (outcomes && outcomes[page].length) {
      const updatedOutcomes = outcomes[page].map(o => o.id === outcome.id ? outcome : o);
      setOutcomes(outcomes => ({ ...outcomes, [page]: updatedOutcomes }));
      await updateBalance();
    }
  }, [outcomes, page, updateBalance]);

  useEffect(() => {
    if (!outcomes[page]) {
      setLoading(true);
      fetchOutcomes();
    }
  }, [page, outcomes, fetchOutcomes]);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return (
    <div id={id}>
      <Collapse
        style={{ margin: '16px 0', backgroundColor: theme.colors.grays.light }}
        defaultActiveKey={category}
        collapsible='disabled'
        expandIcon={() =>
          <AddOutcome
            id={idAdd}
            disabled={page !== 1}
            onClick={() => setShowNew(true)}
          />
        }
        expandIconPosition='end'
      >
        <Panel header={FontText(category)} key={category} >
          <PanelWrapper>
            {loading
              ? (<LoadingWrapper height='450px'>
                  <LoadingMask />
                </LoadingWrapper>)
              : (<OutcomesContainer reveal={reveal}>
                  {(outcomes[page] || []).map(outcome =>
                    <Outcome
                      key={outcome.id}
                      item={outcome}
                      onClick={() => handleOutcomeClick(outcome)}
                    />)}
                </OutcomesContainer>
              )
            }
          </PanelWrapper>
          <OutcomesNavigation
            id={idPagination}
            currentPage={page}
            leftClick={() => setPage(page - 1)}
            rightClick={() => setPage(page + 1)}
            leftDisabled={page === 1}
            rightDisabled={page === meta.total_pages}
          />
        </Panel>
      </Collapse>
      <OutcomeCreate
        open={showNew}
        type={type}
        closeModal={() => setShowNew(false)}
        handleCreate={handleCreate}
      />
      <OutcomeUpdate
        outcome={outcome}
        open={showUpdate}
        type={type}
        closeModal={handleCloseUpdate}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

const AddOutcome = ({
  id,
  disabled,
  onClick
}: {
  id: string;
  disabled: boolean;
  onClick: () => void;
}): JSX.Element => (
  <>
    <Tooltip
      title="Purchase addition available only on the first page of paid purchases."
    >
      <FontAwesomeIcon
        icon={faInfoCircle}
        style={{
          padding: '0 5px',
          color: theme.colors.blacks.normal,
          opacity: disabled ? 1 : 0,
          transition: 'opacity .4s ease-in-out'
        }}
        size="1x"
      />
    </Tooltip>
    <Button id={id} disabled={disabled} onClick={onClick}>
      +
    </Button>
  </>
);
