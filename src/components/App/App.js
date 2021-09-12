import React from 'react';
import Header from '../Header.js';
import Main from '../Main.js';
import Footer from '../Footer.js';
import './App.css';
import PopupWithForm from "../PopupWithForm.js";
import ImagePopup from "../ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, selectCard] = React.useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(select) {
    selectCard(select);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return ((
    <div className="App body">
      <Header />
      <Main onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen={handleEditAvatarClick}
        onCardClick={handleCardClick} card={selectedCard}
      />

      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} closeAllPopups={closeAllPopups} />

      <PopupWithForm name="edit" title="Редактировать&nbsp;профиль" buttonName="Сохранить" isOpen={isEditProfilePopupOpen} closeAllPopups={closeAllPopups}>
        <div className="popup__field">
          <input id="name-profile" className="popup__text popup__text_name" type="text" name="name-profile" minLength="2"
            maxLength="40" required />
          <span className="popup__input-error" id="name-profile-error"></span>
        </div>
        <div className="popup__field">
          <input id="description-profile" className="popup__text popup__text_subname" type="text" name="description-profile"
            minLength="2" maxLength="40" required />
          <span className="popup__input-error" id="description-profile-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm name="add" title="Новое&nbsp;место" buttonName="Сохранить" isOpen={isAddPlacePopupOpen} closeAllPopups={closeAllPopups}>
        <div className="popup__field">
          <input id="name-place" className="popup__text" placeholder="Название" type="text" name="name-place" minLength="2"
            maxLength="30" required />
          <span className="popup__input-error" id="name-place-error"></span>
        </div>
        <div className="popup__field">
          <input id="link" className="popup__text" placeholder="Ссылка на картинку" type="url" name="link" required />
          <span className="popup__input-error" id="link-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm name="avatar" title="Обновить&nbsp;аватар" buttonName="Сохранить" isOpen={isEditAvatarPopupOpen} closeAllPopups={closeAllPopups}>
        <div className="popup__field">
          <input type="url" id="avatar-link" name="avatar-link" className="popup__text" placeholder="Введите ссылку"
            required />
          <span className="popup__input-error" id="avatar-link-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm name="sure" title="Вы&nbsp;уверены?" buttonName="Да" isOpen={false} />
      <Footer />
    </div>
  ));
}

export default App;