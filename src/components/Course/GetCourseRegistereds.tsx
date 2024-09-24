import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Course from '../../interfaces/Course';
import CourseService from '../../Services/CourseService';
import { GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid } from '@mui/x-data-grid';
import { type } from '@testing-library/user-event/dist/type';
import { PersonAddAlt1, TableRows } from '@mui/icons-material';
// import { GridRowParams } from '@mui/x-data-grid-premium';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { idID } from '@mui/material/locale';
import { Field } from 'formik';
import { BiColumns } from 'react-icons/bi';
import { Button } from '@mui/material';
const GetCourseRegistereds = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <>
            {location.state.map((c: any) =>
                <h3 >{c.firstName + " " + c.lastName}</h3>)}
                
        </>
    )
}
export default GetCourseRegistereds;