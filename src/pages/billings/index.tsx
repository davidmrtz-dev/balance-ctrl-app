import { useCallback, useEffect, useState } from "react";
import { getBillings } from "../../api/core/Billing";
import Alert from "../../components/alert";
import { IBilling } from "../../@types";
import styled from "styled-components";
import { LoadingMask } from "../../atoms/LoadingMask";
import { Billing } from "./Billing";
import { Title } from "../../components/title/Title";

const BillingsContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const Billings = ():JSX.Element => {
  const [billings, setBillings] = useState<IBilling []>([]);
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);

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

  useEffect(() => {
    fetchBillings();
  }, [fetchBillings]);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return (<>
    {Title('Payment methods', () => {})}
    {loading
      ? <LoadingMask fixed />
      : <BillingsContainer reveal={reveal}>
        {(billings || []).map(billing =>
          <Billing key={billing.id} billing={billing} onClick={() => {}} />
        )}
      </BillingsContainer>
    }
  </>);
};

export default Billings;
