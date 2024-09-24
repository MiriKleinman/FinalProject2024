import React, { useEffect, useState, useContext } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import User from '../../interfaces/User';
import CommunityAdministration from '../../interfaces/CommunityAdministration';
import CommunityAdministrationService from '../../Services/CommunityAdministrationService';
import { UserContext } from '../../App';
import { CommunityAdministrationContext } from './CommunityAdministrations';
import './UpdateCommunityAdministration.css';

const UpdateCommunityAdministration = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [status, setStatus] = useState(0);
    const myContext = useContext(UserContext);
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
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'כתובת מייל לא חוקית';
        }

        if (!values.phone) {
            errors.phone = 'שדה חובה';
        }
        else if (values.phone.length > 10 || values.phone.length < 9)
            errors.phone = 'מספר טלפון לא חוקי'
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            name: String(communityAdministrationContext.currentCommunityAdministration?.name),
            address: String(communityAdministrationContext.currentCommunityAdministration?.address),
            email: String(communityAdministrationContext.currentCommunityAdministration?.email),
            phone: String(communityAdministrationContext.currentCommunityAdministration?.phone)
        },
        validate,
        onSubmit: values => {
            save();
        },
    });

    const save = async () => {
        debugger
        console.log(myContext.userData, "myContext.userData from save update");
        const communityAdministration: CommunityAdministration = new CommunityAdministration();
        communityAdministration.communityAdministrationId = String(communityAdministrationContext.currentCommunityAdministration?.communityAdministrationId);
        communityAdministration.name = formik.values.name;
        communityAdministration.address = formik.values.address;
        communityAdministration.email = formik.values.email;
        communityAdministration.phone = formik.values.phone;
        await CommunityAdministrationService.updateCommunityAdministration(communityAdministration, communityAdministrationContext.currentCommunityAdministration?.communityAdministrationId, myContext.userData?.userId, myContext.userData?.password)
            .then((res: any) => {
                console.log(res, "res of update");
                setStatus(res);
            })
    }


    return (
        <>
            <h1 className='editCommunityTitle' dir='rtl'>עדכון פרטי מינהל קהילתי {communityAdministrationContext.currentCommunityAdministration?.name}</h1>
            <form onSubmit={formik.handleSubmit} dir="rtl" className='editCommunityForm'>
                <label htmlFor="name">שם</label><br></br><br></br>
                <input id="communityName" name="name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} /><br></br><br></br>
                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
                <label htmlFor="address">כתובת</label><br></br><br></br>
                <input id="address" name="address" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} /><br></br><br></br>
                {formik.touched.address && formik.errors.address ? <div>{formik.errors.address}</div> : null}
                <label htmlFor="email"> מייל</label><br></br><br></br>
                <input id="email" name="email" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} /><br></br><br></br>
                {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <label htmlFor="phone">טלפון </label><br></br><br></br>
                <input id="phone" name="phone" type="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
                {formik.touched.phone && formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
                <button type="submit" className='saveEditCommunity'>לשמירה</button>
                {status === 1 && <h3>התעדכן בהצלחה </h3>}
            </form>
        </>
    )
}
export default UpdateCommunityAdministration;
