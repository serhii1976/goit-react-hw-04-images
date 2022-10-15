import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import css from './App.module.css';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [galleryList, setGalleryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeImgId, setActiveImgId] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      const BASE_URL = 'https://pixabay.com/api/';
      const API_KEY = 'key=29473371-b315f9acd1ced765f914602d8';
      const per_page = 12;
      const searchSettings = 'image_type=photo&orientation=horizontal';

      try {
        setIsLoading(true);
        if (searchValue === '') {
          return;
        }
        const response = await axios.get(
          `${BASE_URL}?q=${searchValue}&page=${page}&${API_KEY}&${searchSettings}&per_page=${per_page}`
        );
        console.log(response);
        setError(null);
        setGalleryList(prevGallery => [...prevGallery, ...response.data.hits]);
        if (response.data.hits.length === 0) {
          setError('Nothing was found for your request');
        }

        if (response.data.totalHits / per_page > page) {
          setIsVisibleButton(true);
        } else {
          setIsVisibleButton(false);
        }
      } catch {
        setError('Failed to load images');
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [page, searchValue]);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const input = form.elements.input.value;
    if (input === '') {
      alert('please enter a search value');
      return;
    }
    setSearchValue(input);
    setPage(1);
    setGalleryList([]);
    setIsVisibleButton(false);

    form.reset();
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = e => {
    setActiveImgId(e.target.id);
    setShowModal(showModal => !showModal);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />
      {error && (
        <div style={{ color: 'red', textAlign: 'center' }}>{error};</div>
      )}
      <Loader isLoading={isLoading} />
      <ImageGallery galleryList={galleryList} onClick={toggleModal} />
      {isVisibleButton && <Button onClick={loadMore} />}
      {showModal && (
        <Modal
          galleryList={galleryList}
          activeImgId={activeImgId}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};
