import { useRef } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";

import FormValidation from "../../../helper/FormValidation";
import ToastMessage from "../../../helper/ToastMessage";

const LoginUser = () => {
  let passRef,
    emailRef = useRef();

  const SubmitLogin = (e) => {
    e.preventDefault();
    const email = emailRef.value;
    const phone = emailRef.value;
    const password = passRef.value;

    //TODO !FormValidation.isEmail(email) || !FormValidation.isMobile(phone)

    if (!FormValidation.isEmail(email)) {
      ToastMessage.errorMessage("Invalid Email Or Mobile");
    } else if (FormValidation.isEmpty(password)) {
      ToastMessage.errorMessage("Password Is Required");
    } else {
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={7} lg={6} className="" style={{ marginTop: "100px" }}>
          <Card className="w-90 p-4">
            <Card.Body>
              <Card.Title>Login Your Account</Card.Title>

              <Form onSubmit={SubmitLogin}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>User Email Or Phone</Form.Label>
                  <Form.Control
                    ref={(input) => (emailRef = input)}
                    placeholder="User Email Or Phone"
                    className="form-control animated fadeInUp"
                    type="text"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>User Password</Form.Label>
                  <Form.Control
                    ref={(input) => (passRef = input)}
                    placeholder="User Password"
                    className="form-control animated fadeInUp"
                    type="password"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 animated fadeInUp float-end"
                >
                  Next
                </Button>
              </Form>

              <div className="text-center w-100">
                <Link className="text-center animated fadeInUp" to="/register">
                  Sign Up
                </Link>
                <br />
                <Link className="text-center animated fadeInUp" to="/send-otp">
                  Forget Password
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginUser;
