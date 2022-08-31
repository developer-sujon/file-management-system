//External  lib import
import { useState } from "react";
import ReactCodeInput from "react-code-input";
import { Container, Col, Row, Card, Button, Form } from "react-bootstrap";

//External lib Import
import ToastMessage from "../../helper/ToastMessage";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");

  let defaultInputStyle = {
    fontFamily: "monospace",
    MozAppearance: "textfield",
    margin: "4px",
    paddingLeft: "8px",
    width: "55px",
    borderRadius: "3px",
    height: "45px",
    fontSize: "32px",
    border: "1px solid lightskyblue",
    boxSizing: "border-box",
    color: "black",
    backgroundColor: "white",
    borderColor: "lightgrey",
    outline: 0,
  };

  const vefifyOtpCode = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      ToastMessage.errorMessage("Invalid OTP Code");
    } else {
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={7} lg={6} className="" style={{ marginTop: "100px" }}>
          <Card className="w-90  p-4">
            <Card.Body>
              <Card.Title>OTP VERIFICATION</Card.Title>
              <Card.Text>
                A 6 Digit verification code has been sent to your email address.
              </Card.Text>
              <Form onSubmit={vefifyOtpCode}>
                <ReactCodeInput
                  onChange={(value) => setOtp(value)}
                  inputStyle={defaultInputStyle}
                  fields={6}
                  type="text"
                />

                <Button
                  variant="primary"
                  type="sumbit"
                  className="w-100 animated fadeInUp float-end mt-4"
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

export default VerifyOtp;
