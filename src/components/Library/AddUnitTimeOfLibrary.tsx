import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import UnitTimeOfLibrary from '../../interfaces/UnitTimeOfLibrary';
import LibraryService from '../../Services/LibraryService';
import './AddUnitTime.css';
import { UserContext } from '../../App';
import close from '../../images/close.png';

const AddUnitTimeOfLibrary = () => {
    const location = useLocation();
    const [status, setStatus] = useState(0);
    const myContext = useContext(UserContext);
    let libraryId: number;
    const navigate = useNavigate();
    const getLibraryId = async () => {
        return await LibraryService.getLibraryId(myContext.userData?.communityAdministrationId).then((res: any) => {
            libraryId = res;
            console.log(libraryId, "libraryId");
            return libraryId;
        })
    }
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
            targetAudience: '',
            day: '',
            beginningTime: '',
            endTime: ''
        },
        validate,
        onSubmit: values => {
            save();
        },
    });
    const save = async () => {
        console.log("save CourseRegistered");
        const unitTime: UnitTimeOfLibrary = new UnitTimeOfLibrary();
        unitTime.libraryId = await getLibraryId();
        unitTime.targetAudience = formik.values.targetAudience;
        unitTime.day = formik.values.day;
        unitTime.beginngTime = formik.values.beginningTime;
        unitTime.endTime = formik.values.endTime;
        console.log(unitTime, "unitTime");
        await LibraryService.addUnitTimeOfLibrary(unitTime, myContext.userData?.userId)
            .then((res: any) => {
                setStatus(res);
            })
        let sentence = "add";
        navigate('../libraryWrapper', { state: { sentence } });
    }
    return (
        <>
            <div id='body'>
                <h1 className='titleAddUnitTime'>הוספת שעות פעילות לספריה</h1>
                <form onSubmit={formik.handleSubmit} dir="rtl" className='formAddUnitTime'>
                    <label className='addUnitTimeLibraryLbl' htmlFor="targetAudience">קהל יעד</label><br></br><br></br>
                    <select id="targetAudience" name="targetAudience" value={formik.values.targetAudience} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                        <option></option>
                        <option value="נשים" label="נשים"></option>
                        <option value="בנות" label="בנות"></option>
                        <option value="בנים" label="בנים"></option>
                    </select><br></br><br></br>
                    {formik.touched.targetAudience && formik.errors.targetAudience ? <div id='error'>{formik.errors.targetAudience}</div> : null}
                    <label className='addUnitTimeLibraryLbl' htmlFor="day"> יום </label><br></br><br></br>
                    <select id="day" name="day" value={formik.values.day} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                        <option></option>
                        <option value="ראשון" label="ראשון"></option>
                        <option value="שני" label="שני"></option>
                        <option value="שלישי" label="שלישי"></option>
                        <option value="רביעי" label="רביעי"></option>
                        <option value="חמישי" label="חמישי"></option>
                    </select><br></br><br></br>
                    {formik.touched.day && formik.errors.day ? <div id='error'>{formik.errors.day}</div> : null}
                    <label className='addUnitTimeLibraryLbl' htmlFor="beginningTime">שעת התחלה </label><br></br><br></br>
                    <input id="beginningTime" name="beginningTime" type="beginningTime"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.beginningTime} /><br></br><br></br>
                    {formik.touched.beginningTime && formik.errors.beginningTime ? <div id='error'>{formik.errors.beginningTime}</div> : null}
                    <label className='addUnitTimeLibraryLbl' htmlFor="endTime">  שעת סיום</label><br></br><br></br>
                    <input id="endTime" name="endTime" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endTime} /><br></br><br></br>
                    {formik.touched.endTime && formik.errors.endTime ? <div id='error'>{formik.errors.endTime}</div> : null}<br></br><br></br><br></br>
                    <button className="saveAddingUnitTime" type="submit">לשמירה</button>
                    {/* {status === 1 && <h3 id='success'> שעות פעילות ליום {formik.values.day} נוספו בהצלחה!</h3>} */}
                </form>
            </div>
        </>
    )
}
export default AddUnitTimeOfLibrary;
