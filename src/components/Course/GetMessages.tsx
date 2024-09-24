import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { width } from '@mui/system';
import MessageService from '../../Services/MessageService';
import Message from '../../interfaces/Message';
import './GetMessage.css';
import { CourseContext } from './Course';
import { UserContext } from '../../App';
const GetMessages = () => {
    const location = useLocation();
    const [messages, setMessages] = useState<Message[]>([]);
    const myContext = useContext(UserContext);
    const courseContext = useContext(CourseContext);
    const getMessages = async () => {
        return await MessageService.getMessageOfCourse(courseContext.currentCourse?.courseId, courseContext.currentCourse?.communityAdministrationId)
    }
    const fetchData = async () => {
        var res = await getMessages();
        setMessages(res)
        messages.map((m: any) => { console.log(m.messageContent) })
    }
    useEffect(() => {
        fetchData();
        console.log(courseContext.currentCourse);
    }, []);

    return (
        <>
            <div className='messages'>
                {messages && messages.map((m: any) => {
                    return <div className='messageBlock' dir='rtl'>{`${new Date(m.creationDateOfMessage).getDate()}/${new Date(m.endTimeOfMessage).getMonth()}/${new Date(m.endTimeOfMessage).getFullYear()}`}
                        <br></br>{m.messageContent}</div>
                })}
            </div>
        </>
    )
}
export default GetMessages;