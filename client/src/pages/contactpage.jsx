import './contactpage.css'
import { Button, Form, Input, Select, Card } from 'antd';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

function ContactPage() {
const [userInput, setUserInput] = useState()

const onFinish = (values) => {
  console.log('Success:', values)
  toast.success('Thank you for contacting us!')
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
  toast.error('Something went wrong. Please try again!')
};


return (
<section id="form-section">
<div className="contact-container">
<Card title="Contact Us" id="form-card">
 <Form name="basic" labelCol={{ span: 6,}}
    wrapperCol={{ span: 16, }}
    style={{ maxWidth: 500,}}
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
      onChange={(e) => setUserInput(e.target.value)}
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
        {
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: `Invalid Email: ${userInput} `,
        }
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

    <Form.Item
      wrapperCol={{ span: 24 }}
      style={{ textAlign: 'center' }}
    >
        <Button type="primary" htmlType="submit" id="submit-btn">
        Submit
      </Button>
    </Form.Item>

   </Form>
   </Card>
   <div className="contact-image">
    </div>
  </div>
  </section>
  )
}



export default ContactPage