import React, { useEffect, useState, type CSSProperties } from 'react';

class PageLayout {
    static Main({
        children,
        style,
        error
    }: {
        children: React.ReactNode,
        style?: CSSProperties,
        error?: string | null
    }) {
        return (
            <div className='mainpage'>
                <div className='tile-collection'>
                    {
                        error === null || error === undefined ? (
                            <div 
                                className="tile full-width"
                                style={style}
                            >
                                {children}
                            </div>
                        ) : (
                            <div className="tile big">
                                <h2>Error: { error }</h2>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }

    static MainSide({
        childrenMain, 
        childrenSide,
        sideHidden,
        mainHidden,
        centerSides,
        reverseSideForMobile,
        error
    }: {
        childrenMain: React.ReactNode,
        childrenSide: React.ReactNode,
        sideHidden?: boolean,
        mainHidden?: boolean,
        centerSides?: boolean,
        reverseSideForMobile?: boolean,
        error?: string | null
    }) {
        const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 770);
        
        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 770);
            };

            window.addEventListener('resize', handleResize);
            handleResize();

            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return (
            <div className="mainpage">
                {
                    error === null || error === undefined ? (
                        isMobile ? (
                            reverseSideForMobile ? (
                                <>
                                    <div className='tile-collection'>
                                        <div className={`tile full-width ${sideHidden ? 'full' : ''} ${centerSides ? 'center-content' : ''}`}>
                                            {childrenSide}
                                        </div>
                                    </div>
                                    <div className='tile-collection'>
                                        <div className={`tile full-width ${mainHidden ? 'full' : ''}`}>
                                            {childrenMain}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='tile-collection'>
                                        <div className={`tile full-width ${mainHidden ? 'full' : ''}`}>
                                            {childrenMain}
                                        </div>
                                    </div>
                                    <div className='tile-collection'>
                                        <div className={`tile full-width ${sideHidden ? 'full' : ''} ${centerSides ? 'center-content' : ''}`}>
                                            {childrenSide}
                                        </div>
                                    </div>
                                </>
                            )
                        ) : (
                            <>
                                <div className='tile-collection'>
                                    <div className={`tile big ${mainHidden ? 'full' : ''}`}>
                                        {childrenMain}
                                    </div>
                                    <div className={`tile ${sideHidden ? 'full' : ''} ${centerSides ? 'center-content' : ''}`}>
                                        {childrenSide}
                                    </div>
                                </div>
                            </>
                        )
                    ) : (
                        <div className='tile-collection'>
                            <div className="tile big">
                                <h2>Error: { error }</h2>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }

    static SideMainSide({
        childrenMain, 
        childrenSide1,
        childrenSide2,
        sideHidden
    } : {
        childrenMain: React.ReactNode, 
        childrenSide1?: React.ReactNode,
        childrenSide2?: React.ReactNode,
        sideHidden?: boolean
    }) {
        const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 770);
        
        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 770);
            };

            window.addEventListener('resize', handleResize);
            handleResize();

            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return (
            <div className="mainpage">
                {
                    isMobile ? (
                        <>
                            <div className='tile-collection'>
                                <div className={`tile full-width ${sideHidden ? 'full' : ''} center-content`}>
                                    {childrenSide1}
                                </div>
                            </div>
                            <div className='tile-collection'>
                                <div className="tile full-width">
                                    {childrenMain}
                                </div>
                            </div>
                            <div className='tile-collection'>
                                <div className={`tile full-width ${sideHidden ? 'full' : ''} center-content`}>
                                    {childrenSide2}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='tile-collection'>
                            <div className={`tile ${sideHidden ? 'full' : ''} center-content`}>
                                {childrenSide1}
                            </div>
                            <div className="tile medium">
                                {childrenMain}
                            </div>
                            <div className={`tile ${sideHidden ? 'full' : ''} center-content`}>
                                {childrenSide2}
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }

    static MainHalf({
        children1, 
        children2
    } : { 
        children1: React.ReactNode,
        children2: React.ReactNode
    }) {
        const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 770);

        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 770);
            };

            window.addEventListener('resize', handleResize);
            handleResize();

            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return (
            <div className="mainpage">
                {
                    !isMobile ? (
                        <div className="tile-collection">
                            <div className="tile half-width">
                                {children1}
                            </div>
                            <div className="tile half-width">
                                {children2}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="tile-collection">
                                <div className="tile full-width">
                                    {children1}
                                </div>
                            </div>
                            <div className="tile-collection">
                                <div className="tile full-width">
                                    {children2}
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        );
    }
}

export default PageLayout;