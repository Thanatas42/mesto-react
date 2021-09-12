function ImagePopup(props) {
    return ((
        <div className={props.isOpen ? `popup popup_opened popup_type_${props.name}` : `popup popup_type_${props.name}`}>
            <div className="popup__container popup__container_view">
                <figure className="popup__figure">
                    <img className="popup__image" src={props.card.link} alt={props.card.name} />
                    <figcaption className="popup__figure-name">{props.card.name}</figcaption>
                </figure>
                <button className="popup__close-button popup__close-button_view" type="reset" onClick={props.closeAllPopups}></button>
            </div>
        </div>
    ));
};

export default ImagePopup;