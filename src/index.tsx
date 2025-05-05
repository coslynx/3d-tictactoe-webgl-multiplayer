import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/index.css';
import '@/styles/tailwind.css';
import App from '@/App';

try {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('Root element not found!');
  } else {
    ReactDOM.createRoot(rootElement).render(<App />);
  }
} catch (error: any) {
  console.error('React rendering error:', error);
}