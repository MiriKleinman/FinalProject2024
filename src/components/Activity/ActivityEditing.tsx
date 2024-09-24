import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Activity from '../../interfaces/Activity';
import ActivityService from '../../Services/ActivityService';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ActivityContext } from './Activity';
import { UserContext } from '../../App';
import './ActivityEditing.css';


const ActivityEditing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [status, setStatus] = useState(0);
    const activityContext = useContext(ActivityContext);
    const myContext = useContext(UserContext);
    const validate = (values: any) => {
        const errors: any = {};
        if (!values.activityName) {
            errors.activityName = 'שדה חובה';
        }
        if (!values.description) {
            errors.description = 'שדה חובה';
        }

        if (!values.maxParticipants) {
            errors.maxParticipants = 'שדה חובה';
        }
        if (!values.day) {
            errors.day = 'שדה חובה';
        }
        if (!values.beginngTime) {
            errors.beginngTime = 'שדה חובה';
        }
        if (!values.endTime) {
            errors.endTime = 'שדה חובה';
        }
        if (!values.date) {
            errors.date = 'שדה חובה';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            activityName: String(activityContext.currentActivity?.activityName),
            description: String(activityContext.currentActivity?.description),
            cost: String(activityContext.currentActivity?.cost),
            day: String(activityContext.currentActivity?.day),
            beginngTime: String(activityContext.currentActivity?.beginngTime),
            endTime: String(activityContext.currentActivity?.endTime),
            date: new Date(activityContext.currentActivity?.date || "").toLocaleDateString('en-CA'),
            maxParticipants: String(activityContext.currentActivity?.maxParticipants)
        },
        validate,
        onSubmit: values => {
            save();
        },
    });
    const save = async () => {
        debugger
        const activity: Activity = new Activity();
        activity.activityId = Number(activityContext.currentActivity?.activityId);
        activity.communityAdministrationId = String(activityContext.currentActivity?.communityAdministrationId);
        activity.activityName = formik.values.activityName || '';
        activity.description = formik.values.description;
        activity.cost = Number(formik.values.cost);
        activity.day = formik.values.day;
        activity.beginngTime = formik.values.beginngTime;
        activity.endTime = formik.values.endTime;
        activity.targetAudience = String(activityContext.currentActivity?.targetAudience);
        activity.endTimeOfPreview = new Date(formik.values.date);
        activity.date = "";
        activity.maxParticipants = Number(formik.values.maxParticipants);
        await ActivityService.editActivity(activity.activityId, myContext.userData?.userId, activity)
            .then((res: any) => {
                setStatus(res);
            })
        let sentence = "edit";
        navigate(`./activityWrapper/${formik.values.activityName}`, { state: { sentence } });
    }
    return (
        <>
            <div className='editActivityBody'>
                <h1 className='editActivityTitle'>עדכון פרטי הפעילות</h1>
                <form onSubmit={formik.handleSubmit} dir="rtl" className='editActivityForm'>
                    <div className='rightPaneActivity'>
                        <label htmlFor="activityName" className='editActivityLbl'>פעילות</label><br></br><br></br>
                        <input id="activityName" name="activityName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.activityName} /><br></br>
                        {formik.touched.activityName && formik.errors.activityName ? <div>{formik.errors.activityName}</div> : null}
                        <label htmlFor="description" className='editActivityLbl'>תאור הפעילות </label><br></br><br></br>
                        <input id="description" name="description" type="text" placeholder='description' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} /><br></br>
                        {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null}
                        <label htmlFor="cost" className='editActivityLbl'> מחיר </label><br></br><br></br>
                        <input id="cost" name="cost" type="text" placeholder='cost' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.cost} /><br></br>
                        <label htmlFor="beginngTime" className='editActivityLbl'>שעת התחלה </label><br></br><br></br>
                        <input id="beginngTime" name="beginngTime" placeholder='beginngTime' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.beginngTime} /><br></br>
                        {formik.touched.beginngTime && formik.errors.beginngTime ? <div>{formik.errors.beginngTime}</div> : null}
                    </div>
                    <div className='leftPaneActivity'>
                        <label htmlFor="endTime" className='editActivityLbl'>שעת סיום </label><br></br><br></br>
                        <input id="endTime" name="endTime" placeholder='endTime' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endTime} /><br></br>
                        {formik.touched.endTime && formik.errors.endTime ? <div>{formik.errors.endTime}</div> : null}
                        <label htmlFor="date" className='editActivityLbl'>תאריך</label><br></br><br></br>
                        <input id="date" name="date" placeholder='date' type="date" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.date} /><br></br>
                        {formik.touched.date && formik.errors.date ? <div>{formik.errors.date}</div> : null}
                        <label htmlFor="maxParticipants" className='editActivityLbl'> מספר משתתפים מקסימלי </label><br></br><br></br>
                        <input id="maxParticipants" name="maxParticipants" type="text" placeholder='maxParticipants' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.maxParticipants} /><br></br>
                        {formik.touched.maxParticipants && formik.errors.maxParticipants ? <div>{formik.errors.maxParticipants}</div> : null}
                    </div>
                    <button type="submit" className='saveEditActivity'>לשמירה</button>
                </form>
            </div>
        </>
    )
}
export default ActivityEditing;


