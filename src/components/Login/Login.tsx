import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import LoginService from '../../Services/LoginService';
import './Login.css';
import isolation_Mode from '../../images/isolation_Mode.png';
import { UserContext } from '../../App';
import User from '../../interfaces/User';

const Login = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [status, setStatus] = useState(0);
    const myContext = useContext(UserContext);
    const validate = (values: any) => {
        const errors: any = {};
        if (!values.userId) {
            errors.userId = 'שדה חובה';
        } else if (values.userId.length != 9) {
            errors.userId = 'תעודת זהות חייבת להכיל 9 ספרות';
        }
        if (!values.userPassword) {
            errors.userPassword = 'שדה חובה';
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            userId: '',
            userPassword: ''
        },
        validate,
        onSubmit: values => {
            login();
        },
    });
    const login = async () => {
        await LoginService.login(formik.values.userId, formik.values.userPassword)
            .then((res: any) => {
                setStatus(res);
            })
    }
    const getManagerDetails = async () => {
        var managerDetails: any;
        await LoginService.getUserById(formik.values.userId, formik.values.userPassword).then((res: any) => {
            managerDetails = res;
            myContext.setUserData(res);
            localStorage.setItem("mainManager",JSON.stringify(res));
            console.log(managerDetails, "managerDetails");
            console.log(myContext.userData, "manager");

        });
        return managerDetails;
    }
    const getUserDetails = async () => {
        var userDetails: any;
        await LoginService.getUserById(formik.values.userId, formik.values.userPassword).then((res: any) => {
            userDetails = res;
            myContext.setUserData(res);
            localStorage.setItem("user",JSON.stringify(res));
            console.log(myContext.userData, "userdata");
            console.log(userDetails, "userDetails");
        });
        return userDetails;
    }

    useEffect(() => {
        const fetchData = async () => {
            setStatus(status);
            console.log(status + " useEffect");
            if (status === 5) {
                var data = await getManagerDetails();
                console.log(data, "data");
                navigate('communityAdministrations', { state: data });
            }
            if (status == 1) {
                var data = await getUserDetails();
                console.log(data, "data");
                navigate(`/home`, { state: data });
            }
        }
        fetchData();
    }, [status]);
    return (
        <>

            <div id='loginBody'>
                <div id='divDetails'>
                    <div id='centered'>
                        <h2 dir='rtl' className='loginTitle'>יש להזין פרטי הזדהות לכניסה</h2>
                        <form onSubmit={formik.handleSubmit} dir='rtl'>
                            <label htmlFor="userId" dir='rtl' className='userIdInput'>תעודת זהות</label><br></br><br></br>
                            <input
                                id="userId"
                                name="userId"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userId}
                            /><br></br><br></br>
                            {formik.touched.userId && formik.errors.userId ? <div>{formik.errors.userId}</div> : null}
                            <label htmlFor="userPassword" dir='rtl' className='userPasswordInput'>סיסמה</label><br></br><br></br>
                            <input
                                id="userPassword"
                                name="userPassword"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userPassword}
                            /><br></br><br></br><br></br><br></br>
                            {status === 3 || status === 2 ? <h1>משתמש לא רשום פנה למנהל המערכת </h1> : null}
                            {status === 4 ? <h1>סיסמה שגויה</h1> : null}
                            {formik.errors.userPassword ? <div>{formik.errors.userPassword}</div> : null}
                            <button type="submit" dir='center' className='loginButton'>לכניסה</button><br></br>
                        </form>
                    </div>
                </div>
                <div id='divSentences'>
                    <div id='centered' dir='rtl'>
                        <a id='sen1'>קהילה זה</a>
                        <a id='sen2'>לא רק מקום,</a>
                        <a id='sen3'>זו תחושה!</a>
                        <span id='sen4'>חושבים כל יום איך לעשות טוב...</span>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Login;

