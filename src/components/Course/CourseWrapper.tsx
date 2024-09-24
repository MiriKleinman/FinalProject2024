import React, { useState, useEffect } from 'react';
import Courses from './Course';
import { useParams, useNavigate } from 'react-router-dom';
import './Course.css';
import isolation_Mode from '../../images/isolation_Mode.png';

const CourseContextWrapper = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowMessage(false);
        }, 2000); 
        return () => clearTimeout(timeout);
    }, []); 

    return (
        <>
            {showMessage ? <><h1 className='successEditing' dir='rtl'>חוג {params.courseName} התעדכן בהצלחה!</h1><img className = 'isolation_Mode' src={isolation_Mode}></img></>
            : navigate(`../Course/${params.targetAudience}`)}
        </>
    );
}

export default CourseContextWrapper;