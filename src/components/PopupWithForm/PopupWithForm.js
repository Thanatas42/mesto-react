function PopupWithForm(props) {
    return (
        <div className={`popup popup_opened popup_type_${props.name}`} >
            <form className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
            </form>
        </div>
    );
}

export default PopupWithForm;