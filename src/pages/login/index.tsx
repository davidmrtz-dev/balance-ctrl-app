import { Alert, Button, Form, Input } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthContext";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`

const SignIn = () => {
  const auth = useAuthContext();
  const history = useHistory();
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async() => {
    if (Object.values(values).some(val => val === '')) {
      setError('Please fill both fields.');
      return;
    }

    try {
      await auth.authenticate(values);
      history.push('/');
    } catch(err: any) {
      setError(err.errors[0] || 'There was an error, please try again.')
      setValues({ email: '', password: ''});
      form.resetFields();
    }
  };

  return(
    <LoginContainer>
      {error && <Alert
        banner
        message={error}
        type="error"
        closable
        onClose={() => setError('')}
      />}
      <Form
        name="sign-in"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{}}
        onValuesChange={e => setValues({...values, ...e})}
        autoComplete="off"
        >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password.' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={handleSubmit}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};

export default SignIn;