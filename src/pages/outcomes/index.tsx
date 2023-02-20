import { useEffect, useState } from "react";
import { IOutcome } from "../../@types";
import { getOutcomes } from "../../api/core/Outcome";
import Alert from "../../components/alert";

const Outcomes = (): JSX.Element => {
  const [outcomes, setOutcomes] = useState<IOutcome []>([]);

  useEffect(() => {
    const fetchOutcomes = async(): Promise<void> => {
      try {
        const data = await getOutcomes({ offset: 0, limit: 20 });
        setOutcomes(data.outcomes);
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

  return(<>hello outcomes</>);
};

export default Outcomes;