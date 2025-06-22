import { BrowserRouter as Router } from "react-router-dom";

import './App.css';
import PageContent from "./PageContent";
import Maintenance from "./Maintenance";

import Footer from './pages/Footer';
import Header from './pages/Header';
import { Versions, ContentChoice } from './modules/Enums'
import type { Deck, Clause } from './modules/Types';
import { DeckSchema, ClauseSchema } from './modules/Schema';

export const Version = Versions.pre0_1;
export const Title = 'Chok Glosses';

const MaintenanceState = true;
export const ConstructionPercent = 25;

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
                    {MaintenanceState ? <Maintenance /> : <PageContent />}
                <Footer />
            </Router>
        </>
    );
}

export default App;
