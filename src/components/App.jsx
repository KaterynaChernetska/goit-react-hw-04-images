import { useEffect, useState } from 'react';
import { Loader } from './Loader/Loader';
import { pixabayApi } from '../services/api';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImgUrl, setLargeImgUrl] = useState('');
  const [altTags, setAltTags] = useState('');

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const images = await pixabayApi(query, page);
        setTotalHits(images.totalHits);
        const filteredData = images.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        setImages(prevState => [...prevState, ...filteredData]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleFormSubmit = searchQuery => {
    if (query !== searchQuery) {
      setQuery(searchQuery);
      setImages([]);
      setPage(1);
    }
  };

  const handleClick = () => {
    setPage(prevState => prevState + 1);
  };

  const handleImgClick = (imgUrl, alt) => {
    setShowModal(true);
    setLargeImgUrl(imgUrl);
    setAltTags(alt);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <AppContainer>
      <Searchbar addSearchQuery={handleFormSubmit} />
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... Message: {error}</p>}
      {<ImageGallery images={images} onElClick={handleImgClick} />}
      {images.length > 0 && images.length < totalHits && (
        <Button onClickBtn={handleClick}>Load More</Button>
      )}
      {showModal && (
        <Modal largeSrc={largeImgUrl} onClose={closeModal} altTags={altTags} />
      )}
    </AppContainer>
  );
};
