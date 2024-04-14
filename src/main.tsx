import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { WatchListsProvider } from './context/WatchListsContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <WatchListsProvider>
        <App />
      </WatchListsProvider>
    </AuthProvider>
  </BrowserRouter>
)
