import { Component } from 'react';
import MainPage from './components/pages/MainPage';
import NotFoundPage from './components/pages/NotFoundPage';
import AboutPage from './components/pages/AboutPage';
import FormPage from './components/pages/FormPage';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route id="Main Page" index element={<MainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/form" element={<FormPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
