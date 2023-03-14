export default function PopupWithForm({ name, title, children, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-btn opacity" onClick={onClose}></button>
          <form className="popup__form" name={`${name}-input-form`} noValidate>
            <h3 className="popup__title">{title}</h3>
            {children}
          </form>
        </div>
      </div>
  );
}