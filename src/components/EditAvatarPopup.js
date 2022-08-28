import React, { useState, useContext } from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [avatarLink, setAvatarLink] = useState(currentUser.userAvatar);

    function handleChangeAavatarLink(e) {
        setAvatarLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarLink
        });
    }

    return ((
        <PopupWithForm name="avatar" title="Обновить&nbsp;аватар" buttonName="Сохранить" isOpen={props.isOpen} closeAllPopups={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <input type="url" className="popup__text"
                    placeholder="Введите ссылку"
                    required value={avatarLink} onChange={handleChangeAavatarLink} />
                <span className="popup__input-error" id="avatar-link-error"></span>
            </div>
        </PopupWithForm>
    ));
};

export default EditAvatarPopup;