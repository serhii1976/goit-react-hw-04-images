import React, { useEffect, useState } from 'react';
import { getImages } from 'components/FetchAPI';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import css from './App.module.css';
import { per_page } from 'components/FetchAPI';

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
      try {
        setIsLoading(true);
        if (searchValue === '') {
          return;
        }
        const imagesGallery = await getImages(searchValue, page);
        console.log(imagesGallery);
        setError(null);
        setGalleryList(prevGallery => [...prevGallery, ...imagesGallery.hits]);
        if (imagesGallery.hits.length === 0) {
          setError('Nothing was found for your request');
        }
        if (imagesGallery.totalHits / per_page > page) {
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
