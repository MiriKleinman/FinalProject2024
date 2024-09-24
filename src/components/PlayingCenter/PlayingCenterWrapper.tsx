import React, { useState, useEffect } from 'react';
import PlayingCenter from './PlayingCenter';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import isolation_Mode from '../../images/isolation_Mode.png';

const PlayingCenterWrapper = () => {

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [showMessage, setShowMessage] = useState(true); 
    const sentence = location.state.sentence == "edit"? "המעודכנות" : "החדשות"; 

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowMessage(false);
        }, 2000); 
        return () => clearTimeout(timeout);
    }, []); 

    return (
        <>
            {showMessage ? <><h1 className='successEditing' dir='rtl'>שעות הפעילות {sentence} נשמרו בהצלחה!</h1><img className = 'isolation_Mode' src={isolation_Mode}></img></>
            : navigate(`../playingCenter`)}
        </>
    );
}

export default PlayingCenterWrapper;