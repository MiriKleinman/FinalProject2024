import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import User from '../../interfaces/User';
import CommunityAdministration from '../../interfaces/CommunityAdministration';
import CommunityAdministrationService from '../../Services/CommunityAdministrationService';
import NewCommunityAdministration from '../../interfaces/CommunityAdministrationDto';
import CommunityAdministrationDto from '../../interfaces/CommunityAdministrationDto';
import { UserContext } from '../../App';
import { CommunityAdministrationContext } from './CommunityAdministrations';
import './AddCommunityAdministration.css';

const AddCommunityAdministration = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const myContext = useContext(UserContext);
    const [status, setStatus] = useState(0);
    const communityAdministrationContext = useContext(CommunityAdministrationContext);

    const validate = (values: any) => {
        const errors: any = {};
        if (!values.name) {
            errors.name = 'שדה חובה';
        }
        if (!values.address) {
            errors.address = 'שדה חובה';
        }
        if (!values.email) {
            errors.email = 'שדה חובה';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'כתובת מייל לא חוקית';
        }

        if (!values.phone) {
            errors.phone = 'שדה חובה';
        }
        else if (values.phone.length > 10 || values.phone.length < 9)
            errors.phone = 'מספר טלפון לא חוקי'
        if (!values.userId) {
            errors.userId = 'שדה חובה';
        } else if (values.userId.length < 9) {
            errors.userId = 'תעודת זהות חייבת להכיל 9 ספרות';
        }
        if (!values.password) {
            errors.password = 'שדה חובה';
        }

        if (!values.communityAdministrationId) {
            errors.communityAdministrationId = 'שדה חובה';
        }
        if (!values.firstName) {
            errors.firstName = 'שדה חובה';
        }

        if (!values.lastName) {
            errors.lastName = 'שדה חובה';
        }

        if (!values.managerEmail) {
            errors.managerEmail = 'שדה חובה';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.managerEmail)) {
            errors.managerEmail = 'כתובת מייל לא חוקית';
        }

        if (!values.managerPhone) {
            errors.managerPhone = 'שדה חובה';
        }
        else if (values.managerPhone.length > 10 || values.managerPhone.length < 9)
            errors.managerPhone = 'מספר טלפון לא חוקי'
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            email: '',
            phone: '',
            userId: "",
            password: '',
            communityAdministrationId: "",
            firstName: '',
            lastName: '',
            managerEmail: '',
            managerPhone: ''
        },
        validate,
        onSubmit: values => {
            save();
        },
    });

    const save = async () => {
        debugger
        const newCommunityAdministration: CommunityAdministrationDto = new CommunityAdministrationDto();
        newCommunityAdministration.communityAdministrationId = formik.values.communityAdministrationId;
        newCommunityAdministration.name = formik.values.name;
        newCommunityAdministration.address = formik.values.address;
        newCommunityAdministration.email = formik.values.email;
        newCommunityAdministration.phone = formik.values.phone;
        newCommunityAdministration.userId = formik.values.userId || "";
        newCommunityAdministration.password = formik.values.password;
        newCommunityAdministration.firstName = formik.values.firstName;
        newCommunityAdministration.lastName = formik.values.lastName;
        newCommunityAdministration.emailManager = formik.values.managerEmail;
        newCommunityAdministration.phoneManager = formik.values.managerPhone;
        newCommunityAdministration.isManager = true;
        await CommunityAdministrationService.addCommunityAdministration(newCommunityAdministration, myContext.userData?.userId, myContext.userData?.password)
            .then((res: any) => {
                console.log(res);
                setStatus(res);
            })
    }

 
    return (
        <>
            {status === 1 ? <h3 className='addingCommunitySuccess'>מינהל קהילתי {formik.values.name} נוסף בהצלחה!</h3> :
                <><h1 className='addCommunityTitle'>הוספת מינהל קהילתי למערכת</h1><form onSubmit={formik.handleSubmit} dir="rtl" className='addCommunityForm'>
                    <label htmlFor="name" className='communityLbl'>שם </label><br></br>
                    <input className="communityName" name="name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} /><br></br><br></br>
                    {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
                    <label htmlFor="address" className='communityLbl'>כתובת</label><br></br>
                    <input className="communityAddress" name="address" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} /><br></br><br></br>
                    {formik.touched.address && formik.errors.address ? <div>{formik.errors.address}</div> : null}
                    <label htmlFor="email" className='communityLbl'> מייל</label><br></br>
                    <input className="communityEmail" name="email" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} /><br></br><br></br>
                    {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                    <label htmlFor="phone" className='communityLbl'>טלפון </label><br></br>
                    <input className="communityPhone" name="phone" type="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} /><br></br><br></br>
                    {formik.touched.phone && formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
                    <label htmlFor="communityAdministrationId" className='communityLbl'>קוד </label><br></br>
                    <input className="communityAdministrationId" name="communityAdministrationId" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.communityAdministrationId} /><br></br><br></br>
                    {formik.touched.communityAdministrationId && formik.errors.communityAdministrationId ? <div>{formik.errors.communityAdministrationId}</div> : null}
                    <h3 className='managerDetails'>פרטי מנהל המנהל</h3>
                    <label htmlFor="userId" className='communityLbl'>תעודת זהות </label><br></br>
                    <input className="managerId" name="userId" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userId} /><br></br><br></br>
                    {formik.touched.userId && formik.errors.userId ? <div>{formik.errors.userId}</div> : null}
                    <label htmlFor="password" className='communityLbl'>סיסמה</label><br></br>
                    <input className="managerPassword" name="password" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} /><br></br><br></br>
                    {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                    <label htmlFor="firstName" className='communityLbl'>שם פרטי</label><br></br>
                    <input className="managerFirstName" name="firstName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} /><br></br><br></br>
                    {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                    <label htmlFor="lastName" className='communityLbl'>שם משפחה</label><br></br>
                    <input className="managerLastName" name="lastName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} /><br></br><br></br>
                    {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
                    <label htmlFor="managerEmail" className='communityLbl'>מייל</label><br></br>
                    <input className="managerEmail" name="managerEmail" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.managerEmail} /><br></br><br></br>
                    {formik.touched.managerEmail && formik.errors.managerEmail ? <div>{formik.errors.managerEmail}</div> : null}
                    <label htmlFor="managerPhone" className='communityLbl'>טלפון</label><br></br>
                    <input className="managerPhone" name="managerPhone" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.managerPhone} /><br></br><br></br>
                    {formik.touched.managerPhone && formik.errors.managerPhone ? <div>{formik.errors.managerPhone}</div> : null}
                    <button type="submit" className='saveNewCommunity'>לשמירה</button>
                </form></>
            }
        </>
    )
}
export default AddCommunityAdministration;
