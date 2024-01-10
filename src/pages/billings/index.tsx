import { useCallback, useEffect, useState } from "react";
import { getBillings } from "../../api/core/Billing";
import Alert from "../../components/alert";
import { IBilling } from "../../@types";
import styled from "styled-components";
import { LoadingMask } from "../../atoms/LoadingMask";
import { Billing } from "./Billing";
import { Title } from "../../components/title/Title";
import { BillingCreate } from "../../components/billings";

const BillingsContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
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

  const handleCreate = (billing: IBilling) => {
    setBillings(billings => [billing, ...billings]);
  };

  useEffect(() => {
    fetchBillings();
  }, [fetchBillings]);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return (<>
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
  </>);
};

export default Billings;
