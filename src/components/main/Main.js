function Main() {
    return (
            <main className="main">
                <section className="profile">
                    <div className="profile__avatar">
                        <img className="profile__image" src="#" alt="Аватар вашего профиля" />
                        <div className="profile__hover"><img className="profile__hover-image" src="./images/logo/pencil.svg" alt="" />
                        </div>
                    </div>
                    <article className="profile-info">
                        <div className="profile-info__container">
                            <h1 className="profile-info__name">123</h1>
                            <button className="profile-info__edit-button" type="button" aria-label="Редактировать"></button>
                        </div>
                        <p className="profile-info__subname">123</p>
                    </article>
                    <button className="profile__add-button" type="button"></button>
                </section>

                <section>
                    <ul className="cards">

                    </ul>

                </section>
            </main>
    );
}

export default Main;