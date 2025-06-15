import Footer from './modules/Footer';
import Header from './modules/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from './pages/MainPage';
import Courses from './pages/Courses';
import Flashcards from './pages/Flashcards';

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

                                    <Route path="/flashcard/:levelGroupId/:levelId/:cardId" element={<Flashcards />} />
                                    <Route path="/flashcard/:levelGroupId/:levelId" element={<Flashcards />} />
                                    <Route path="/flashcard/:levelGroupId" element={<Flashcards />} />
                                    <Route path="/flashcard" element={<Flashcards />} />
                                    
                                </Routes>
                        </main>
                    <Footer />
            </Router>
        </>
    );
}

export default App;
