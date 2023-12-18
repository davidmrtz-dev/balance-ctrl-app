import { Button, Form, Input, Modal, Typography } from "antd";
import { useState } from "react";
import { theme } from "../../../Theme";

const CategoryCreate = ({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [form] = Form.useForm();

  const handleClose = () => {
    closeModal();
    form.resetFields();
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log('submit', name);
    setLoading(false);
    handleClose();
  }

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
        <Button key="cancel" onClick={handleClose} disabled={loading}>
          <Typography.Text style={{ ...theme.texts.brandFont }}>
            Cancel
          </Typography.Text>
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
          <Typography.Text
            style={{ ...theme.texts.brandFont, color: theme.colors.whites.normal }}
          >
            Create
          </Typography.Text>
        </Button>
      ]}
    >
      <Form
        name='outcome-form'
        form={form}
        layout='vertical'
        onValuesChange={e => {
          console.log(e);
          setName(e.name);
        }}
        style={{ width: '100%' }}
        >
          <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
            Name
          </Typography.Text>}
            name='name'>
            <Input maxLength={20} style={{ ...theme.texts.brandSubFont }} />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default CategoryCreate;
