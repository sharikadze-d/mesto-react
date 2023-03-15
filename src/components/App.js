import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import ImagePopup from './ImagePopup';

function App() {

  //State-переменные
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  
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

  return (
    <div className="page__inner">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm 
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить">
            <input required id="name" type="text" name="name" placeholder="Имя" className="popup__item" minLength="2" maxLength="40" />
            <span className="name-error popup__error"></span>
            <input required id="job" type="text" name="about" placeholder="Профессия" className="popup__item" minLength="2" maxLength="200" />
            <span className="job-error popup__error"></span>
       </PopupWithForm>
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
      <PopupWithForm 
        name="avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить">
            <input required id="link" placeholder="Ссылка на фото" type="url" name="link" className="popup__item" />
            <span className="link-error popup__error"></span>
      </PopupWithForm>
      <ImagePopup
       card={selectedCard}
       onClose={closeAllPopups}
       isOpen={isImagePopupOpen}
      />
    
      {/* <div className="popup popup_type_confirm">
        <div className="popup__container">
          <button type="button" className="popup__close-btn opacity"></button>
          <form className="popup__form" name="confirm-form" noValidate>
            <h3 className="popup__title">Вы уверены?</h3>
            <button type="submit" className="popup__save-btn button-opacity"
            data-button-text="Да" data-button-loading-text="Удаление...">Да</button>
        </form>
        </div>
      </div> */}
    </div>
  );
}

export default App;
