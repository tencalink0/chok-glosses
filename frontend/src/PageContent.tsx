import { Routes, Route } from "react-router-dom";

import MainPage from './pages/MainPage';
import Courses from './pages/Courses';
import FlashcardsSection from './pages/FlashcardsSection';
import Reading from "./pages/Reading";
import Upload from './pages/Upload';
import Err404 from './pages/Err404';
import Feedback, { FeedbackBar } from './pages/Feedback';
import Shop from "./pages/Shop";
import Practice from './pages/Practice';
import Article from "./pages/Article";

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

                    <Route path="/flashcard/:levelGroupId/:levelId" element={<FlashcardsSection />} />
                    <Route path="/reading/:levelGroupId/:levelId" element={<Reading />} />

                    <Route path="/article/:articleId" element={<Article />} />

                    <Route path="/upload" element={<Upload />} />
                    <Route path="/feedback" element={<Feedback />} />

                    <Route path="*" element={<Err404 />} />
                </Routes>
            </main>
        </>
    )
}

export default PageContent;