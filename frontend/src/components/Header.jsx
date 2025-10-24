import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext) || {};

  return (
    <header className="site-header">
      <div className="site-brand">Clarity</div>
      <div className="header-actions">
        {user ? (
          <>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <button className="btn btn-outline" onClick={() => logout && logout()}>
              Logout
            </button>
          </>
        ) : (
          <div className="user-info">Not signed in</div>
        )}
      </div>
    </header>
  );
};

export default Header;
