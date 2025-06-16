import CourseCreator from "../modules/CourseCreator";
import { useState, useRef } from "react";

type ConfirmProps = {
    successFunc: () => void;
    hideWarn: () => void;
};

const Confirm = ({ successFunc, hideWarn }: ConfirmProps) => {
    const confirmUpload = () => {
        successFunc();
        hideWarn();
    }

    const cancelUpload = () => {
        hideWarn();
    }

    return (
        <div className="message-buttons">
            <button className="button-green message-confirm" onClick={confirmUpload}>Yes</button>
            <button className="button-green message-cancel" onClick={cancelUpload}>No</button>
        </div>
    );
};

function Upload() {
    const [ msgContainer, setMsgContainer ] = useState<HTMLElement | null>(null);
    const [ courseTitle, setCourseTitle ] = useState<string | null>(null);

    const [ courseUpload, setCourseUpload ] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [ dragging, setDragging ] = useState(false);

    const fileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (!file) return;
        readFileContents(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (!file) return;
        readFileContents(file);
    };

    const readFileContents = (file: File) => {
        const reader = new FileReader();
        
        const arrBuffToString: (arrBuff: ArrayBuffer) => string = (arrBuff: ArrayBuffer) => {
            const decoder = new TextDecoder('utf-8');
            return decoder.decode(arrBuff);
        };
        
        reader.onload = () => {
            if (reader.result) {
                if (typeof reader.result === 'string') {
                    setCourseUpload(reader.result)
                } else {
                    setCourseUpload(arrBuffToString(reader.result));
                }
                confirmUpload();
            }
        };
        reader.readAsText(file);
    };

    const confirmUpload = () => {
        setCourseTitle('test'); //TODO: get course and write actual title
        warnUser();
    }

    const pushToLocalStorage = () => {
        //TODO: impl
    };

    const clearFileInput = () => {
        
    };

    const warnUser = () => {
        const messageContainer = document.getElementById('message-container');
        if (!messageContainer) return;

        messageContainer.style.display = 'flex';
    };

    const hideWarn = () => {
        const messageContainer = document.getElementById('message-container');
        if (!messageContainer) return;

        messageContainer.style.display = 'none';
    }

    return (
        <>
            <div id="message-container">
                <div className="tile">
                    <h2>Warning</h2>
                    <p>Are you sure you want to upload <span style={{color: 'var(--blue)'}}>{courseTitle}</span>?</p>
                    {courseUpload}
                    <Confirm hideWarn={hideWarn} successFunc={pushToLocalStorage}/>
                </div>
            </div>
            <div className="mainpage">
                <div className="tile-collection">
                    <div className="tile half-width">
                        <h2>Create your own course:</h2>
                        <CourseCreator />
                    </div>
                    <div className="tile half-width">
                        <h2>Upload:</h2>
                        {/* lbsv: language bar separated values */}
                        <input className="file-input" type="file" onChange={fileUpload} accept=".json,.lbsv"></input>
                        <div
                            className={`drop-zone ${dragging ? 'dragging' : ''}`}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragging(true);
                            }}
                            onDragLeave={(e) => {
                                e.preventDefault();
                                setDragging(false);
                            }}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <p>Or drag and drop your .json or .lbsv file here</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Upload;