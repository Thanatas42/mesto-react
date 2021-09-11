import React, { useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  const [isEditProfilePopupOpen, setEditOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarOpen] = React.useState(false);

  function handleEditProfileClick() {
    setEditOpen(true);
  }
  function handleAddPlaceClick() {
    setAddOpen(true);
  }
  function handleEditAvatarClick() {
    setAvatarOpen(true);
  }
  function closeAllPopups() {
    setAvatarOpen(false);
    setAddOpen(false);
    setEditOpen(false);
  }

  return (
    <div className="App body">
      <Header />
      <Main onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen={handleEditAvatarClick} closeAllPopups={closeAllPopups}
        editOpen={isEditProfilePopupOpen} addOpen={isAddPlacePopupOpen} avatarOpen={isEditAvatarPopupOpen} />
      <Footer />
    </div>
  );
}

export default App;