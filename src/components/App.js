import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/api.js';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import React from 'react';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup.js';

function App() {

  //State-переменные
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false),
        [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false),
        [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false),
        [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false),
        [selectedCard, setSelectedCard] = React.useState(null),
        [currentUser, setCurrentUser] = React.useState({}),
        [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
          
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
      }

  function handleDeleteCard(card) {
    api.deleteCard(card)
      .then(deletedCard => {
        let newCardsArr = cards.filter(card => card._id !== deletedCard._id)
        setCards(newCardsArr);
      })
  }

  function handleCardChange(cards) {
    setCards(cards)
  }

  function handleUpdateAvatar(link) {
    api.setAvatar(link)
      .then(() => { setCurrentUser({...currentUser, avatar: link}); })
      .then(() => { setIsEditAvatarPopupOpen(false); })
  }

  function handleUpdateUser({ name, about}) {
    api.setUserData({ name, about })
      .then(() => { setCurrentUser({...currentUser, name, about}); })
      .then(() => { setIsEditProfilePopupOpen(false); })
  }
  
  //Обработчики кликов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  React.useEffect(() => {
    api.getUserData()
    .then(res => {
      setCurrentUser(res);
    })
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__inner">
        <Header />
        <Main 
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardChange={handleCardChange}
          onCardDelele={handleDeleteCard}
        />
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupWithForm 
          name="card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Создать">
              <input required id="place" placeholder="Название" type="text" name="name" className="popup__item" minLength="2" maxLength="30" />
              <span className="place-error popup__error"></span>
              <input required id="url" placeholder="Ссылка на картинку" type="url" name="link" className="popup__item" />
              <span className="url-error popup__error"></span>
        </PopupWithForm>
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;