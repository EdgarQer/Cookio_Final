import React from 'react';
import './Header.css';
//import { FaUserCircle } from 'react-icons/fa';
import userprofile from '../assets/userProfile.png';

export default function Header() {
  return (
    <header className="header">
      <div className="header__brand">cookio</div>
      <nav className="header__nav">
        <a href="/">Home</a>
        <a href="/categories">Categories</a>
        <a href="#articles">Articles</a>
        <a href="/contacts">Contacts</a>
      </nav>
      <div className="header__profile">
        <a href="/userprofile"><img src={userprofile} alt="User Profile" width={40} height={40}/></a>
      </div>
    </header>
  )
}

