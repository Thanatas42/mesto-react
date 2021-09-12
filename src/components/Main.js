import React from 'react';
import pencil from "../images/logo/pencil.svg";
import api from "../utils/Api.js";
import Card from "../components/Card.js";


function Main(props) {
    const [userInfo, setUserInfo] = React.useState({ userName: "", userDescription: "", userAvatar: "" });
    const [cards, setCards] = React.useState([]);
    //Сделал одну стейт переменную в виде обьекта с данными пользователя, мне кажется так гораздо удобнее и проще
    React.useEffect(() => {
        Promise.all([api.getUserData(), api.getInitialCards()])
            .then(([userData, initialCards]) => {
                setUserInfo({
                    userName: userData.name,
                    userDescription: userData.about,
                    userAvatar: userData.avatar,
                });
                setCards(initialCards);
                console.log(initialCards);
            })

            .catch((err) => {
                console.log(err);
            });
    }, []);
    return ((
        <main className="main">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__image" src={userInfo.userAvatar} alt="Аватар вашего профиля" />
                    <div className="profile__hover" onClick={props.isEditAvatarPopupOpen}><img className="profile__hover-image" src={pencil} alt="Аватар вашего профиля" /></div>
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
                            <Card card={card} key={card._id} onCardClick={props.onCardClick} />
                        )
                    })}
                </ul>
            </section>
        </main >
    ));
};

export default Main;