import React from 'react';
import { Places } from '../utils/constants';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    };

    function onError(e) {
        e.target.src = Places[Math.floor(Math.random() * Places.length)];
    }

    const isOwn = props.card.owner._id === props.currentUser.userId;
    const isLiked = props.card.likes.some((i) => i._id === props.currentUser.userId);

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
                        type="button" onClick={() => { props.onCardLike(props.card) }}> </button>
                    <div className="card__counter">{props.card.likes.length === 0 ? null : props.card.likes.length}</div>
                </div>
            </div>
        </li>
    ));
};

export default Card;