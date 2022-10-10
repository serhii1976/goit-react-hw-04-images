import React, { Component } from 'react';
import axios from 'axios';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    galleryList: [],
    isLoading: false,
    error: null,
    showModal: false,
    activeImgId: 0,
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const input = form.elements.input.value;
    if (input === '') {
      alert('please enter a search value');
      return;
    }
    this.setState({ searchValue: input, page: 1, galleryList: [] });
    form.reset();
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = e => {
    this.setState({ activeImgId: e.target.id });
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = 'key=29473371-b315f9acd1ced765f914602d8';
    const queryValue = this.state.searchValue;
    const searchSettings =
      'image_type=photo&orientation=horizontal&per_page=12';

    if (
      prevState.searchValue !== queryValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const response = await axios.get(
          `${BASE_URL}?q=${queryValue}&page=${this.state.page}&${API_KEY}&${searchSettings}`
        );
        this.setState({ error: null });
        this.setState({
          galleryList: [...this.state.galleryList, ...response.data.hits],
        });
        if (response.data.hits.length === 0) {
          this.setState({ error: 'Nothing was found for your request' });
        }
      } catch {
        this.setState({ error: 'Failed to load images' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  render() {
    const { galleryList, isLoading, error, showModal, activeImgId } =
      this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && (
          <div style={{ color: 'red', textAlign: 'center' }}>{error};</div>
        )}
        <Loader isLoading={isLoading} />
        <ImageGallery galleryList={galleryList} onClick={this.toggleModal} />
        {galleryList.length > 0 && <Button onClick={this.loadMore} />}
        {showModal && (
          <Modal
            galleryList={galleryList}
            activeImgId={activeImgId}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
