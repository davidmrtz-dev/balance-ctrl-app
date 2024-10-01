import { useCallback, useEffect, useState } from "react";
import { getBillings } from "../../api/core/Billing";
import Alert from "../../components/alert";
import { IBilling } from "../../@types";
import styled from "styled-components";
import { LoadingMask } from "../../atoms/LoadingMask";
import { Billing } from "./Billing";
import { Title } from "../../components/title/Title";
import { BillingCreate, BillingUpdate } from "../../components/billings";

const BillingsContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
`;

const Billings = ():JSX.Element => {
  const [billing, setBilling] = useState<IBilling | null>(null);
  const [billings, setBillings] = useState<IBilling []>([]);
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const fetchBillings = useCallback(async (): Promise<void> => {
    try {
      const data = await getBillings();

      setBillings(data.billings);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (err: any) {
      if (err === undefined) return;

      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.errors || 'There was an error, please try again later'
      }), 1000);
    }
  }, []);

  const handleBillingClick = (billing: IBilling) => {
    setBilling(billing);
    setShowUpdate(true);
  };

  const handleUpdateClose = () => {
    setShowUpdate(false);
    setBilling(null);
  };

  const handleCreate = (billing: IBilling) => {
    setBillings(billings => [billing, ...billings]);
  };

  const handleUpdate = (billing: IBilling) => {
    setBillings(
      billings => billings.map(b => b.id === billing.id ? billing : b)
    );
  };

  const handleDelete = (id: number) => {
    setBillings(billings => billings.filter(b => b.id !== id));
  };

  useEffect(() => {
    fetchBillings();
  }, [fetchBillings]);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return (<div style={{ marginTop: '20px' }}>
    {Title('Payment methods', () => setShowNew(true))}
    {loading
      ? <LoadingMask fixed />
      : <BillingsContainer reveal={reveal}>
        {(billings || []).map(billing =>
          <Billing key={billing.id} billing={billing} onClick={() => handleBillingClick(billing)} />
        )}
      </BillingsContainer>
    }
    <BillingCreate
      open={showNew}
      closeModal={() => setShowNew(false)}
      handleCreate={handleCreate}
    />
    {billing && <BillingUpdate
      billing={billing}
      open={showUpdate}
      closeModal={handleUpdateClose}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />}
  </div>);
};

export default Billings;
