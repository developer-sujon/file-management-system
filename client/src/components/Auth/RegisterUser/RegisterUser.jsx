import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Container, Col, Row, Card, Button } from "react-bootstrap";

import FormValidation from "../../../helper/FormValidation";
import ToastMessage from "../../../helper/ToastMessage";

const RegisterUser = () => {
  let emailRef,
    userNameRef,
    nameRef,
    phoneRef,
    passwordRef = useRef();

  const onRegistration = (e) => {
    e.preventDefault();
    const newUser = {
      email: emailRef.value,
      userName: userNameRef.value,
      name: nameRef.value,
      phone: phoneRef.value,
      password: passwordRef.value,
    };

    if (!FormValidation.isEmail(newUser.email)) {
      ToastMessage.errorMessage("Invalid Email Address");
    } else if (FormValidation.isEmpty(newUser.userName)) {
      ToastMessage.errorMessage("Username is Required");
    } else if (FormValidation.isEmpty(newUser.name)) {
      ToastMessage.errorMessage("Name is Required");
    } else if (!FormValidation.isMobile(newUser.phone)) {
      ToastMessage.errorMessage("Invalid Phone Number");
    } else if (FormValidation.isEmpty(newUser.password)) {
      ToastMessage.errorMessage("Password is Required");
    } else {
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={7} lg={6} className="" style={{ marginTop: "100px" }}>
          <Card className="w-90 p-4">
            <Card.Body>
              <Card.Title>Sign Up</Card.Title>
              <Form onSubmit={onRegistration}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    ref={(input) => (nameRef = input)}
                    placeholder="Name"
                    className="form-control animated fadeInUp"
                    type="text"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>User Email</Form.Label>
                  <Form.Control
                    ref={(input) => (emailRef = input)}
                    placeholder="User Email"
                    className="form-control animated fadeInUp"
                    type="email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    ref={(input) => (userNameRef = input)}
                    placeholder="User Name"
                    className="form-control animated fadeInUp"
                    type="text"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>User Phone</Form.Label>
                  <Form.Control
                    ref={(input) => (phoneRef = input)}
                    placeholder="User Phone"
                    className="form-control animated fadeInUp"
                    type="number"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Password">
                  <Form.Label>User Password</Form.Label>
                  <Form.Control
                    ref={(input) => (passwordRef = input)}
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
                  Registration
                </Button>
              </Form>
              <div className="text-center w-100">
                <Link className="text-center" to="/login">
                  Sign In
                </Link>
                <br />
                <Link className="text-center" to="/send-otp">
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

export default RegisterUser;
