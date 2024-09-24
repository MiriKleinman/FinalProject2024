import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PlayingCenterService from '../../Services/PlayingCenterService';
import UnitTimeOfPlayingCenter from '../../interfaces/UnitTimeOfPlayingCenter';
import { PlayingCenterContext } from './PlayingCenter';
import { UserContext } from '../../App';
import './EditingUnitTime.css';
const CourseEditing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [status, setStatus] = useState(0);
    const playingCenterContext = useContext(PlayingCenterContext);
    const myContext = useContext(UserContext);
    const validate = (values: any) => {
        const errors: any = {};
        if (!values.operatorName) {
            errors.operatorName = 'שדה חובה';
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
            operatorName: String(playingCenterContext.currentUnitTime?.operatorName),
            day: String(playingCenterContext.currentUnitTime?.day),
            beginningTime: String(playingCenterContext.currentUnitTime?.beginningTime),
            endTime: String(playingCenterContext.currentUnitTime?.endTime)
        },
        validate,
        onSubmit: values => {
            save();
        },
    });
    const save = async () => {
        const unitTime: UnitTimeOfPlayingCenter = new UnitTimeOfPlayingCenter();
        unitTime.unitTimeId = Number(playingCenterContext.currentUnitTime?.unitTimeId);
        unitTime.playingCenterId = Number(playingCenterContext.currentUnitTime?.playingCenterId) | 0;
        unitTime.operatorName = formik.values.operatorName;
        unitTime.day = formik.values.day;
        unitTime.beginningTime = formik.values.beginningTime;
        unitTime.endTime = formik.values.endTime;
        console.log(unitTime, "unitTime");
        await PlayingCenterService.updateUnitTimeOfPlayingCenter(unitTime.unitTimeId, unitTime, myContext.userData?.userId)
            .then((res: any) => {
                setStatus(res);
            })
        let sentence = "edit";
        navigate('../playingCenterWrapper', { state: { sentence } });
    }
    return (
        <>
            <h1 className='editUnitTimeTitle'>עריכת שעות פעילות המשחקיה</h1>
            <form onSubmit={formik.handleSubmit} dir="rtl" className='editUnitTimeForm'>
                <label htmlFor="operatorName" className='editUnitTimeLbl'> מפעילה </label><br></br>
                <input id="operatorName" name="operatorName" type="text" placeholder='operatorName' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.operatorName} /><br></br>
                {formik.touched.operatorName && formik.errors.operatorName ? <div>{formik.errors.operatorName}</div> : null}
                <label htmlFor="day" className='editUnitTimeLbl'> יום </label><br></br>
                <select id="day" name="day" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.day} >
                    <option></option>
                    <option>ראשון</option>
                    <option>שני</option>
                    <option>שלישי</option>
                    <option>רביעי</option>
                    <option>חמישי</option>
                </select><br></br>
                {formik.touched.day && formik.errors.day ? <div>{formik.errors.day}</div> : null}
                <label htmlFor="beginningTime" className='editUnitTimeLbl'>שעת התחלה </label><br></br>
                <input id="beginningTime" name="beginningTime" type="beginningTime" placeholder='beginningTime' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.beginningTime} /><br></br>
                {formik.touched.beginningTime && formik.errors.beginningTime ? <div>{formik.errors.beginningTime}</div> : null}
                <label htmlFor="endTime" className='editUnitTimeLbl'> שעת סיום</label><br></br>
                <input id="endTime" name="endTime" type="text" placeholder='endTime' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endTime} /><br></br><br></br><br></br>
                {formik.touched.endTime && formik.errors.endTime ? <div>{formik.errors.endTime}</div> : null}
                <button type="submit" className='saveEditUnitTime'>לשמירה</button>
                {status === 1 && <h3 className='successSave'>העדכון נשמר בהצלחה </h3>}
            </form>
        </>
    )
}
export default CourseEditing;


