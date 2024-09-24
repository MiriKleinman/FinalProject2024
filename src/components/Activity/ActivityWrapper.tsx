import React, { useState, useEffect } from 'react';
import Activities from './Activity';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './Activity.css';
import isolation_Mode from '../../images/isolation_Mode.png';

const ActivityWrapper = () => {

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [showMessage, setShowMessage] = useState(true);
    const sentence = location.state.sentence == "edit"? "עודכנה" : "נוספה"; 


    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowMessage(false);
        }, 2000); 
        return () => clearTimeout(timeout);
    }, []); 

    return (
        <>
            {showMessage ? <><h1 className='successEditing' dir='rtl'>הפעילות {params.activityName} {sentence} בהצלחה!</h1><img className = 'isolation_Mode' src={isolation_Mode}></img></>
            : navigate(`../activity/${params.targetAudience}`)}
        </>
    );
}

export default ActivityWrapper;