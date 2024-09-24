import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { width } from '@mui/system';
import { useFormik } from 'formik';
import MessageService from '../../Services/MessageService';
import Message from '../../interfaces/Message';
import { ActivityContext } from './Activity';
import { UserContext } from '../../App';
import './SendMessageActivity.css';

const SendMessage = () => {
    const location = useLocation();
    const activityContext = useContext(ActivityContext);
    const myContext = useContext(UserContext);
    const [res, setRes] = useState(0);
    const validate = (values: any) => {
        const errors: any = {};
        if (!values.endTimeOfMessage) {
            errors.endTimeOfMessage = 'שדה חובה';
        }
        if (!values.messageContent) {
            errors.messageContent = 'שדה חובה';
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            endTimeOfMessage: '',
            messageContent: ''
        },
        validate,
        onSubmit: values => {
            sendMessage();
        },
    });
    const sendMessage = async () => {
        var message: Message = new Message();
        console.log(location.state);
        message.activityId = Number(activityContext.currentActivity?.activityId);
        message.endTimeOfMessage = new Date(formik.values.endTimeOfMessage);
        message.messageContent = formik.values.messageContent;
        setRes(await MessageService.addMessage(message, myContext.userData?.userId))
    }
    return (
        <>
            {res === 1 ? <h1 className='successSendMessage' dir='rtl'>ההודעה נשלחה בהצלחה!</h1> :
                <><form onSubmit={formik.handleSubmit} dir='rtl' className='formSendMessageActivity'>
                    <label htmlFor="endTimeOfMessage" dir='rtl'> עד מתי תוצג ההודעה?</label><br></br><br></br>
                    <input
                        id="endTimeOfMessage"
                        name="endTimeOfMessage"
                        type="date"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.endTimeOfMessage} /><br></br><br></br>
                    {formik.touched.endTimeOfMessage && formik.errors.endTimeOfMessage ? <div>{formik.errors.endTimeOfMessage}</div> : null}
                    <label htmlFor="messageContent" dir='rtl'> הקלד תוכן...</label><br></br><br></br>
                    <input
                        id="messageContent"
                        name="messageContent"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.messageContent}
                        className="content"
                        dir='rtl'
                    ></input>
                    {formik.touched.messageContent && formik.errors.messageContent ? <div>{formik.errors.messageContent}</div> : null}
                </form><button onClick={sendMessage} className="sendButton">שליחה</button></>
            }
        </>
    )
}
export default SendMessage;