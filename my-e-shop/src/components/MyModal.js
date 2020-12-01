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
                        <Modal.Header className="text-uppercase text-center d-block">
                          <h5>добавлено в корзину</h5> 
                        </Modal.Header>
                        <Modal.Body>
                          <Container className="text-center">
                            <Image src={img} fluid />
                            <div className="text-center">
                              <h4>{title}</h4>
                              <h5>{price} ₽</h5>
                            </div>
                          </Container>
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-center">
                          <Link to="/products">
                            <Button className="mx-2 modal_button" variant="secondary" onClick={() => {closeModal()}}>
                              Продолжить покупки
                            </Button>
                          </Link>
                          <Link to="/cart">
                            <Button className="mx-2 modal_button" variant="primary" onClick={() => {closeModal()}}>
                              Оформить заказ
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
