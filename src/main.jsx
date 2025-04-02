import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './styles/responsive.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/montserrat";
import "@fontsource/montserrat/900.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/300.css";
import { Provider } from 'react-redux';
import store  from './store/store.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
