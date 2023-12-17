import { Button, Modal, Typography } from "antd";
import { useState } from "react";
import { theme } from "../../../Theme";
import { FontText } from "../../../atoms/text";

const CategoryCreate = ({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<Typography.Text
        style={{...theme.texts.brandFont, fontWeight: 'normal'}}
        > New category
        </Typography.Text>}
      style={{
        maxWidth: 360
      }}
      footer={[
        <Button key="cancel" onClick={() => closeModal()} disabled={loading}>
          <Typography.Text style={{ ...theme.texts.brandFont }}>
            Cancel
          </Typography.Text>
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => console.log('submit')}>
          <Typography.Text
            style={{ ...theme.texts.brandFont, color: theme.colors.whites.normal }}
          >
            Create
          </Typography.Text>
        </Button>
      ]}
    >
      {FontText('okoko')}
    </Modal>
  );
};

export default CategoryCreate;
