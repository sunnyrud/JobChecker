// src/components/Layout/ThemeToggle.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa'; // Using react-icons
import { useTheme } from '../../context/ThemeContext'; // Adjust path if needed

const ThemeToggle = ({ isCollapsed }) => { // Accept isCollapsed prop
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={theme === 'light' ? 'outline-secondary' : 'outline-light'} // Adjusted variant for visibility on dark sidebar
      onClick={toggleTheme}
      size="sm"
      className="d-flex align-items-center justify-content-center w-100" // Center content, full width if needed
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      // REMOVED fixed positioning style
      // style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1050 }}
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
      {/* Conditionally render text based on collapsed state */}
      {!isCollapsed && (
        <span className="ms-2">{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
      )}
    </Button>
  );
};

export default ThemeToggle;
