import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { Modal, Button, Container, Image} from 'react-bootstrap';


function MyModal() {

  return ( 
      <ProductConsumer>
          {value => {
              const { modalOpen, closeModal } = value;
              const { title, img, price } = value.modalProduct;
                  return (
                    <>
                      <Modal
                        show={modalOpen}
                        onHide={closeModal}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Добавлено в корзину</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Container className="text-center">
                            <Image src={img} fluid />
                            <div className="text-center">
                              <h4>{title}</h4>
                              <h5>{price} руб</h5>
                            </div>
                          </Container>
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-center">
                          <Link to="/products">
                            <Button className="mx-2" variant="secondary" onClick={() => {closeModal()}}>
                              К товарам
                            </Button>
                          </Link>
                          <Link to="/cart">
                            <Button className="mx-2" variant="primary" onClick={() => {closeModal()}}>
                              В корзину
                            </Button>
                          </Link>
                        </Modal.Footer>
                      </Modal>
                    </>
                  );
          }}
      </ProductConsumer>
    );
}
 
export default MyModal;
