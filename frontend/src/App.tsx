import Footer from './modules/Footer';
import Header from './modules/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from './pages/MainPage';
import Courses from './pages/Courses';
import Flashcard from './pages/Flashcard';

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
                                    <Route path="/flashcard/:deckId/:cardId" element={<Flashcard />} />
                                    <Route path="/flashcard/:deckId" element={<Flashcard />} />
                                    <Route path="/flashcard" element={<Flashcard />} />
                                </Routes>
                        </main>
                    <Footer />
            </Router>
        </>
    );
}

export default App;
