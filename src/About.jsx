import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export function About() {
const { currentUser } = useContext(UserContext);
  
  return (
    <div>
      {currentUser ? `Welcome, ${currentUser.first_name}!` : 'Welcome, Guest!'}
    </div>
  );
}


  
