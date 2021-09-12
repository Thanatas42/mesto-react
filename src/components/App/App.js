import React, { useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import './App.css';
import react from 'react';

function App() {
  const [isEditProfilePopupOpen, setEditOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarOpen] = React.useState(false);
  const [isImagePopupOpen, setImageOpen] = React.useState(false);
  const [selectedCard, selectCard] = React.useState({});

  function handleEditProfileClick() {
    setEditOpen(true);
  }
  function handleAddPlaceClick() {
    setAddOpen(true);
  }
  function handleEditAvatarClick() {
    setAvatarOpen(true);
  }
  function handleCardClick(select) {
    selectCard(select);
    setImageOpen(true);
  }

  function closeAllPopups() {
    setAvatarOpen(false);
    setAddOpen(false);
    setEditOpen(false);
    setImageOpen(false);
  }

  return ((
    <div className="App body">
      <Header />
      <Main onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen={handleEditAvatarClick}
        closeAllPopups={closeAllPopups} onCardClick={handleCardClick} card={selectedCard}
        editOpen={isEditProfilePopupOpen} addOpen={isAddPlacePopupOpen} avatarOpen={isEditAvatarPopupOpen} imageOpen={isImagePopupOpen} />
      <Footer />
    </div>
  ));
}

export default App;