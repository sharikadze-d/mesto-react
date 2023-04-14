export default function Login () {
  return (
      <form className="auth-form">
        <h3 className="auth-form__title">Вход</h3>
        <input required id="email" placeholder="Email" type="email" name="email" className="auth-form__input" />
        <input required id="password" placeholder="Пароль" type="password" name="password" className="auth-form__input" />
        <button type="submit" className="auth-form__submit-btn button-opacity">Войти</button>
      </form>
  );
}