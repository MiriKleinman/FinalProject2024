import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CourseService from '../../Services/CourseService';
import Course from '../../interfaces/Course';
import { UserContext } from '../../App';


import './AddCourse.css';
const AddCourse = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [status, setStatus] = useState(0);
    const [file, setFile] = useState("");
    const location = useLocation();
    const myContext = useContext(UserContext);

    const validate = (values: any) => {
        const errors: any = {};
        if (!values.courseName) {
            errors.courseName = 'שדה חובה';
        }

        if (!values.costForLesson) {
            errors.costForLesson = 'שדה חובה';
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
        if (!values.endTimeOfPreview) {
            errors.endTimeOfPreview = 'שדה חובה';
        }
        if (!values.endTimeOfRegister) {
            errors.endTimeOfRegister = 'שדה חובה';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            courseName: '',
            costForLesson: 0,
            operatorName: '',
            maxParticipants: 0,
            remarks: '',
            endTimeOfPreview: new Date().toLocaleDateString('en-CA'),
            endTimeOfRegister: new Date().toLocaleDateString('en-CA'),
            day: "",
            beginngTime: '',
            endTime: ''
        },
        validate,
        onSubmit: values => {
            save();
        },
    });

    const save = async () => {
        const course: Course = new Course();
        course.communityAdministrationId = String(myContext.userData?.communityAdministrationId) || '';
        course.courseName = formik.values.courseName;
        course.targetAudience = params.targetAudience || '';
        course.costForLesson = formik.values.costForLesson;
        course.operatorName = formik.values.operatorName;
        course.maxParticipants = formik.values.maxParticipants;
        course.remarks = formik.values.remarks;
        course.day = formik.values.day;
        course.beginngTime = formik.values.beginngTime;
        course.endTime = formik.values.endTime;
        course.endTimeOfPreview = new Date((formik.values.endTimeOfPreview).toString());
        course.endTimeOfRegister = new Date((formik.values.endTimeOfRegister).toString());
        course.countOfRegistereds = 0;
        await CourseService.addCourse(myContext.userData?.userId, course)
            .then((res: any) => {
                setStatus(res);
            })
        navigate(`./CourseWrapper/${formik.values.courseName}`);
    }

    return (
        <>
            <div className='bodyAddingCourse'>
                <h3 className='titleAddCourse'> הוספת חוג </h3>
                <form onSubmit={formik.handleSubmit} dir="rtl" className='formAddCourse'>
                    <div className='rightPane'>
                        <label id='label' htmlFor="courseName" dir='rtl' className='courseLbl'>שם החוג</label>
                        <input id="courseName" name="courseName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.courseName} /><br></br>
                        {formik.touched.courseName && formik.errors.courseName ? <div>{formik.errors.courseName}</div> : null}
                        <label id='label' htmlFor="costForLesson" dir='rtl' className='courseLbl'> מחיר</label>
                        <input id="costForLesson" name="costForLesson" type="number" min={0} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.costForLesson} /><br></br>
                        {formik.touched.costForLesson && formik.errors.costForLesson ? <div>{formik.errors.costForLesson}</div> : null}
                        <label id='label' htmlFor="operatorName" dir='rtl' className='courseLbl'>מפעיל/ה </label><br></br>
                        <input id="operatorName" name="operatorName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.operatorName} /><br></br>
                        {formik.touched.operatorName && formik.errors.operatorName ? <div>{formik.errors.operatorName}</div> : null}
                        <label id='label' htmlFor="maxParticipants" dir='rtl' className='courseLbl'>מספר משתתפים מקסימלי </label>
                        <input id="maxParticipants" name="maxParticipants" type="number" min={1} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.maxParticipants} /><br></br>
                        {formik.touched.maxParticipants && formik.errors.maxParticipants ? <div>{formik.errors.maxParticipants}</div> : null}
                        <label id='label' htmlFor="remarks" dir='rtl' className='courseLbl'>הערות </label>
                        <textarea id="remarks" name="remarks" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.remarks} ></textarea><br></br>
                    </div>
                    <div className='leftPane'>
                        <label id='label' htmlFor="day" dir='rtl' className='courseLbl'>יום</label>
                        <select id="day" name="day" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.day} >
                            <option></option>
                            <option>ראשון</option>
                            <option>שני</option>
                            <option>שלישי</option>
                            <option>רביעי</option>
                            <option>חמישי</option>
                        </select>
                        <br></br>
                        {formik.touched.day && formik.errors.day ? <div>{formik.errors.day}</div> : null}
                        <label id='label' htmlFor="beginngTime" dir='rtl' className='courseLbl'>שעת התחלה </label>
                        <input id="beginngTime" name="beginngTime" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.beginngTime} /><br></br>
                        {formik.touched.beginngTime && formik.errors.beginngTime ? <div>{formik.errors.beginngTime}</div> : null}
                        <label id='label' htmlFor="endTime" dir='rtl' className='courseLbl'>שעת סיום </label>
                        <input id="endTime" name="endTime" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endTime} /><br></br>
                        {formik.touched.endTime && formik.errors.endTime ? <div>{formik.errors.endTime}</div> : null}
                        <label id='label' htmlFor="endTimeOfPreview" dir='rtl' className='courseLbl'>עד מתי יוצג החוג?</label>
                        <input id="endTimeOfPreview" name="endTimeOfPreview" type="date" onChange={formik.handleChange} onBlur={formik.handleBlur} value={(formik.values.endTimeOfPreview)} /><br></br>
                        {formik.touched.endTimeOfPreview && formik.errors.endTimeOfPreview ? <div>{formik.errors.endTimeOfPreview}</div> : null}
                        <label id='label' htmlFor="endTimeOfRegister" dir='rtl' className='courseLbl'>עד מתי ניתן להרשם לחוג?</label>
                        <input id="endTimeOfRegister" name="endTimeOfRegister" type="date" onChange={formik.handleChange} onBlur={formik.handleBlur} value={(formik.values.endTimeOfRegister)} /><br></br>
                        {formik.touched.endTimeOfRegister && formik.errors.endTimeOfRegister ? <div>{formik.errors.endTimeOfRegister}</div> : null}
                    </div>
                    <button type="submit" className='saveNewCourseBtn'>לשמירה</button>
                    {status === 1 && <h3 className='addingSuccess'>חוג {formik.values.courseName} נוסף בהצלחה!</h3>}
                </form>
            </div>
        </>
    )
}
export default AddCourse;


