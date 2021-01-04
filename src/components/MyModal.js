import React from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';


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
                        <div className="modal-header text-uppercase text-center d-block">
                          <h5>добавлено в корзину</h5> 
                        </div>
                        <div className="modal-body">
                          <div className="container text-center">
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
                          </div>
                        </div>
                        <div className=" modal-footer d-flex justify-content-center">
                          <Link to="/products">
                            <button className="btn btn-success mx-2 modal_button" onClick={() => {closeModal()}}>
                              Продолжить покупки
                            </button>
                          </Link>
                          <Link to="/cart">
                            <button className="btn btn-primary mx-2 modal_button" onClick={() => {closeModal()}}>
                              Перейти в <i className="fas fa-shopping-basket fa-lg"></i>
                            </button>
                          </Link>
                        </div>
                      </Modal>
                    </>
                  );
          }}
      </ProductConsumer>
    );
}
 
export default MyModal;
