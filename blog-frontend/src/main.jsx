import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter  } from 'react-router-dom'
import './index.css'
import { Container } from '@mui/material'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Container>
  <BrowserRouter>
<Provider store={store}>
    <App />
</Provider>
  </BrowserRouter>
</Container>
)
