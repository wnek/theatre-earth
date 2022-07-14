import studio from '@theatre/studio';
import extension from '@theatre/r3f/extension';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

studio.extend(extension);
studio.initialize();

function Container() {
  return <div id="container"> </div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div id="topStrip"></div>
    <Suspense fallback={null}>
      <App />
    </Suspense>
    <div id="bottomStrip"></div>
  </React.StrictMode>
);
