import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoginService from '../../Services/LoginService';
import User from '../../interfaces/User';
import UnitTimeOfLibrary from '../../interfaces/UnitTimeOfLibrary';
import LibraryService from '../../Services/LibraryService';
import { LibraryContext } from './Library';
import { UserContext } from '../../App';
import './EditingUnitTime.css';

const UnitTimeOfLibraryEditing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const libraryContext = useContext(LibraryContext);
    const myContext = useContext(UserContext);
    const [status, setStatus] = useState(0);
    const validate = (values: any) => {
        const errors: any = {};
        if (!values.targetAudience) {
            errors.targetAudience = 'שדה חובה';
        }
        if (!values.day) {
            errors.day = 'שדה חובה';
        }
        if (!values.beginningTime) {
            errors.beginningTime = 'שדה חובה';
        }

        if (!values.endTime) {
            errors.endTime = 'שדה חובה';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            targetAudience: String(libraryContext.currentUnitTime?.targetAudience),
            day: String(libraryContext.currentUnitTime?.day),
            beginningTime: String(libraryContext.currentUnitTime?.beginngTime),
            endTime: String(libraryContext.currentUnitTime?.endTime)
        },
        validate,
        onSubmit: values => {
            save();
        },
    });
    const save = async () => {
        const unitTime: UnitTimeOfLibrary = new UnitTimeOfLibrary();
        unitTime.unitTimeId = Number(libraryContext.currentUnitTime?.unitTimeId);
        unitTime.libraryId = Number(libraryContext.currentUnitTime?.libraryId) | 0;
        unitTime.targetAudience = formik.values.targetAudience;
        unitTime.day = formik.values.day;
        unitTime.beginngTime = formik.values.beginningTime;
        unitTime.endTime = formik.values.endTime;
        console.log(unitTime, "unitTime");
        await LibraryService.updateUnitTimeOfLibrary(unitTime.unitTimeId, unitTime, myContext.userData?.userId)
            .then((res: any) => {
                setStatus(res);
            })
        let sentence = "edit";
        navigate('../libraryWrapper', { state: { sentence } });
    }
    return (
        <>
            <h1 className='editingUnitTimeTitle'>עדכון שעות פעילות הספריה</h1>
            <form onSubmit={formik.handleSubmit} dir="rtl" className='editingUnitTimeForm'>
                <label htmlFor="targetAudience" className='editingUnitTimeLbl'>קהל יעד</label><br></br>
                <select id="targetAudience" name="targetAudience" value={formik.values.targetAudience} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                    <option value="נשים" label="נשים"></option>
                    <option value="בנות" label="בנות"></option>
                    <option value="בנים" label="בנים"></option>
                </select><br></br><br></br>
                {formik.touched.targetAudience && formik.errors.targetAudience ? <div>{formik.errors.targetAudience}</div> : null}
                <label htmlFor="day" className='editingUnitTimeLbl'>יום</label><br></br>
                <select id="day" name="day" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.day} >
                    <option></option>
                    <option>ראשון</option>
                    <option>שני</option>
                    <option>שלישי</option>
                    <option>רביעי</option>
                    <option>חמישי</option>
                </select><br></br><br></br>
                {formik.touched.day && formik.errors.day ? <div>{formik.errors.day}</div> : null}
                <label htmlFor="beginningTime" className='editingUnitTimeLbl'>שעת התחלה </label><br></br>
                <input id="beginningTime" name="beginningTime" type="beginningTime" placeholder='beginningTime' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.beginningTime} /><br></br><br></br>
                {formik.touched.beginningTime && formik.errors.beginningTime ? <div>{formik.errors.beginningTime}</div> : null}
                <label htmlFor="endTime" className='editingUnitTimeLbl'>שעת סיום</label><br></br>
                <input id="endTime" name="endTime" type="text" placeholder='endTime' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endTime} /><br></br><br></br><br></br>
                {formik.touched.endTime && formik.errors.endTime ? <div>{formik.errors.endTime}</div> : null}
                <button type="submit" className='saveEditingUnitTime'>לשמירה</button>
                {/* {status === 1 && <h3 className='successEditMsg'>העדכון נשמר בהצלחה!</h3>} */}
            </form>
        </>
    )
}
export default UnitTimeOfLibraryEditing;


