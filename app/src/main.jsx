import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ds/tokens/colors.css'
import '@ds/tokens/typography.css'
import '@ds/tokens/spacing.css'
import '@ds/tokens/base.css'
import '@ds/tokens/components.css'
import './app.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
