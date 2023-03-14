import api from '../utils/api.js'
import React from 'react';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar }) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  React.useEffect(() => {
    api.getUserData()
    .then(res => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    })
    .catch(() => {
      console.log(new Error('Ошибка загрузки'));
    })
  })
  return (
  <main className="content">
    <section className="profile">
      <div className="profile__inner">
        <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
          <img src={userAvatar} alt="Аватар профиля" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__name-wrapper">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" className="profile__edit-button opacity" onClick={onEditProfile}></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
      </div>
      <button type="button" className="profile__add-button opacity" onClick={onAddPlace}></button>
    </section>

    <section className="elements"></section>
  </main>
  );}