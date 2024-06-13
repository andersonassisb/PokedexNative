import React, {createContext, useContext} from 'react';
import {IThemeContextData} from './types';
import styles from './styles';

const ThemeContext = createContext({} as IThemeContextData);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  return (
    <ThemeContext.Provider value={{...styles}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
