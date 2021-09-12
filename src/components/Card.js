import React from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    };

    return ((
        <li className="card" key={props.card._id}>
            <img className="card__image" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick} />
            <button className="card__delete-button" type="button"></button>
            <div className="card__container">
                <h2 className="card__title">{props.card.name}</h2>
                <div>
                    <button className="card__like-button" type="button"></button>
                    <div className="card__counter">1</div>
                </div>
            </div>
        </li>
    ));
};

export default Card;