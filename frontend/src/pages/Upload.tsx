import CourseCreatorSelect, { parseCourse } from "../modules/CourseCreator";
import { useState, useRef } from "react";
import { setCourse } from '../modules/LocalStorage'
import type { Course } from '../modules/Types'

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
    const [ courseTitle, setCourseTitle ] = useState<string | null>(null);

    const [ courseUpload, setCourseUpload ] = useState<Course | undefined>(undefined);
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
                    const errCourseParse = parseCourse(reader.result);
                    if (typeof errCourseParse === 'string') {
                        window.alert(errCourseParse);
                        return; //TODO: impl proper error handling
                    } else {
                        setCourseUpload(errCourseParse);
                        confirmUpload(errCourseParse.title);
                    }
                } else {
                    const errCourseParse = parseCourse(arrBuffToString(reader.result));
                    if (typeof errCourseParse === 'string') {
                        window.alert(errCourseParse);
                        return; //TODO: impl proper error handling
                    } else {
                        setCourseUpload(errCourseParse);
                        confirmUpload(errCourseParse.title);
                    }
                }
            }
        };
        reader.readAsText(file);
    };

    const confirmUpload = (title: string) => {
        setCourseTitle(title || 'Untitled');
        warnUser();
    }

    const pushToLocalStorage = () => {
        if (!courseUpload) return;
        const courseState = setCourse(courseUpload);
        if (typeof courseState === 'string') {
            window.alert(`Error: ${courseState}`);
            return; //TODO: impl proper error handling
        } else  {
            window.alert('Success');
        }
    };

    const clearFileInput = () => {
        const input = document.getElementById('fileUpload') as HTMLInputElement;
        if (!input) return;

        input.value = '';
    };

    const warnUser = () => {
        const messageContainer = document.getElementById('message-container');
        if (!messageContainer) return;

        messageContainer.style.display = 'flex';
    };

    const hideWarn = () => {
        clearFileInput();
        const messageContainer = document.getElementById('message-container');
        if (!messageContainer) return;

        messageContainer.style.display = 'none';
    }

    return (
        <>
            <div id="message-container">
                <div className="tile">
                    <h2>Warning</h2>
                    <p className="text-small">Are you sure you want to upload <span style={{color: 'var(--blue)'}}>{courseTitle}</span>?</p>
                    <Confirm hideWarn={hideWarn} successFunc={pushToLocalStorage}/>
                </div>
            </div>
            <div className="mainpage">
                <div className="tile-collection">
                    <div className="tile half-width">
                        <h2>Create your own course:</h2>
                        <CourseCreatorSelect />
                    </div>
                    <div className="tile half-width">
                        <h2>Upload:</h2>
                        {/* lbsv: language bar separated values */}
                        <input className="file-input" type="file" onChange={fileUpload} accept=".json,.lbsv" id="fileUpload"></input>
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