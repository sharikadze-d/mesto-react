import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup';
import React from 'react';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup .js';

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

  function handleAddPlace({ name, link }) {
    api.setCardData({ name, link })
      .then((newCard) => { setCards([newCard, ...cards])})
      .then(() => { setIsAddPlacePopupOpen(false) })
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
    Promise.all([api.getUserData(), api.getInitialCardsData()])
      .then(res => {
        setCurrentUser(res[0]);
        setCards(res[1]);
      })
      .catch(() => {
        console.log(new Error('Ошибка загрузки'));
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
          onCardDelele={handleDeleteCard}
        />
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
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