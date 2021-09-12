import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import PopupWithForm from "../components/PopupWithForm.js";
import pencil from "../images/logo/pencil.svg";
import api from "../utils/Api.js";
import Card from "../components/Card.js";
import ImagePopup from "../components/ImagePopup.js";

function Main(props) {
    const [userInfo, setUserInfo] = React.useState({ userName: "", userDescription: "", userAvatar: "" });
    const [cards, SetCards] = React.useState([]);
    //Сделал одну стейт переменную в виде обьекта с данными пользователя, мне кажется так гораздо удобнее и проще
    React.useEffect(() => {
        Promise.all([api.getUserData(), api.getInitialCards()])
            .then(([userData, initialCards]) => {
                setUserInfo({
                    userName: userData.name,
                    userDescription: userData.about,
                    userAvatar: userData.avatar,
                });
                SetCards(initialCards);
            })

            .catch((err) => {
                console.log(err);
            });
    }, []);
    let popa;
    return ((
        <main className="main">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__image" src={userInfo.userAvatar} alt="Аватар вашего профиля" />
                    <div className="profile__hover" onClick={props.isEditAvatarPopupOpen}><img className="profile__hover-image" src={pencil} alt="" />
                    </div>
                </div>
                <article className="profile-info">
                    <div className="profile-info__container">
                        <h1 className="profile-info__name">{userInfo.userName}</h1>
                        <button className="profile-info__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile-info__subname">{userInfo.userDescription}</p>
                </article>
                <button className="profile__add-button" type="button" onClick={props.isAddPlacePopupOpen}></button>
            </section>

            <section>
                <ul className="cards">
                    {cards.map((card, i) => {
                        return (
                            <Card card={card} key={i} onCardClick={props.onCardClick} />
                        )
                    })}
                </ul>
            </section>

            <ImagePopup card={props.card} isOpen={props.imageOpen} closeAllPopups={props.closeAllPopups} />

            <PopupWithForm name="edit" title="Редактировать&nbsp;профиль" buttonName="Сохранить" isOpen={props.editOpen} closeAllPopups={props.closeAllPopups}>
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

            <PopupWithForm name="add" title="Новое&nbsp;место" buttonName="Сохранить" isOpen={props.addOpen} closeAllPopups={props.closeAllPopups}>
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

            <PopupWithForm name="avatar" title="Обновить&nbsp;аватар" buttonName="Сохранить" isOpen={props.avatarOpen} closeAllPopups={props.closeAllPopups}>
                <div className="popup__field">
                    <input type="url" id="avatar-link" name="avatar-link" className="popup__text" placeholder="Введите ссылку"
                        required />
                    <span className="popup__input-error" id="avatar-link-error"></span>
                </div>
            </PopupWithForm>

            <PopupWithForm name="sure" title="Вы&nbsp;уверены?" buttonName="Да" isOpen={false} />
        </main >
    ));
};

export default Main;