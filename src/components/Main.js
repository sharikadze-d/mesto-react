export default function Main() {
  return (
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
  );}