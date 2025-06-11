import Footer from './modules/Footer';
import Header from './modules/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from './pages/MainPage'

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Header />
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
            </Routes>
          </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
