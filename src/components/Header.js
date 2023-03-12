import logo from '../images/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <a href="#" className="logo opacity"><img src={logo} alt="Логотип Mesto" className="logo__image" /></a>
    </header>
  );
}