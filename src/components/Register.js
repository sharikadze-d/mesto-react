import { Link } from 'react-router-dom';

export default function Register () {
  return (
      <form className="auth-form">
        <h3 className="auth-form__title">Регистрация</h3>
        <input required id="email" placeholder="Email" type="email" name="email" className="auth-form__input" />
        <input required id="password" placeholder="Пароль" type="password" name="password" className="auth-form__input" />
        <button type="submit" className="auth-form__submit-btn button-opacity">Зарегистрироваться</button>
        <Link to="/sign-in" className="auth-form__link opacity">Уже зарегистрированы? Войти</Link>
      </form>
  );
}