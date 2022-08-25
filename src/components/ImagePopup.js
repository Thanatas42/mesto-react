import React from 'react';

function onError(e) {
    e.target.src = 'https://images.unsplash.com/photo-1640039986048-885b4234b749?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80';
}

function ImagePopup(props) {
    return ((
        <div className={props.isOpen ? `popup popup_opened popup_type_${props.name}` : `popup popup_type_${props.name}`}>
            <div className="popup__container popup__container_view">
                <figure className="popup__figure">
                    <img className="popup__image" src={props.card.link} alt={props.card.name} onError={onError} />
                    <figcaption className="popup__figure-name">{props.card.name}</figcaption>
                    <button className="popup__close-button" type="reset" onClick={props.closeAllPopups}></button>
                </figure>

            </div>
        </div>
    ));
};

export default ImagePopup;