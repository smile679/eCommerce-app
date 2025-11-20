import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import store from './store/store.js';
import { Provider } from 'react-redux';
import './index.css';
import { Toaster } from './components/ui/sonner.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
      <Toaster richColors />
    </Provider>
  </BrowserRouter>
)