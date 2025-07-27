import { BrowserRouter as Router } from "react-router-dom";

import './App.css';
import PageContent from "./PageContent";
import Maintenance from "./Maintenance";

import Footer from './pages/Footer';
import Header from './pages/Header';
import { Versions, ContentChoice } from './modules/Enums'
import type { Deck, Reading } from './modules/Types';
import { DeckSchema, ReadingSchema } from './modules/Schema';
import { FeedbackBar } from "./pages/Feedback";

export const Version = Versions.pre0_1;
export const Title = 'Chok Glosses';

const MaintenanceState = false;
export const ConstructionPercent = 10;

export function mapContentType(levelContent: Deck | Reading | null): ContentChoice {
    if (levelContent === null) return ContentChoice.ComingSoon; 
    if (DeckSchema.safeParse(levelContent).success) {
        return ContentChoice.Flashcard;
    } else if (ReadingSchema.safeParse(levelContent).success) {
        return ContentChoice.Reading;
    } else {
        console.log(DeckSchema.safeParse(levelContent).error);
        return ContentChoice.ComingSoon;
    }
}

function App() {
    return (
        <>
            <Router>
                <div>
                    <Header />
                    <FeedbackBar />
                    {MaintenanceState ? <Maintenance /> : <PageContent />}
                </div>
                <Footer />
            </Router>
        </>
    );
}

export default App;
