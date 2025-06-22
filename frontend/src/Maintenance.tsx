import { Title, ConstructionPercent } from "./App";

export const LoadingBar: React.FC<{progress: number}> = ({progress}) => {
    return (
        <div className="loading-bar-container">
            <div
                className="loading-bar-fill"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

function Maintenance() {
    return (
        <>
            <div className="mainpage">
                <div className="tile-collection">
                    <div className="tile full-width" style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <h1 style={{margin: '1%'}}>Under construction</h1>
                        <p style={{margin: '1%'}}>{Title} is currently undergoing development</p>
                        <p>Please check back soon for any updates</p>
                        <LoadingBar progress={ConstructionPercent}/>
                        <p>{ConstructionPercent}% complete</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Maintenance;