import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import './AddUnitTime.css';
import close from '../../images/close.png';
import PlayingCenterService from '../../Services/PlayingCenterService';
import UnitTimeOfPlayingCenter from '../../interfaces/UnitTimeOfPlayingCenter';
import { UserContext } from '../../App';
const AddUnitTimeOfPlayingCenter = () => {
    const location = useLocation();
    const [status, setStatus] = useState(0);
    const myContext = useContext(UserContext);
    let playingCenterId: number;
    const navigate = useNavigate();
    const getPlayingCenterId = async () => {
        return await PlayingCenterService.getPlayingCenterId(myContext.userData?.communityAdministrationId).then((res: any) => {
            playingCenterId = res;
            console.log(playingCenterId, "playingCenterId");
            return playingCenterId;
        })
    }
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
            operatorName: '',
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
        const unitTime: UnitTimeOfPlayingCenter = new UnitTimeOfPlayingCenter();
        unitTime.playingCenterId = await getPlayingCenterId();
        unitTime.operatorName = formik.values.operatorName;
        unitTime.day = formik.values.day;
        unitTime.beginningTime = formik.values.beginningTime;
        unitTime.endTime = formik.values.endTime;
        console.log(unitTime, "unitTime");
        await PlayingCenterService.addUnitTimeOfPlayingCenter(unitTime, myContext.userData?.userId)
            .then((res: any) => {
                setStatus(res);
            })
        let sentence = "add";
        navigate('../playingCenterWrapper', { state: { sentence } });
    }
    return (
        <>
            <div id='body'>
                <h1 className='addUnitTimeTitle'>הוספת שעות פעילות למשחקיה</h1>
                {/* <img id='iconClose' src={close}></img> */}
                <form onSubmit={formik.handleSubmit} dir="rtl" className='addUnitTimeForm'>
                    <label className='addUnitTimeLbl' htmlFor="day"> יום </label><br></br>
                    <select id="day" name="day" value={formik.values.day} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                        <option></option>
                        <option value="ראשון" label="ראשון"></option>
                        <option value="שני" label="שני"></option>
                        <option value="שלישי" label="שלישי"></option>
                        <option value="רביעי" label="רביעי"></option>
                        <option value="חמישי" label="חמישי"></option>
                    </select><br></br>
                    {formik.touched.day && formik.errors.day ? <div>{formik.errors.day}</div> : null}
                    <label className='addUnitTimeLbl' htmlFor="beginningTime">שעת התחלה </label><br></br>
                    <input id="beginningTime" name="beginningTime" type="beginningTime"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.beginningTime} /><br></br>
                    {formik.touched.beginningTime && formik.errors.beginningTime ? <div>{formik.errors.beginningTime}</div> : null}
                    <label className='addUnitTimeLbl' htmlFor="endTime">  שעת סיום</label><br></br>
                    <input id="endTime" name="endTime" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endTime} /><br></br>
                    {formik.touched.endTime && formik.errors.endTime ? <div>{formik.errors.endTime}</div> : null}<br></br>
                    <label className='addUnitTimeLbl' htmlFor="operatorName">מפעילה </label><br></br>
                    <input id="operatorName" name="operatorName" type="operatorName"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.operatorName} /><br></br><br></br>
                    {formik.touched.beginningTime && formik.errors.beginningTime ? <div>{formik.errors.operatorName}</div> : null}
                    <button className='saveAdditingBtn' type="submit">לשמירה</button>
                    {/* {status === 1 && <h3 id='success'> שעות פעילות ליום {formik.values.day} נוספו בהצלחה!</h3>} */}
                </form>
            </div>
        </>
    )
}
export default AddUnitTimeOfPlayingCenter;
