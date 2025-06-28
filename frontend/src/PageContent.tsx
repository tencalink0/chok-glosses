import { Routes, Route } from "react-router-dom";

import MainPage from './pages/MainPage';
import Courses from './pages/Courses';
import Flashcards from './pages/Flashcards';
import Reading from "./pages/Reading";
import Upload from './pages/Upload';
import Err404 from './pages/Err404';
import Feedback, { FeedbackBar } from './pages/Feedback';
import Shop from "./pages/Shop";
import Practice from './pages/Practice';

function PageContent() {
    return (
        <>
            <FeedbackBar />
            <main>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/practice" element={<Practice />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/shop" element={<Shop />} />

                    <Route path="/flashcard/:levelGroupId/:levelId?cardId=3" element={<Flashcards />} />
                    <Route path="/flashcard/:levelGroupId/:levelId" element={<Flashcards />} />
                    <Route path="/flashcard/:levelGroupId" element={<Flashcards />} />
                    <Route path="/flashcard" element={<Flashcards />} />

                    <Route path="/reading/:levelGroupId/:levelId?cardId=3" element={<Reading />} />
                    <Route path="/reading/:levelGroupId/:levelId" element={<Reading />} />
                    <Route path="/reading/:levelGroupId" element={<Reading />} />
                    <Route path="/reading" element={<Reading />} />

                    <Route path="/upload" element={<Upload />} />
                    <Route path="/feedback" element={<Feedback />} />

                    <Route path="*" element={<Err404 />} />
                </Routes>
            </main>
        </>
    )
}

export default PageContent;