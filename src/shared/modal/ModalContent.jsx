import React, { useState } from "react";
import { Button, ButtonToolbar, Col, Modal, Row, ModalBody } from "reactstrap";

const ModalContent = ({ children, btn, btnClass }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal((prevState) => !prevState);
  };

  return (
    <>
      <Button className={btnClass} onClick={toggle}>
        {btn}
      </Button>

      <Modal
        style={{ maxWidth: "1600px", width: "80%", zIndex: "1" }}
        size="lg"
        // style={{ width: "800px", padding: "5px" }}
        isOpen={modal}
        toggle={toggle}
        // modalClassName={`${direction}-support`}
        className={`modal-dialog--primary `}
      >
        <ModalBody>
          <Row>
            <Col md={12} sm={12}>
              {children}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalContent;
