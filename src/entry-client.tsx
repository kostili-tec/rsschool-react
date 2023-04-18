import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

const entryClient = () => {
  ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

entryClient();
console.log('hydrated');
