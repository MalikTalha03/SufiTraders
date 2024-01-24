import React from 'react';
import { Typography, Card, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: '20px', paddingTop:'7%' }}>
      <Title level={2}>About Sufi Traders</Title>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Card title="Our Mission" style={{ marginBottom: '16px' }}>
            <Paragraph>
              At Sufi Traders, our mission is to provide top-quality wholesale confectionaries to our valued customers.
              We specialize in a wide range of delightful products, including sweets, candies, snacks, nimko, biscuits,
              and much more. Our commitment is to deliver delicious and diverse confectionaries that bring joy to every
              occasion.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Card title="Our Vision" style={{ marginBottom: '16px' }}>
            <Paragraph>
              Our vision at Sufi Traders is to become a leading wholesale distributor, offering not only confectionaries
              but also a comprehensive range of daily-use items. We aim to be the preferred choice for businesses
              seeking quality products at competitive prices. By fostering strong relationships with suppliers and
              clients, we envision sustained growth and success in the wholesale market.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Card title="Our Team" style={{ marginBottom: '16px' }}>
        <Paragraph>
          Meet our dedicated team of professionals at Sufi Traders. Committed to excellence, our team works tirelessly
          to ensure the highest standards of service and product quality. We take pride in our collaborative efforts
          that contribute to the success and satisfaction of our customers.
        </Paragraph>
      </Card>
    </div>
  );
};

export default About;
