import Footer from './modules/Footer';
import Header from './modules/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from './pages/MainPage';
import Courses from './pages/Courses';
import Flashcards from './pages/Flashcards';
import Upload from './pages/Upload';
import Feedback, { FeedbackBar } from './modules/Feedback';
import { Versions } from './modules/Enums'

import './App.css';

export const Version = Versions.pre0_1;

function App() {
    return (
        <>
            <Router>
                <Header />
                <FeedbackBar />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/courses" element={<Courses />} />

                        <Route path="/flashcard/:levelGroupId/:levelId/:cardId" element={<Flashcards />} />
                        <Route path="/flashcard/:levelGroupId/:levelId" element={<Flashcards />} />
                        <Route path="/flashcard/:levelGroupId" element={<Flashcards />} />
                        <Route path="/flashcard" element={<Flashcards />} />

                        <Route path="/upload" element={<Upload />} />
                        <Route path="/feedback" element={<Feedback />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </>
    );
}

export default App;
