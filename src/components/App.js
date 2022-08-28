import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from "./PopupWithForm.js";
import api from "../utils/Api.js";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext, CurrentUser } from '../contexts/CurrentUserContext';
import { CardsArrayContex, CardsArray } from '../contexts/CardsArrayContex';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, selectCard] = useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  function handleCardClick(select) {
    selectCard(select);
    setIsImagePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const [currentUser, setСurrentUser] = useState(CurrentUser);
  const [cards, setCards] = useState(CardsArray);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setСurrentUser({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id
        });
        setCards(initialCards);
      })
      .catch((err) => {
        console.log('12312312');
        console.log(err);
      });

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    const overlayClick = (e) => {

      if (e.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape)
    document.addEventListener('mousedown', overlayClick)

    return () => {
      document.removeEventListener('keydown', closeByEscape);
      document.removeEventListener('mousedown', overlayClick)
    }
  }, [])


  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.userId);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
    })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateUser(userData) {
    api.updateUser(userData)
      .then((userData) => {
        setСurrentUser({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateAvatar(userData) {
    api.updateAvatar(userData)
      .then((userData) => {
        setСurrentUser({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleAddPlace(placeData) {
    api
      .createCard(placeData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return ((
    <div className="App body">
      <CurrentUserContext.Provider value={currentUser}>
        <CardsArrayContex.Provider value={cards}>
          <Header />
          <Main onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick} card={selectedCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />

          <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} closeAllPopups={closeAllPopups} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

          <PopupWithForm isOpen={false} name="sure" title="Вы&nbsp;уверены?" buttonName="Да" />
          <Footer />
        </CardsArrayContex.Provider>
      </CurrentUserContext.Provider>
    </div>
  ));
}

export default App;