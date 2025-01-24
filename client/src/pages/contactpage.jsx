import './contactpage.css'
import { Button, Form, Input, Select, Card } from 'antd';



function ContactPage() {

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

return (
<section id="form-section">
<Card title="Contact Us" id="form-card">
 <Form name="basic" labelCol={{ span: 8,}}
    wrapperCol={{ span: 16, }}
    style={{ maxWidth: 600,}}
    initialValues={{ remember: true, }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    id="contact-form"
  >
    <Form.Item
      label="First name"
      name="firstname"
      rules={[
        {
          required: true,
          message: 'Please input your firstname!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Last name"
      name="lastname"
      rules={[
        {
          required: true,
          message: 'Please input your lastname!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item label="Select" 
      name="reason"
      rules={[
        {
          required: true,
          message: 'Please select a reason!',
        },
      ]}>  
        <Select placeholder="Reason of contact">
            <Select.Option value="customer-service">Customer Service</Select.Option>
            <Select.Option value="order">Order</Select.Option>
            <Select.Option value="feedback">Feedback</Select.Option>
        </Select>
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
   </Form>
   </Card>
  </section>
  )
}



export default ContactPage