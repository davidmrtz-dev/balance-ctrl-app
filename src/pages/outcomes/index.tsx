import { useEffect, useState } from "react";
import { IOutcome } from "../../@types";
import { getOutcomes } from "../../api/core/Outcome";
import { LoadingMask } from "../../atoms/LoadingMask";
import { Outcome } from "../../components/outcomes";
import Alert from "../../components/alert";
import styled from "styled-components";

const OutcomesContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  height: 100%;
  width: 100%;
`;

const Outcomes = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [outcomes, setOutcomes] = useState<IOutcome []>([]);

  useEffect(() => {
    const fetchOutcomes = async(): Promise<void> => {
      try {
        const data = await getOutcomes({ offset: 0, limit: 20 });
        setOutcomes(data.outcomes);
        setTimeout(() => setLoading(false), 1500);
      } catch (err) {
        setTimeout(() => Alert({
          icon: 'error',
          title: 'Ops!',
          text: 'There was an error, please try again later'
        }), 1000);
      }
    };

    fetchOutcomes();
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return(<>
    {loading
      ? <LoadingMask fixed />
      : <OutcomesContainer reveal={reveal}>
          {(outcomes || []).map(outcome =>
            <Outcome key={outcome.id} {...outcome} />
          )}
        </OutcomesContainer>
    }
  </>);
};

export default Outcomes;