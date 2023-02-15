import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import {
  ImageGalleryListEl,
  ImageGalleryListElImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    largeSrc: PropTypes.string.isRequired,
    smallSrc: PropTypes.string.isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { smallSrc, largeSrc, alt } = this.props;
    return (
      <ImageGalleryListEl>
        <ImageGalleryListElImage
          src={smallSrc}
          alt={alt}
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal largeSrc={largeSrc} onClose={this.toggleModal} altTags={alt} />
        )}
      </ImageGalleryListEl>
    );
  }
}
