import {
  ImageGalleryListEl,
  ImageGalleryListElImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ smallSrc, largeSrc, alt, onImgClick }) => {
  return (
    <ImageGalleryListEl>
      <ImageGalleryListElImage
        src={smallSrc}
        alt={alt}
        onClick={() => onImgClick(largeSrc, alt)}
      />
    </ImageGalleryListEl>
  );
};

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  largeSrc: PropTypes.string.isRequired,
  smallSrc: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
