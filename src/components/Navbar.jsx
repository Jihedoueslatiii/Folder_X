import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={{ top: '0 !important' }} className="header-navbar navbar-expand-sm navbar navbar-horizontal floating-nav navbar-light navbar-shadow menu-border container-fluid" role="navigation" data-menu="menu-wrapper" data-menu-type="floating-nav">
      <div className="navbar-header">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item nav-toggle ms-auto">
            <span className="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x d-block d-xl-none text-primary toggle-icon font-medium-4">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          </li>
        </ul>
      </div>
      <div className="navbar-container ps" data-menu="menu-container">
        <ul className="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
          <li className="nav-item me-4 mb-1 mb-xl-auto my-auto">
            <Link to="/fr" className="p-0 m-0">
              <img src="" alt="Logo" className="img-fluid" style={{ maxWidth: '150px !important' }} />
            </Link>
          </li>
          <li className="nav-item my-auto">
            <Link className="nav-link d-flex align-items-center login" to="/candidate/">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Espace candidat</span>
            </Link>
          </li>
          <li className="nav-item my-auto">
            <Link className="nav-link d-flex align-items-center recdash" to="/original/">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-briefcase">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span>Espace recruteur</span>
            </Link>
          </li>
          <li className="nav-item my-auto">
            <Link className="nav-link d-flex align-items-center recdash" to="/fr/blogs/">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-book-open">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>Blog</span>
            </Link>
          </li>
          <li className="ms-auto"></li>
          <li className="nav-item align-items-center my-auto">
            <div className="ms-auto btn-group">
              <button aria-label="Langage FR EN" className="btn btn-white" type="button" id="langMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="flag-icon flag-icon-fr"></i>
                <span className="selected-language" style={{ textTransform: 'uppercase' }}>fr</span>
              </button>
              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="langMenu">
                <Link className="dropdown-item" to="/en" data-language="en">
                  <i className="flag-icon flag-icon-us"></i> EN
                </Link>
                <Link className="dropdown-item disabled" to="/fr" data-language="fr">
                  <i className="flag-icon flag-icon-fr"></i> FR
                </Link>
              </div>
            </div>
          </li>
          <li className="nav-item my-auto d-none d-xl-inline">
            <span aria-label="dark mode - light mode" role="button" className="nav-link nav-link-style p-0 mx-50 my-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon ficon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </span>
          </li>
          <li className="dropdown nav-item my-auto">
            <Link className="nav-link d-flex align-items-center login" to="/candidate/login">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Login / Register</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
