// import { useEffect } from 'react';
import './footer.css'
import { Link, useLocation } from 'react-router-dom';

function Footer() {
const location = useLocation(); 
const isHomePage = location.pathname === '/';


  return (
    <>
    {!isHomePage ? 
    <footer className="page-footer" id="footer-container">
      <div className="container">
        <div className="footer-div">
          <div className="desc-div">
            <div className="arrow-container"><a href="#nav-hero"><i className="fa-solid fa-angle-up"></i></a></div>
            <h5 className="white-text">Overcast</h5>
            <p className="grey-text text-lighten-4">
              For those who appreciates the cozy things in life
            </p>
          </div>
          <div className="link-div">
            <h5>Links</h5>
            <ul className="footer-ul">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><a href="https://www.instagram.com/uniqlousa/?hl=en"><i className="fa-brands fa-instagram fa-xl"></i></a></li>
              <li><a href="https://www.youtube.com/@BeepTheProgrammer/videos"><i className="fa-brands fa-youtube fa-lg"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container" id="footer-div">
        <p className="copyright-p">
          ©<span id="current-year"></span> Overcast, All rights
          reserved.
        </p>
      </div>
    </footer> : null}
    </>
  )
}

export default Footer