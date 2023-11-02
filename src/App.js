import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import ProductList from './components/ProductList';
import './App.css';

const theme = createTheme(); // You can customize the theme if needed

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          
        }}
      >
        <ProductList />
      </div>
    </ThemeProvider>
  );
}

export default App;
