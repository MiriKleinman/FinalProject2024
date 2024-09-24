import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import User from '../../interfaces/User';
import CourseRegistered from '../../interfaces/CourseRegistered';
import CourseService from '../../Services/CourseService';
import { CourseContext } from './Course';
import './AddCourseRegistered.css';
import { UserContext } from '../../App';

const CourseRegistering = () => {
    const navigate = useNavigate();
    const params = useParams();
    const courseContext = useContext(CourseContext);
    const myContext = useContext(UserContext);
    const [status, setStatus] = useState(0);
    const location = useLocation()
    const validate = (values: any) => {
        const errors: any = {};
        if (!values.userId) {
            errors.userId = 'שדה חובה';
        } else if (values.userId.length != 9) {
            errors.userId = 'תעודת זהות חייבת להכיל 9 ספרות';
        }

        if (!values.firstName) {
            errors.firstName = 'שדה חובה';
        }

        if (!values.lastName) {
            errors.lastName = 'שדה חובה';
        }

        if (!values.email) {
            errors.email = 'שדה חובה';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'כתובת מייל לא חוקית';
        }
        if (!values.age) {
            errors.age = 'שדה חובה';
        }
        if (!values.phone) {
            errors.phone = 'שדה חובה';
        }
        else if (values.phone.length > 10 || values.phone.length < 7)
            errors.phone = 'מספר טלפון לא חוקי'
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            userId: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            age: 0,
            paid: false
        },
        validate,
        onSubmit: values => {
            save();
        },
    });

    const save = async () => {
        console.log("save CourseRegistered");
        const isUserExist = myContext.communityAdministrationUsersData?.some(user => user.userId === formik.values.userId);
        if (isUserExist) {
            if (courseContext.currentCourse != undefined)
                courseContext.currentCourse.countOfRegistereds++;
            console.log(courseContext.currentCourse?.countOfRegistereds);
            const courseRegistered: CourseRegistered = new CourseRegistered();
            courseRegistered.userId = formik.values.userId || "";
            courseRegistered.courseId = Number(courseContext.currentCourse?.courseId);
            courseRegistered.firstName = formik.values.firstName;
            courseRegistered.lastName = formik.values.lastName;
            courseRegistered.email = formik.values.email;
            courseRegistered.phone = formik.values.phone;
            courseRegistered.age = formik.values.age;
            courseRegistered.paid = formik.values.paid;
            await CourseService.addCourseRegistered(courseRegistered, courseRegistered.userId)
                .then((res: any) => {
                    setStatus(res);
                })
        }
        else
            alert("המשתמש אינו קיים במערכת");
    }

    useEffect(() => {

    }, [courseContext.currentCourse])
    return (
        <>
            <h3 className='addRegisteredTitle'> רישום לחוג {courseContext.currentCourse?.courseName}</h3>
            <form onSubmit={formik.handleSubmit} dir="rtl" className='formAddRegistered'>
                <div className='rightpane'>
                    <label htmlFor="userId" className='courseRegisteredLbl'>תעודת זהות</label><br></br>
                    <input className="userId" name="userId" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userId} /><br></br><br></br><br></br>
                    {formik.touched.userId && formik.errors.userId ? <div>{formik.errors.userId}</div> : null}
                    <label htmlFor="age" className='courseRegisteredLbl'>גיל</label><br></br>
                    <input className="age" name="age" type="number" min={2} max={120} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age} /><br></br><br></br><br></br>
                    {formik.touched.age && formik.errors.age ? <div>{formik.errors.age}</div> : null}
                    <label htmlFor="firstName" className='courseRegisteredLbl'>שם פרטי</label><br></br>
                    <input className="firstName" name="firstName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} /><br></br><br></br><br></br><br></br>
                    {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                </div>
                <div className='leftpane'>
                    <label htmlFor="lastName" className='courseRegisteredLbl'>שם משפחה</label><br></br>
                    <input className="lastName" name="lastName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} /><br></br><br></br><br></br><br></br>
                    {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
                    <label htmlFor="email" className='courseRegisteredLbl'>מייל</label><br></br>
                    <input className="email" name="email" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} /><br></br><br></br><br></br><br></br>
                    {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                    <label htmlFor="phone" className='courseRegisteredLbl'>טלפון</label><br></br>
                    <input className="phone" name="phone" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} /><br></br><br></br><br></br><br></br>
                    {formik.touched.phone && formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
                </div>
                <div className='isImmediatePayment'>
                    <label htmlFor="paid" className='courseRegisteredLbl'>תשלום מידי?</label>
                    <input className="payment" name="paid" type="checkbox" onChange={formik.handleChange} onBlur={formik.handleBlur} /><br></br><br></br>
                </div>
                <button type="submit" className='saveNewRegistered'>לשמירה</button>
                {status === 1 && <h3 className='successAddingRegistered'>{formik.values.firstName} {formik.values.lastName} נוסף בהצלחה!</h3>}
            </form>
        </>
    )
}
export default CourseRegistering;


