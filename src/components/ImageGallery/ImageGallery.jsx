import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Container } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => {
  return (
    <Container>
      {images.length > 0 &&
        images.map(el => (
          <ImageGalleryItem
            key={el.id}
            smallSrc={el.webformatURL}
            largeSrc={el.largeImageURL}
            alt={el.tags}
          ></ImageGalleryItem>
        ))}
    </Container>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ),
};
