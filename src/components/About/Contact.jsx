import React from "react";
import { Typography, Card, Row, Col, Space } from "antd";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";

const { Title, Paragraph } = Typography;

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xoqgjdka");

  if (state.succeeded) {
    return (
      <p style={{ color: "green", fontWeight: "bold" }}>Thanks for joining!</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="name" style={{ display: "block", marginBottom: "8px" }}>
          Name
        </label>
        <input
          id="name"
          type="name"
          name="name"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label
          htmlFor="message"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        style={{
          backgroundColor: "#1890ff",
          color: "white",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          border: "none",
        }}
      >
        Submit
      </button>
    </form>
  );
};

const Contact = () => {
  return (
    <div style={{ padding: "20px", paddingTop: "7%" }}>
      <Title level={2}>Contact Us</Title>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="Email" style={{ marginBottom: "16px" }}>
            <Paragraph>
              <Space size={8}>
                <FaEnvelope size={20} />
                <span>mtnaqshbandi2003@gmail.com</span>
              </Space>
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="Phone Numbers" style={{ marginBottom: "16px" }}>
            <Paragraph>
              <Space size={8}>
                <FaPhone size={20} />
                <span>03336845939</span>
              </Space>
              <br />
              <Space size={8}>
                <FaPhone size={20} />
                <span>03171431801</span>
              </Space>
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Card title="Get in Touch" style={{ marginBottom: "16px" }}>
        <Paragraph>
          Feel free to reach out to us via email or phone for any inquiries,
          questions, or collaboration opportunities. We value your feedback and
          look forward to assisting you.
        </Paragraph>

        <ContactForm />
      </Card>
    </div>
  );
};

export default Contact;
