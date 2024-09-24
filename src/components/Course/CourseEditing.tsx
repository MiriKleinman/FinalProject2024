import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoginService from '../../Services/LoginService';
import User from '../../interfaces/User';
import Course from '../../interfaces/Course';
import CourseService from '../../Services/CourseService';
import './CourseEditing.css';
import { UserContext } from '../../App';
import { CourseContext } from './Course';
import CourseContextWrapper from './CourseWrapper';
const CourseEditing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const myContext = useContext(UserContext);
    const courseContext = useContext(CourseContext);
    const [status, setStatus] = useState(0);
    const validate = (values: any) => {
        const errors: any = {};
        if (!values.courseName) {
            errors.courseName = 'שדה חובה';
        }
        if (!values.targetAudience) {
            errors.targetAudience = 'שדה חובה';
        }
        if (!values.costForLesson) {
            errors.costForLesson = 'שדה חובה';
        }
        else if (values.costForLesson <= 0)
            errors.costForLesson = "מחיר לא תקין"
        if (!values.operatorName) {
            errors.operatorName = 'שדה חובה';
        }
        if (!values.maxParticipants) {
            errors.maxParticipants = 'שדה חובה';
        }
        else if (values.maxParticipants <= 0)
            errors.maxParticipants = "מספר משתתפים לא תקין"
        // if (!values.endTimeOfRegister) {
        //     errors.endTimeOfRegister = 'שדה חובה';
        // }
        // if (!values.endTimeOfPreview) {
        //     errors.endTimeOfPreview = 'שדה חובה';
        // }
        if (!values.day) {
            errors.day = 'שדה חובה';
        }

        if (!values.beginngTime) {
            errors.beginngTime = 'שדה חובה';
        }
        if (!values.endTime) {
            errors.endTime = 'שדה חובה';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            courseName: String(courseContext.currentCourse?.courseName),
            targetAudience: String(courseContext.currentCourse?.targetAudience),
            costForLesson: String(courseContext.currentCourse?.costForLesson),
            operatorName: String(courseContext.currentCourse?.operatorName),
            maxParticipants: String(courseContext.currentCourse?.maxParticipants),
            remarks: String(courseContext.currentCourse?.remarks),
            endTimeOfRegister: courseContext.currentCourse?.endTimeOfRegister,
            endTimeOfPreview: courseContext.currentCourse?.endTimeOfPreview,
            day: String(courseContext.currentCourse?.day),
            beginngTime: String(courseContext.currentCourse?.beginngTime),
            endTime: String(courseContext.currentCourse?.endTime)
        },
        validate,
        onSubmit: values => {
            save();
        },
    });
    const save = async () => {
        console.log("save edit course");
        const course: Course = new Course();
        course.courseId = Number(courseContext.currentCourse?.courseId);
        course.communityAdministrationId = courseContext.currentCourse?.communityAdministrationId || '';
        course.courseName = formik.values.courseName || '';
        course.targetAudience = formik.values.targetAudience;
        course.costForLesson = Number(formik.values.costForLesson);
        course.operatorName = formik.values.operatorName;
        course.maxParticipants = Number(formik.values.maxParticipants);
        course.remarks = formik.values.remarks;
        course.day = formik.values.day;
        course.beginngTime = formik.values.beginngTime;
        course.endTime = formik.values.endTime;
        course.endTimeOfRegister = formik.values.endTimeOfRegister || new Date();
        course.endTimeOfPreview = formik.values.endTimeOfPreview || new Date();
        course.countOfRegistereds = Number(courseContext.currentCourse?.countOfRegistereds);
        await CourseService.updateCourse(course.courseId, myContext.userData?.userId, course)
            .then((res: any) => {
                console.log(res, "status");
                setStatus(res);
            })
        navigate(`./CourseWrapper/${formik.values.courseName}`);
    }
    useEffect(() => {
        console.log("edit course");
        console.log(courseContext.courseData ? courseContext.courseData : "undefined");
    }, [courseContext.courseData])
    return (
        <>
            <div className="editCourseBody">
                <h1 className='titleEdit'>עדכון החוג</h1>
                <form onSubmit={formik.handleSubmit} dir="rtl" className='formEditCourse'>
                    <div className='rightpane'>
                        <label htmlFor="courseName" className='labelEdit'>חוג</label><br></br>
                        <input id="courseName" name="courseName" type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.courseName} />
                        <br></br>
                        {formik.touched.courseName && formik.errors.courseName ? <div>{formik.errors.courseName}</div> : null}
                        <label htmlFor="targetAudience" className='labelEdit'>קהל יעד</label><br></br>
                        <input id="targetAudience" name="targetAudience" type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.targetAudience} /><br></br>
                        {formik.touched.targetAudience && formik.errors.targetAudience ? <div>{formik.errors.targetAudience}</div> : null}
                        <label htmlFor="costForLesson" className='labelEdit'> מחיר</label><br></br>
                        <input id="costForLesson" name="costForLesson" type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.costForLesson} /><br></br>
                        {formik.touched.costForLesson && formik.errors.costForLesson ? <div>{formik.errors.costForLesson}</div> : null}
                        <label htmlFor="operatorName" className='labelEdit'>מפעילה </label><br></br>
                        <input id="operatorName" name="operatorName" type="operatorName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.operatorName} /><br></br>
                        {formik.touched.operatorName && formik.errors.operatorName ? <div>{formik.errors.operatorName}</div> : null}
                        <label htmlFor="maxParticipants" className='labelEdit'>מספר משתתפים מקסימלי</label><br></br>
                        <input id="maxParticipants" name="maxParticipants" type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.maxParticipants} /><br></br>
                        {formik.touched.maxParticipants && formik.errors.maxParticipants ? <div>{formik.errors.maxParticipants}</div> : null}
                    </div>
                    <div className='leftpane'>
                        <label htmlFor="day" className='labelEdit'>יום</label><br></br>
                        <select id="day" name="day" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.day} >
                            <option></option>
                            <option >ראשון</option>
                            <option>שני</option>
                            <option>שלישי</option>
                            <option>רביעי</option>
                            <option>חמישי</option>
                        </select>
                        <br></br>
                        {formik.touched.day && formik.errors.day ? <div>{formik.errors.day}</div> : null}
                        <label htmlFor="beginngTime" className='labelEdit'>שעת התחלה</label><br></br>
                        <input id="beginngTime" name="beginngTime" type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.beginngTime} /><br></br>
                        {formik.touched.beginngTime && formik.errors.beginngTime ? <div>{formik.errors.beginngTime}</div> : null}
                        <label htmlFor="endTime" className='labelEdit'>שעת סיום</label><br></br>
                        <input id="endTime" name="endTime" type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.endTime} /><br></br>
                        {formik.touched.endTime && formik.errors.endTime ? <div>{formik.errors.endTime}</div> : null}
                        <label htmlFor="endTimeOfRegister" className='labelEdit'>מועד אחרון לרישום</label><br></br>
                        <input id="endTimeOfRegister" name="endTimeOfRegister" type="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        // value={formik.values.endTimeOfRegister || ''} 
                        /><br></br>
                        {/* {formik.touched.endTimeOfRegister && formik.errors.endTimeOfRegister ? <div>{formik.errors.endTimeOfRegister}</div> : null} */}
                        <label htmlFor="endTimeOfPreview" className='labelEdit'>מועד אחרון להצגה</label><br></br>
                        <input id="endTimeOfPreview" name="endTimeOfPreview" type="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        // value={formik.values.endTimeOfPreview} 
                        /><br></br>
                        {/* {formik.touched.endTimeOfPreview && formik.errors.endTimeOfPreview ? <div>{formik.errors.endTimeOfPreview}</div> : null} */}
                        <label htmlFor="remarks" className='labelEdit'>הערות</label><br></br>
                        <input id="remarks" name="remarks" type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.remarks} /><br></br>
                    </div>
                    <button type="submit" className='sendEditingBtn'>לשמירה</button>
                    {/* {status === 1 && <CourseContextWrapper/>} */}
                </form>
            </div>
        </>
    )
}
export default CourseEditing;



