import { Component } from 'react';
import { Overlay, ModalWindow, Img } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    altTags: PropTypes.string.isRequired,
    largeSrc: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    isLoading: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onModalClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onModalClose);
  }
  onModalClose = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = event => {
    console.log(event.currentTarget, event.target);

    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <Img src={this.props.largeSrc} alt={this.props.altTags} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
