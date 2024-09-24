import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import './Users.css';
import { UserContext } from '../../App';
import close from '../../images/close.png';
import User from '../../interfaces/User';
import UserService from '../../Services/UserService';

const AddUser = () => {
    const location = useLocation();
    const [status, setStatus] = useState(0);
    const myContext = useContext(UserContext);
    const navigate = useNavigate();
    const validate = (values: any) => {
        const errors: any = {};
        if (!values.userId) {
            errors.userId = 'שדה חובה';
        }

        if (!values.password) {
            errors.paswword = 'שדה חובה';
        }

        if (!values.firstName) {
            errors.firstName = 'שדה חובה';
        }
        if (!values.lastName) {
            errors.lastName = 'שדה חובה';
        }
        if (!values.email) {
            errors.email = 'שדה חובה';
        }
        if (!values.phone) {
            errors.phone = 'שדה חובה';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            userId: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            isManager: false
        },
        validate,
        onSubmit: values => {
            save();
        },
    });

    const save = async () => {
        console.log("save CourseRegistered");
        const user: User = new User();
        user.userId = formik.values.userId;
        user.password = formik.values.password;
        user.communityAdministrationId = myContext.userData?.communityAdministrationId || "";
        user.firstName = formik.values.firstName;
        user.lastName = formik.values.lastName;
        user.email = formik.values.email;
        user.phone = formik.values.phone;
        user.isManager = formik.values.isManager;
        await UserService.addUser(myContext.userData?.userId, myContext.userData?.password, user)
            .then((res: any) => {
                setStatus(res);
            })
        let sentence = "add";
        navigate('../userWrapper', { state: { user } });
    }
    return (
        <>
            <div className='bodyAddingUser'>
                <h1 className='titleAddUser'>הוספת משתמש חדש</h1>
                <form onSubmit={formik.handleSubmit} dir="rtl" className='formAddUser'>
                    <div className='rightPane'>
                        <label className='addUserLbl' htmlFor="userId">תעודת זהות</label><br></br><br></br>
                        <input id="userIdInput" name="userId" value={formik.values.userId} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                        </input><br></br><br></br>
                        {formik.touched.userId && formik.errors.userId ? <div id='error'>{formik.errors.userId}</div> : null}
                        <label className='addUserLbl' htmlFor="password">סיסמא</label><br></br><br></br>
                        <input id="password" name="password" type="password"
                            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} /><br></br><br></br>
                        {formik.touched.password && formik.errors.password ? <div id='error'>{formik.errors.password}</div> : null}
                        <label className='addUserLbl' htmlFor="firstName">שם פרטי</label><br></br><br></br>
                        <input id="firstName" name="firstName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur}
                            value={formik.values.firstName} /><br></br><br></br>
                        {formik.touched.firstName && formik.errors.firstName ? <div id='error'>{formik.errors.firstName}</div> : null}
                    </div>
                    <div className='leftPane'>
                        <label className='addUserLbl' htmlFor="lastName">שם משפחה</label><br></br><br></br>
                        <input id="lastName" name="lastName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} /><br></br><br></br>
                        {formik.touched.lastName && formik.errors.lastName ? <div id='error'>{formik.errors.lastName}</div> : null}
                        <label className='addUserLbl' htmlFor="email">מייל</label><br></br><br></br>
                        <input id="email" name="email" type="mail" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} /><br></br><br></br>
                        {formik.touched.email && formik.errors.email ? <div id='error'>{formik.errors.email}</div> : null}
                        <label className='addUserLbl' htmlFor="phone">טלפון</label><br></br><br></br>
                        <input id="phone" name="phone" type="mail" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} /><br></br><br></br>
                        {formik.touched.phone && formik.errors.phone ? <div id='error'>{formik.errors.phone}</div> : null}<br></br><br></br>
                    </div>
                    <button className="saveAddingUser" type="submit">לשמירה</button>
                </form>
            </div>
        </>
    )
}
export default AddUser;
