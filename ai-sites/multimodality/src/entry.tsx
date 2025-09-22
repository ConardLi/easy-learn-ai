import React from 'react';
    import ReactDOM from 'react-dom/client';
    
          import { NextUIProvider } from '@nextui-org/react';
      
    import App from './App';
    import './entry.css';
    
    

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    
      <NextUIProvider>
        <App />
      </NextUIProvider>
    
    );
        