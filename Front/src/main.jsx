import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from "./context/Context.jsx"
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>    
  </StrictMode>,
)
