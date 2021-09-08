import react from "react";
import ReactDOM from "react-dom";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import pencil from "../../images/logo/pencil.svg";

function handleEditProfileClick() {
    document.querySelector('.popup_type_edit-form').classList.add('popup_opened');
}

function handleEditAvatarClick() {
    document.querySelector('.popup_type_avatar').classList.add('popup_opened');
}

function handleAddPlaceClick() {
    document.querySelector('.popup_type_edit-form').classList.add('popup_opened');
}


function Main() {
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__image" src="https://pristor.ru/wp-content/uploads/2019/09/Прикольные-картинки-на-аватарку-для-мужчин-3.jpg" alt="Аватар вашего профиля" />
                    <div className="profile__hover" onClick={handleEditAvatarClick}><img className="profile__hover-image" src={pencil} alt="" />
                    </div>
                </div>
                <article className="profile-info">
                    <div className="profile-info__container">
                        <h1 className="profile-info__name">123</h1>
                        <button className="profile-info__edit-button" type="button" aria-label="Редактировать" onClick={handleEditProfileClick}></button>
                    </div>
                    <p className="profile-info__subname">123</p>
                </article>
                <button className="profile__add-button" type="button" onClick={handleEditProfileClick}></button>
            </section>

            <section>
                <ul className="cards">

                </ul>
            </section>

            <PopupWithForm title="Вы уверены?"/>

            <div className="popup popup_type_edit-form">
                <form className="popup__container popup__container_type_edit-form" name="edit" noValidate>
                    <h2 className="popup__title">Редактировать&nbsp;профиль</h2>
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
                    <button className="popup__save-button popup__save-button_edit popup__button" type="submit"
                        disabled>Сохранить</button>
                    <button className="popup__close-button popup__close-button_edit" type="reset"></button>
                </form>
            </div>

            <div className="popup popup_type_avatar">
                <div className="popup__container">
                </div>
                <form className="popup__container popup__form" name="popup" noValidate>
                    <h2 className="popup__title">Обновить Аватар</h2>
                    <div className="popup__field">
                        <input type="url" id="avatar-link" name="avatar-link" className="popup__text" placeholder="Введите ссылку"
                            required />
                        <span className="popup__input-error" id="avatar-link-error"></span>
                    </div>
                    <button className="popup__save-button popup__button" type="submit">Сохранить</button>
                    <button className="popup__close-button" type="reset"></button>
                </form>
            </div>

            <div className="popup popup_type_add-card">
                <form className="popup__container popup__form" name="popup" noValidate>
                    <h2 className="popup__title">Новое&nbsp;место</h2>
                    <div className="popup__field">
                        <input id="name-place" className="popup__text" placeholder="Название" type="text" name="name-place" minLength="2"
                            maxLength="30" required />
                        <span className="popup__input-error" id="name-place-error"></span>
                    </div>
                    <div className="popup__field">
                        <input id="link" className="popup__text" placeholder="Ссылка на картинку" type="url" name="link" required />
                        <span className="popup__input-error" id="link-error"></span>
                    </div>
                    <button className="popup__save-button popup__save-button_add popup__button" type="submit">Создать</button>
                    <button className="popup__close-button popup__close-button_add" type="reset"></button>
                </form>
            </div>
        </main>
    );
}


export default Main;