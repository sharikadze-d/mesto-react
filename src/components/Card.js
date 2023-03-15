export default function Card({card, onCardClick}) {

  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="element">
      <button type="button" className="element__delete-btn opacity"></button>
      <img src={card ? card.link : '#'} alt={card ? card.name : ''} className="element__image" onClick={handleClick}/>
      <div className="element__caption">
        <h2 className="element__title">{card ? card.name : ''}</h2>
        <div className="element__inner">
          <button type="button" className="element__like-btn"></button>
          <p className="element__like-counter">{card ? card.likes.length : 0}</p>
        </div>
      </div>
    </article>
  );
}