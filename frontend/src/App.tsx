import Footer from './modules/Footer';
import Header from './modules/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from './pages/MainPage';
import Courses from './pages/Courses';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Header />
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/courses" element={<Courses />} />
            </Routes>
          </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
