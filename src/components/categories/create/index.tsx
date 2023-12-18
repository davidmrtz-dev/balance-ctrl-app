import { Button, Form, Input, Modal, Typography } from "antd";
import { useState } from "react";
import { theme } from "../../../Theme";
import Alert from "../../alert";
import { createCategory } from "../../../api/core/Category";
import { ICategory } from "../../../@types";

const CategoryCreate = ({
  open,
  closeModal,
  handleCreate
}: {
  open: boolean;
  closeModal: () => void;
  handleCreate: (category: ICategory) => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [form] = Form.useForm();

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  const handleSubmit = async () => {
    if (!name) {
      Alert({
        icon: 'error',
        text: 'Name is required'
      });
    }

    setLoading(true);

    try {
      const category = await createCategory(name);
      setTimeout(async () => {
        await handleCreate(category);
        setLoading(false);
        closeModal();
      }, 1000);
    } catch(err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors.join(', ');

        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.'),
        });
        setLoading(false);
      }, 1000);
    }
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
        <Button key="cancel" onClick={handleCancel} disabled={loading}>
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
