class Card {
    constructor(data, cardSelector, handleOpenImage,
        confirmDeletion, api, currentUserId) {
        this._cardText = data.name;
        this._cardImage = data.link;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._currentUserId = currentUserId;
        this._likes = data.likes;
        this._confirmDeletion = confirmDeletion;
        this._api = api;
        this._cardSelector = cardSelector;
        this._handleOpenImage = handleOpenImage;
    };

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => {
            this._like();
        });

        this._deleteButton.addEventListener("click", () => {
            this._removeCard();
        });

        this._placeImage.addEventListener("click", () => {
            this._handleOpenImage(this._cardText, this._cardImage);
        });
    };

    _isLiked() {
        return this._likes.some((user) => user._id === this._currentUserId);
    };

    _like() {
        if (this._isLiked()) {
            this._api.removeLike(this._id).then((card) => {
                this._likes = card.likes;
                this._updateLikesControl();
            })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this._api
                .addLike(this._id)
                .then((card) => {
                    this._likes = card.likes;
                    this._updateLikesControl();
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    };

    _updateLikesControl() {
        this._likesCounter.textContent = this._likes.length;
        if (this._likes.length === 0) {
            this._likesCounter.classList.remove("card__counter_active");
        } else {
            this._likesCounter.classList.add("card__counter_active");
        };
        if (this._isLiked()) {
            this._likeButton.classList.add("card__like-button_theme_active");
        } else {
            this._likeButton.classList.remove("card__like-button_theme_active");
        };
    };

    _removeCard() {
        this._confirmDeletion(() => {
            return this._api
                .deleteCard(this._id)
                .then(() => {
                    this._element.remove();
                    this._element.null;
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    };

    _getTemplate() {
        const newCard = document
            .querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
        return newCard;
    };

    generateCard() {
        // Запишем разметку в приватное поле _element.
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector(".card__like-button");
        this._deleteButton = this._element.querySelector(".card__delete-button");
        this._likesCounter = this._element.querySelector(".card__counter");
        this._placeImage = this._element.querySelector(".card__image");
        if (this._ownerId != this._currentUserId) {
            this._deleteButton.classList.add("card__delete-button_inactive");
        };
        this._updateLikesControl();
        this._setEventListeners();
        this._placeImage.src = this._cardImage;
        this._placeImage.alt = this._cardText;
        this._element.querySelector(".card__title").textContent = this._cardText;

        return this._element;
    };
};

export default Card;