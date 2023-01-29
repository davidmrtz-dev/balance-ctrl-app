import { Button, Checkbox, Form, Input } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthContext";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`

const Login = () => {
  const auth = useAuthContext();
  const [form] = Form.useForm();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async() => {
    try {
      const result = await auth.authenticate(values);
      debugger;
    } catch(err) {
      console.log(err);
    }
  };

  return(
    <LoginContainer>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={values}
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};

export default Login;