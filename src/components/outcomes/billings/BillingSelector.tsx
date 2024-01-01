import { useEffect, useState } from "react";
import styled from "styled-components";
import { IBilling, IOutcome } from "../../../@types";
import { getBillings } from "../../../api/core/Billing";
import Alert from "../../alert";
import { Button, Modal, Typography } from "antd";
import { FontText } from "../../../atoms/text";
import { theme } from "../../../Theme";
import { LoadingMask } from "../../../atoms/LoadingMask";
import { Billing } from "./Billing";

const BillingContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export const BillingSelector = ({
  values,
  setValues
}: {
  values: IOutcome;
  setValues: (values: IOutcome) => void;
}): JSX.Element => {
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [billings, setBillings] = useState<IBilling []>([]);

  const fetchBillings = async () => {
    setLoading(true);
    try {
      const data = await getBillings();
      const updatedBillings = values.transaction_type === 'fixed' ?
        data.billings.filter(billing => billing.billing_type === 'credit') :
        data.billings.filter(billing => billing.billing_type === 'debit' || billing.billing_type === 'cash');
      setBillings(
        values.billings.length > 0
          ? updatedBillings.filter(billing => billing.id !== values.billings[0].id)
          : updatedBillings
      );
      setTimeout(() => setLoading(false), 1000);
    } catch (error: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: (error.message || 'There was an error, please try again later')
      }), 1000);
    }
  };

  useEffect(() => {
    if (showList && !billings.length) {
      fetchBillings();
    }
  }, [showList, billings]);

  const handleBillingChange = (billing: IBilling) => {
    setValues({ ...values, billings: [billing] });
    setShowList(false);
  }

  const footerComponents = [
    <Button
      key="cancel"
      onClick={() => setShowList(false)}
      disabled={loading}
    >
      {FontText('Cancel')}
    </Button>
  ];

  return (
    <>
      <Button
        type='primary'
        style={{
          width: '100%',
          marginBottom: 16,
          ...theme.texts.brandFont }}
        onClick={() => setShowList(true)}
      >
        {values.billings.length > 0 ? 'Change' : 'Select'} payment method
      </Button>
      <Modal
        destroyOnClose
        maskClosable={false}
        closable={false}
        open={showList}
        title={<Typography.Text
          style={{...theme.texts.brandFont, fontWeight: 'normal'}}
          > {loading ? '' : 'Select payment method'}
          </Typography.Text>}
        style={{
          maxWidth: 360
        }}
        footer={footerComponents}
      >
        {loading ?
          <LoadingMask height={75} width={75} withIcon iconSize="2x" /> :
          <BillingContainer>
            {(billings || []).map(billing => <Billing
              billing={billing}
              key={billing.id}
              selectable
              onClick={() => handleBillingChange(billing)}
            />)}
          </BillingContainer>
        }
      </Modal>
    </>
  );
};
