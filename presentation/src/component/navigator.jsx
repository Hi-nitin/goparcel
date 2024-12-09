// RedirectComponent.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectComponent() {
  const navigate = useNavigate();

  useEffect(() => {
  
      navigate('/dashboard'); // Redirect to the specified path if the condition is true
    
  });

  return null; // This component does not render anything
}

export default RedirectComponent;
