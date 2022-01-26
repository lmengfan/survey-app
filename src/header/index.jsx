import logo from './dp-log_dp-logo.png';
import './styles.css';

const Header = ({ props }) => {
  return (
    <header className="header-banner">
      <div className="flexbox-container">
        <div>
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div className="col-md-2 mt-5 subtitle">{props.subtitle}</div>
      </div>
    </header>
  );
};
export default Header;