//External Lib Import
import { useRef } from "react";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";

//Internal Lib Import
import FormValidation from "../../../helper/FormValidation";
import GetBase64 from "../../../helper/GetBase64";
import ToastMessage from "../../../helper/ToastMessage";

const Profile = () => {
  const userProfile = {};

  let userNameRef,
    userMobileRef,
    userImgRef,
    userImgView = useRef();

  const previewImage = () => {
    const imgFile = userImgRef.files[0];
    GetBase64(imgFile).then((base64Img) => {
      userImgView.src = base64Img;
    });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    if (FormValidation.isEmpty(userNameRef.value)) {
      ToastMessage.errorMessage("Name is Required");
    } else if (!FormValidation.isMobile(userMobileRef.value)) {
      ToastMessage.errorMessage("Invalid Mobile Number");
    } else {
      const name = userNameRef.value;
      const phone = userMobileRef.value;
      const photo = userImgView.src;
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col>
          <Card className="w-90">
            <Card.Body>
              <img
                ref={(input) => (userImgView = input)}
                className="icon-nav-img-lg"
                src="/unknown/bytesize_mail-(1)-1661776562988.png"
                alt={userProfile["userName"]}
                style={{ maxWidth: "200px" }}
              />
              <hr />

              <Form nSubmit={updateProfile}>
                <Row>
                  <Col md={4} className="p-2">
                    <Form.Group className="mb-3" controlId="photo">
                      <Form.Label>Profile Picture</Form.Label>
                      <Form.Control
                        onChange={previewImage}
                        ref={(input) => (userImgRef = input)}
                        placeholder="User Email"
                        className="form-control animated fadeInUp"
                        type="file"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="p-2">
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        key={Date.now()}
                        defaultValue={userProfile["email"]}
                        readOnly={true}
                        placeholder="User Email"
                        className="form-control animated fadeInUp"
                        type="email"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="p-2">
                    <Form.Group className="mb-3" controlId="userName">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        key={Date.now()}
                        defaultValue={userProfile["userName"]}
                        readOnly={true}
                        placeholder="User Name"
                        className="form-control animated fadeInUp"
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="p-2">
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        key={Date.now()}
                        defaultValue={userProfile["name"]}
                        ref={(input) => (userNameRef = input)}
                        placeholder="Name"
                        className="form-control animated fadeInUp"
                        type="text"
                      />
                    </Form.Group>
                  </Col>

                  <Col className="p-2">
                    <Form.Group>
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        key={Date.now()}
                        defaultValue={userProfile["phone"]}
                        ref={(input) => (userMobileRef = input)}
                        placeholder="Mobile"
                        className="form-control animated fadeInUp"
                        type="number"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="p-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 animated fadeInUp float-end mb-0 mt-4"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
