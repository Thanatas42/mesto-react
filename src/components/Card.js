import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
    };

    function onError(e) {
        e.target.src = 'https://images.unsplash.com/photo-1640039986048-885b4234b749?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80';
    }

    const isOwn = props.card.owner._id === currentUser.userId;
    const isLiked = props.card.likes.some((i) => i._id === currentUser.userId);

    return ((
        <li className="card">
            <img className="card__image" src={props.card.link} onClick={handleClick} alt={props.card.name} onError={onError} />
            <button className="card__delete-button" type="button"
                style={isOwn ? { visibility: 'visible' } : { visibility: 'hidden' }}
                onClick={() => { props.onCardDelete(props.card) }}>
            </button>
            <div className="card__container">
                <h2 className="card__title">{props.card.name}</h2>
                <div>
                    <button className={`card__like-button ${isLiked ? 'card__like-button_theme_active' : ''}`}
                        type="button" onClick={() => { props.onCardLike(props.card) }}>
                    </button>
                    <div className="card__counter">{props.card.likes.length === 0 ? null : props.card.likes.length}</div>
                </div>
            </div>
        </li>
    ));
};

export default Card;