import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ParticipantInActivity = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <>
            {location.state.map((a: any) =>
                <h3 >{a.firstName + " " + a.lastName}</h3>)}
                
        </>
    )
}
export default ParticipantInActivity;