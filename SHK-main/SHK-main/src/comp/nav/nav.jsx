import './nav.css'
import '../../App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../firebase/Auth-config';
import { Routes, Route } from 'react-router-dom';
import Man from './Man';  // already imported
import Women from './wome';
import Kids from './kids';

function Nav() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Login
  async function Login() {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      console.error(err);
    }
  }

  // Logout
  async function Logout() {
    try {
      await signOut(auth);
      setDropdownOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  // Navbar animation
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const open_btn = document.getElementById('isopen');

    window.openNav = () => {
      open_btn.style.top = '-100px';
      navbar.style.left = '0px';
    };

    window.closeNav = () => {
      open_btn.style.top = '0px';
      navbar.style.left = '-1000px';
    };
  }, []);

  // Dropdown animation
  useEffect(() => {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
      if (dropdownOpen) {
        dropdown.style.top = '60px';
        dropdown.style.opacity = '1';
      } else {
        dropdown.style.top = '30px';
        dropdown.style.opacity = '0';
      }
    }
  }, [dropdownOpen]);

  return (
    <>
      <div className='ham-container'>
        <button onClick={() => window.closeNav()} id='isclose' className='ham'>
          <i className="ri-close-fill" />
        </button>
        <button onClick={() => window.openNav()} id='isopen' className='ham'>
          <i className="ri-menu-fold-line"></i>
        </button>
      </div>

      <div className='login-container'>
        {user ? (
          <div className="user-info">
            <button
              className="profile-btn"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <img src={user.photoURL} alt="profile" className="profile-pic" />
            </button>

            <div
              id="profile-dropdown"
              className="dropdown-menu"
              style={{
                position: 'absolute',
                right: '0px',
                background: 'white',
                padding: '10px',
                transition: 'all 0.3s ease',
                opacity: 0,
                top: '30px',
                pointerEvents: dropdownOpen ? 'auto' : 'none'
              }}
            >
              <div className="user-details"> 
                <span className="username">Hi,{user.displayName}</span>
                <br /><br />
                <span className="email">{user.email}</span>
                <br /><br />
                <button onClick={Logout} className="logout-btn">Logout</button>
              </div>
            </div>
          </div>
        ) : (
          <button id='login' onClick={Login}>Login</button>
        )}
      </div>

      <nav className="navbar">
        <div className="logo">
          <Link to="/">SHK</Link>
        </div>
        <span className="bar"></span>
        <ul className="nav-links" id="navbar">
          <li><Link to="/men">Mens</Link></li>
          <li><Link to="/wome">Womens</Link></li>
          <li><Link to="/kids">Kids</Link></li>
        </ul>
      </nav>

          <Routes>
          <Route path="/men" element={<Man />} />
          <Route path="/wome" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
        </Routes>
    </>
  );
}

export default Nav;
