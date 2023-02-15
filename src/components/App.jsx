import { Component } from 'react';
import { Loader } from './Loader/Loader';
import { pixabayApi } from '../services/api';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    page: 1,
    error: null,
    totalHits: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const images = await pixabayApi(query, page);
        this.setState({ totalHits: images.totalHits });
        const filteredData = images.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags
          })
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...filteredData],
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }


  handleFormSubmit = searchQuery => {
    if (this.state.query !== searchQuery) {
      this.setState({ query: searchQuery, images: [], page: 1, totalHits: 0 });
    }
  };

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { isLoading, error, images, totalHits } = this.state;
    return (
      <AppContainer>
        <Searchbar addSearchQuery={this.handleFormSubmit} />
        {isLoading && <Loader />}
        {error !== null && <p>Oops, some error occured... Message: {error}</p>}
        {<ImageGallery images={images} toggleModal={this.toggleModal}/>}
        {images.length > 0 && images.length < totalHits && (
          <Button onClickBtn={this.handleClick}>Load More</Button>

        )}
      </AppContainer>
    );
  }
}
