import './navbar.css'
import { Link, useLocation} from 'react-router-dom';


function Navbar() {
const location = useLocation(); 
const isHomePage = location.pathname === '/';

  return (
    <nav className={isHomePage ? "nav-container" : "nav-container-2"}>
      <div className="nav-div">
    <Link to="/" className={ isHomePage ? "logo" : "logo-2"}><img src="images/logo-1.png" className="logo" alt="overcast logo icon"/></Link>
        <div className="nav-cart-div">
          <a className="nav-link" href="contact/contact.html"><i className="fa-solid fa-envelope" id="envelope-icon" alt="envelope icon"></i></a>
          <a className="nav-link"><i className="fa-solid fa-cart-shopping" alt="shopping icon"></i></a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar