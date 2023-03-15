import api from '../utils/api.js'
import React from 'react';
import Card from './Card.js';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  //State-переменные
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);



  //Наполнение страницы про загрузке
  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCardsData()])
      .then(data => {
        setUserName(data[0].name);
        setUserDescription(data[0].about);
        setUserAvatar(data[0].avatar);
        setCards(data[1]);
      })
      
      .catch(() => {
        console.log(new Error('Ошибка загрузки'));
      })
  } , [])

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

    <section className="elements">{
      cards.map((card) => { //Рендер карточек из массива с сервера
        return(
        <Card card={card} key={card._id} onCardClick={onCardClick} />)
      })
    }</section>
  </main>
  );}