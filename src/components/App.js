import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import React, { useState } from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  return (
    <div className="page__inner">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />
      <PopupWithForm 
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={(
          <>
            <input required id="name" type="text" name="name" placeholder="Имя" className="popup__item" minLength="2" maxLength="40" />
            <span className="name-error popup__error"></span>
            <input required id="job" type="text" name="about" placeholder="Профессия" className="popup__item" minLength="2" maxLength="200" />
            <span className="job-error popup__error"></span>
            <button type="submit" className="popup__save-btn button-opacity"
              data-button-loading-text="Сохранение..." data-button-text="Сохранить">Сохранить</button>
          </>
        )}
      />
      <PopupWithForm 
        name="card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={(
          <>
            <input required id="place" placeholder="Название" type="text" name="name" className="popup__item" minLength="2" maxLength="30" />
            <span className="place-error popup__error"></span>
            <input required id="url" placeholder="Ссылка на картинку" type="url" name="link" className="popup__item" />
            <span className="url-error popup__error"></span>
            <button type="submit" className="popup__save-btn button-opacity"
              data-button-text="Создать" data-button-loading-text="Сохранение...">Создать</button>
          </>
        )}
      />
      <PopupWithForm 
        name="avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={(
          <>
            <input required id="link" placeholder="Ссылка на фото" type="url" name="link" className="popup__item" />
            <span className="link-error popup__error"></span>
            <button type="submit" className="popup__save-btn button-opacity"
              data-button-text="Создать" data-button-loading-text="Сохранение...">Создать</button>
          </>
        )}
      />

      <div className="popup popup_type_picture">
        <figure className="popup__image-container">
          <button type="button" className="popup__close-btn opacity"></button>
          <img src="#" alt="" className="popup__image" />
          <figcaption className="popup__description"></figcaption>
        </figure>
      </div>
    
      <div className="popup popup_type_confirm">
        <div className="popup__container">
          <button type="button" className="popup__close-btn opacity"></button>
          <form className="popup__form" name="confirm-form" noValidate>
            <h3 className="popup__title">Вы уверены?</h3>
            <button type="submit" className="popup__save-btn button-opacity"
            data-button-text="Да" data-button-loading-text="Удаление...">Да</button>
        </form>
        </div>
      </div>

      <template id="card">
        <article className="element">
          <button type="button" className="element__delete-btn opacity"></button>
          <img src="#" alt="" className="element__image" />
          <div className="element__caption">
            <h2 className="element__title"></h2>
            <div className="element__inner">
              <button type="button" className="element__like-btn"></button>
              <p className="element__like-counter"></p>
            </div>
          </div>
        </article>
      </template>
    </div>
  );
}

export default App;
