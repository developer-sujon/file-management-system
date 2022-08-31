//External lib Import
import { useRef } from "react";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";

//Internal  lib import
import FormValidation from "../../helper/FormValidation";
import ToastMessage from "../../helper/ToastMessage";

const SendOtp = () => {
  let emailRef = useRef();

  const sendOtpCode = (e) => {
    e.preventDefault();
    if (!FormValidation.isEmail(emailRef.value)) {
      ToastMessage.errorMessage("Invalid Email Address");
    } else {
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={7} lg={6} className="" style={{ marginTop: "100px" }}>
          <Card className="w-90  p-4">
            <Card.Body>
              <Card.Title>Email Address</Card.Title>
              <Form onSubmit={sendOtpCode}>
                <Form.Group className="mb-3" controlId="passwordRef">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    ref={(input) => (emailRef = input)}
                    placeholder="Email Address"
                    className="animated fadeInUp"
                    type="email"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 animated fadeInUp float-end "
                >
                  Next
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SendOtp;
