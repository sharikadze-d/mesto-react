import Header from "./Header";

function App() {
  return (
    <div className="page__inner">
      <Header />
      <main className="content">
        <section className="profile">
          <div className="profile__inner">
            <div className="profile__avatar-wrapper">
              <img src="#" alt="Аватар профиля" className="profile__avatar" />
            </div>
            <div className="profile__info">
              <div className="profile__name-wrapper">
                <h1 className="profile__name"></h1>
                <button type="button" className="profile__edit-button opacity"></button>
              </div>
              <p className="profile__description"></p>
            </div>
          </div>
          <button type="button" className="profile__add-button opacity"></button>
        </section>

        <section className="elements"></section>
      </main>
      <footer className="footer">
        <p className="footer__text">&copy; 2022 Mesto Russia</p>
      </footer>

      <div className="popup popup_type_profile">
        <div className="popup__container">
          <button type="button" className="popup__close-btn opacity"></button>
          <form className="popup__form" name="profile-input-form" noValidate>
            <h3 className="popup__title">Редактировать профиль</h3>
            <input required id="name" type="text" name="name" placeholder="Имя" className="popup__item" minLength="2" maxLength="40" />
            <span className="name-error popup__error"></span>
            <input required id="job" type="text" name="about" placeholder="Профессия" className="popup__item" minLength="2" maxLength="200" />
            <span className="job-error popup__error"></span>
            <button type="submit" className="popup__save-btn button-opacity"
              data-button-loading-text="Сохранение..." data-button-text="Сохранить">Сохранить</button>
          </form>
        </div>
      </div>
      
      <div className="popup popup_type_card">
        <div className="popup__container">
          <button type="button" className="popup__close-btn opacity"></button>
          <form className="popup__form" name="add-card-input-form" noValidate>
            <h3 className="popup__title">Новое место</h3>
            <input required id="place" placeholder="Название" type="text" name="name" className="popup__item" minLength="2" maxLength="30" />
            <span className="place-error popup__error"></span>
            <input required id="url" placeholder="Ссылка на картинку" type="url" name="link" className="popup__item" />
            <span className="url-error popup__error"></span>
            <button type="submit" className="popup__save-btn button-opacity"
              data-button-text="Создать" data-button-loading-text="Сохранение...">Создать</button>
          </form>
        </div>
      </div>

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

      <div className="popup popup_type_avatar">
        <div className="popup__container">
          <button type="button" className="popup__close-btn opacity"></button>
          <form className="popup__form" name="avatar-input-form" noValidate>
            <h3 className="popup__title">Обновить аватар</h3>
            <input required id="link" placeholder="Ссылка на фото" type="url" name="link" className="popup__item" />
            <span className="link-error popup__error"></span>
            <button type="submit" className="popup__save-btn button-opacity"
              data-button-text="Создать" data-button-loading-text="Сохранение...">Создать</button>
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
