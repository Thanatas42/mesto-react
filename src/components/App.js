import React from 'react';
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
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, selectCard] = React.useState({});

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

  const [userInfo, setUserInfo] = React.useState(CurrentUser);
  const [cards, setCards] = React.useState(CardsArray);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setUserInfo({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id
        });
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === userInfo.userId);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
    });
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    });
  };

  function handleUpdateUser(userData) {
    api.updateUser(userData)
      .then((userData) => {
        setUserInfo({
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

  function handleUpdateavatar(userData) {
    api.updateAvatar(userData)
      .then((userData) => {
        setUserInfo({
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
      <CurrentUserContext.Provider value={userInfo}>
        <CardsArrayContex.Provider value={cards}>
          <Header />
          <Main onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick} card={selectedCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />

          <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} closeAllPopups={closeAllPopups} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateavatar}/>

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
          
          <PopupWithForm name="sure" title="Вы&nbsp;уверены?" buttonName="Да" isOpen={false} />
          <Footer />
        </CardsArrayContex.Provider>
      </CurrentUserContext.Provider>
    </div>
  ));
}

export default App;