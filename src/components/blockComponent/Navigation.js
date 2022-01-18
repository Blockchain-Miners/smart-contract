import React from 'react';
import { NavLink } from 'react-router-dom';
import burnImg from '../../assets/BURN.png';

export default function Navigation() {
  return (
    <>
      <nav>
        <NavLink to='/burn'>
          <img src={burnImg} alt='Burn' />
        </NavLink>
      </nav>
    </>
  );
}
