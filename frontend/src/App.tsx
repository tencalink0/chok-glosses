import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';

import Footer from './pages/Footer';
import Header from './pages/Header';
import MainPage from './pages/MainPage';
import Courses from './pages/Courses';
import Flashcards from './pages/Flashcards';
import Upload from './pages/Upload';
import Err404 from './pages/Err404'

import Feedback, { FeedbackBar } from './modules/Feedback';
import { Versions, ContentChoice } from './modules/Enums'
import type { Deck, Clause } from './modules/Types';
import { DeckSchema, ClauseSchema } from './modules/Schema';

export const Version = Versions.pre0_1;

export function mapContentType(levelContent: Deck | Clause | null): ContentChoice {
    if (DeckSchema.safeParse(levelContent).success) {
        return ContentChoice.Flashcard;
    } else if (ClauseSchema.safeParse(levelContent).success) {
        return ContentChoice.Reading;
    } else {
        return ContentChoice.ComingSoon;
    }
}

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

                        <Route path="/:levelGroupId/:levelId?cardId=3" element={<Flashcards />} />
                        <Route path="/flashcard/:levelGroupId/:levelId" element={<Flashcards />} />
                        <Route path="/flashcard/:levelGroupId" element={<Flashcards />} />
                        <Route path="/flashcard" element={<Flashcards />} />

                        <Route path="/upload" element={<Upload />} />
                        <Route path="/feedback" element={<Feedback />} />

                        <Route path="*" element={<Err404 />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </>
    );
}

export default App;
