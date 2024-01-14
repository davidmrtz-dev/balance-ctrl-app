import { Button, Form, Input, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { theme } from "../../../Theme";
import Alert from "../../alert";
import { deleteCategory, updateCategory } from "../../../api/core/Category";
import { ICategory } from "../../../@types";
import { FontText } from "../../../atoms/text";
import { FormItemWrapper, TitleWrapper } from "../../containers";

const CategoryUpdate = ({
  category,
  open,
  closeModal,
  handleUpdate,
  handleDelete
}: {
  category: ICategory;
  open: boolean;
  closeModal: () => void;
  handleUpdate: (category: ICategory) => void;
  handleDelete?: (id: number) => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [name, setName] = useState('');
  const [enableEdit, setEnableEdit] = useState(false);
  const [form] = Form.useForm();

  const handleSumbitUpdate = async () => {
    if (!name) {
      Alert({
        icon: 'error',
        text: 'Name is required'
      });
    }

    setLoading(true);

    try {
      const updatedCategory = await updateCategory(category.id, name);
      setTimeout(async () => {
        handleUpdate(updatedCategory);
        setName(updatedCategory.name);
        setLoading(false);
        setEnableEdit(false);
        Alert({
          icon: 'success',
          text: 'Category updated successfully'
        })
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors.join(', ');

        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.'),
        });
        setLoading(false);
      }, 1000);
    }
  };

  const handleSubmitDelete = async () => {
    setDeleting(true);

    try {
      await deleteCategory(category.id);
      setTimeout(async () => {
        handleDelete && handleDelete(category.id);
        setName('');
        setDeleting(false);
        closeModal();
        Alert({
          icon: 'success',
          text: 'Category deleted successfully'
        });
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors.join(', ');

        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.'),
        });
        setName('');
        setDeleting(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    closeModal();
    setEnableEdit(false);
    form.resetFields();
  };

  useEffect(() => {
    setName(category.name);
  }, [category]);

  const footerComponents = [
    <Button
      key="cancel"
      onClick={enableEdit ? () => setEnableEdit(false) : handleCancel}
      disabled={loading || deleting}
    >
      {FontText(`${enableEdit ? 'Cancel' : 'Close'}`)}
    </Button>
  ];

  if (confirmDeletion) Alert({
    icon: 'warning',
    text: 'Are you sure you want to delete this transaction?',
    showCancelButton: true
  }).then(result => {
    setConfirmDeletion(false);
    if (result.isConfirmed) {
      handleSubmitDelete();
    }
  });

  if (enableEdit) {
    if (handleDelete) {
      footerComponents.unshift(<Button style={{
        backgroundColor: theme.colors.warning
      }}
        key="delete"
        onClick={() => setConfirmDeletion(true)}
        disabled={loading}
        loading={deleting}
      >
        {FontText('Delete', { color: theme.colors.whites.normal })}
    </Button>);
    }

    footerComponents.unshift(
      <Button
        key="submit"
        type="primary"
        loading={loading}
        onClick={handleSumbitUpdate}
      >
        {FontText('Update', { color: theme.colors.whites.normal })}
      </Button>
    );
  }

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<TitleWrapper>
        {FontText('Category details', { fontWeight: 'normal' })}
        <Button
          key="edit"
          onClick={() => setEnableEdit(true)}
          style={{ backgroundColor: enableEdit ? theme.colors.grays.normal : theme.colors.blues.normal }}
          disabled={enableEdit}
        >
          {FontText('Edit', { color: theme.colors.whites.normal })}
        </Button>
      </TitleWrapper>}
      style={{
        maxWidth: 360,
        position: 'relative'
      }}
      footer={footerComponents}
    >
      <Form
        name='category-update-form'
        form={form}
        layout='vertical'
        initialValues={{ name: category.name }}
        onValuesChange={e => setName(e.name)}
        style={{ width: '100%' }}
        >
          <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
            Name
          </Typography.Text>}
            name='name'>
            {enableEdit ?
              (<Input maxLength={20} style={{ ...theme.texts.brandSubFont }} />)
              : (<FormItemWrapper>{name}</FormItemWrapper>)}
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default CategoryUpdate;
