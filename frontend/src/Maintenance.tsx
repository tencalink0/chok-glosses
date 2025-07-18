import { Routes, Route } from "react-router-dom";

import { Title, ConstructionPercent } from "./App";
import Err404 from './pages/Err404';
import PageLayout from "./modules/PageLayouts";

export const LoadingBar: React.FC<{
    progress: number, 
    extraMargin?: boolean,
    children?: string;
}> = ({progress, extraMargin, children}) => {
    return (
        <div 
            className="loading-bar-container"
            style={{
                margin: extraMargin === false ? '10px' : undefined
            }}
        >
            <div className="loading-bar-text">
                {children}
            </div>
            <div
                className="loading-bar-fill"
                style={{ 
                    width: `${progress}%`
                }}
            ></div>
        </div>
    );
};

const MaintenanceContent = () => {
    return (
        <PageLayout.Main
            children={
                <>
                    <h1 style={{margin: '1%'}}>Under construction</h1>
                    <p style={{margin: '1%'}}>{Title} is currently undergoing development</p>
                    <p>Please check again for any updates</p>
                    <LoadingBar progress={ConstructionPercent}/>
                    <p>{ConstructionPercent}% complete</p>
                </>
            }
            style={{
                display: 'flex',
                alignItems: 'center'
            }}
        />
    );
}

function Maintenance() {
    return (
        <>
            <main>
                <Routes>
                    <Route path="/" element={<MaintenanceContent />} />
                    <Route path="*" element={<Err404 />} />
                </Routes>
            </main>
        </>
    )
}

export default Maintenance;