import React from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    };

    return ((
        <li className="card">
            <img className="card__image" src={props.card.link} onClick={handleClick} alt={props.card.name} />
            <button className="card__delete-button" type="button"></button>
            <div className="card__container">
                <h2 className="card__title">{props.card.name}</h2>
                <div>
                    <button className="card__like-button" type="button"></button>
                    <div className="card__counter">{props.card.likes.length === 0 ? null : props.card.likes.length}</div>
                </div>
            </div>
        </li>
    ));
};

export default Card;