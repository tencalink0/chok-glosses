import { useEffect, useState } from 'react';
import type { Course } from '../modules/Types';
import { CourseSchema } from '../modules/Schema';
import { setCourse } from '../modules/LocalStorage';

import { Confirm } from "./Upload";

const courseImports = import.meta.glob('../assets/courses/*.json') as Record<
    string,
    () => Promise<{ default: unknown }>
>;

function Shop() {
    const [ courses, setCourses ] = useState<Course[]>([]);
    const [ prePurchaseId, setPrePurchaseId ] = useState<number>(0);
    const [ prePurchaseTitle, setPrePurchaseTitle] = useState<string>('')
    
    useEffect(() => {
        const loadCourses = async () => {
            const imports = await Promise.all(
                Object.values(courseImports).map(loader => loader())
            );

            const parsedCourses: Course[] = [];

            for (const mod of imports) {
                const result = CourseSchema.safeParse(mod.default);
                console.log(mod);
                if (result.success) {
                    parsedCourses.push(result.data);
                } else {
                    console.warn('Invalid course data:', result.error);
                }
            }

            console.log(parsedCourses);
            setCourses(parsedCourses);
        };

        loadCourses();
    }, []);

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

    const purchaseCourse = (index: number) => {
        if (index < 0 || index > courses.length) {
            window.alert('Failed to purchase course!');
            return;
        }
        const purchaseState = setCourse(courses[index]);
        if (purchaseState !== null) {
            window.alert(`Error: ${purchaseState}`);
        } else {
            window.alert('Success!');
        }
    }

    return (
        <>
            <div id="message-container">
                <div className="tile">
                    <h2>Warning</h2>
                    <p className="text-small">Are you sure you want to purchase <span style={{color: 'var(--blue)'}}>{prePurchaseTitle}</span>?</p>
                    <Confirm hideWarn={hideWarn} successFunc={() => purchaseCourse(prePurchaseId)}/>
                </div>
            </div>
            <div className='mainpage'>
                <div className='tile-collection'>
                    <div className="tile full-width">
                        <h1 style={{textAlign: 'center'}}>Purchase Courses</h1>
                        <div className='square-container'>
                            {
                                courses.map((course: Course, index) => (
                                <div className="square"
                                    key={index}
                                    onClick={() => {
                                        setPrePurchaseTitle(course.title);
                                        setPrePurchaseId(index);
                                        warnUser();
                                    }}
                                >
                                    <h1>{course.emoji}</h1>
                                    <h2>{course.title}</h2>
                                </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;