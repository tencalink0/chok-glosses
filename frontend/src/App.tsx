import Footer from './modules/Footer';
import Header from './modules/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from './pages/MainPage'

import './App.css';

function App() {
  return (
    <>
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
        </Routes>
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;
