import React, { useState, useEffect } from 'react';
import Users from './Users';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './Users.css';
import isolation_Mode from '../../images/isolation_Mode.png';

const UserWrapper = () => {

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowMessage(false);
        }, 2000); 
        return () => clearTimeout(timeout);
    }, []); 

    return (
        <>
            {showMessage ? <><h1 className='successEditing' dir='rtl'> {location.state.user.firstName} {location.state.user.lastName} נוסף בהצלחה למערכת!</h1><img className = 'isolation_Mode' src={isolation_Mode}></img></>
            : navigate(`../users`)}
        </>
    );
}

export default UserWrapper;