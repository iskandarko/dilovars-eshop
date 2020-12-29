import React from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { Modal, Button, Container} from 'react-bootstrap';


function MyModal() {

  return ( 
      <ProductConsumer>
          {value => {
              const { modalOpen, closeModal } = value;
              const { title, img, price } = value.modalProduct;
                  return (
                    <>
                      <Modal
                        size="sm"
                        show={modalOpen}
                        onHide={closeModal}
                        centered
                      >
                        <Modal.Header className="text-uppercase text-center d-block">
                          <h5>добавлено в корзину</h5> 
                        </Modal.Header>
                        <Modal.Body>
                          <Container className="text-center">
                            <div className="modal_pic_wrapper">
                                <img 
                                    loading="lazy"
                                    className="card-img-top"
                                    src={img} 
                                    alt="изображение_лота" 
                                />
                            </div>
                            <div className="text-center">
                              <p>{title}</p>
                              <h5>{price} ₽</h5>
                            </div>
                          </Container>
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-center">
                          <Link to="/products">
                            <Button className="mx-2 modal_button" variant="success" onClick={() => {closeModal()}}>
                              Продолжить покупки
                            </Button>
                          </Link>
                          <Link to="/cart">
                            <Button className="mx-2 modal_button" variant="primary" onClick={() => {closeModal()}}>
                              Перейти в <i className="fas fa-shopping-basket fa-lg"></i>
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
