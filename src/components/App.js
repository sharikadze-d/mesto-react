import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup';
import React, { useState } from 'react';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup .js';
import { Routes, Route} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';

function App() {
  //State-переменные
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false),
        [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false),
        [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false),
        [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false),
        [selectedCard, setSelectedCard] = React.useState(null),
        [currentUser, setCurrentUser] = React.useState({}),
        [cards, setCards] = React.useState([]),
        [loggedIn, setLoggedIn] = useState(false);

  //Обработчик кнопки лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
          
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
      .catch(() => { console.log(new Error('Ошибка загрузки')); })
      }

  //Обработчик кнопки удаления
  function handleDeleteCard(card) {
    api.deleteCard(card)
      .then(deletedCard => {
        const newCardsArr = cards.filter(card => card._id !== deletedCard._id)
        setCards(newCardsArr);
      })
      .catch(() => { console.log(new Error('Ошибка загрузки')); })
  }

  //Обаботчик обновления автара
  function handleUpdateAvatar(link) {
    api.setAvatar(link)
      .then(() => { setCurrentUser({...currentUser, avatar: link}); })
      .then(() => { closeAllPopups(); })
      .catch(() => { console.log(new Error('Ошибка загрузки')); })
  }

  //Обработчик обновления данных пользователя
  function handleUpdateUser({ name, about}) {
    api.setUserData({ name, about })
      .then(() => { setCurrentUser({...currentUser, name, about}); })
      .then(() => { closeAllPopups(); })
      .catch(() => { console.log(new Error('Ошибка загрузки')); })
  }

  //Обработчик добавления нового места
  function handleAddPlace({ name, link }) {
    api.setCardData({ name, link })
      .then((newCard) => { setCards([newCard, ...cards])})
      .then(() => { closeAllPopups(); })
      .catch(() => { console.log(new Error('Ошибка загрузки')); })
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

  //Наполнение страницы при загрузке
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

  function logout() {
    setLoggedIn(false);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__inner">
        <Routes>
          <Route path="/" element={
            <>
              <ProtectedRoute 
                element={Header}
                loggedIn={loggedIn}
                userMail={"fafa@mail.ru"}
                onExitClick={logout}
              />
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelele={handleDeleteCard}
              />
            </>
            }/>
      
          <Route path="/sign-up" element={
            <>
              <Header
                loggedIn={loggedIn}
                buttonText={"Войти"}
                buttonLink={"/sign-in"}/>
              <Register />
            </>} />
          <Route path="/sign-in" element={
            <>
              <Header 
                loggedIn={loggedIn}
                buttonText={"Зарегистрироваться"}
                buttonLink={"/sign-up"}/>
              <Login />
            </>} />
        </Routes>
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