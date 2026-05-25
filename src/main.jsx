import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(

  //   BrowserRouter is a component that provides routing capabilities to the application. It uses the HTML5 history API to keep the UI in sync with the URL. By wrapping the App component with BrowserRouter, we enable routing functionality throughout the entire application, allowing us to define routes and navigate between different pages or components based on the URL.
  
  <BrowserRouter> 
    <App />
  </BrowserRouter>
  
)
