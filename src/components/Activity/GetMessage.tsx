import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { width } from '@mui/system';
import MessageService from '../../Services/MessageService';
import Message from '../../interfaces/Message';
import { ActivityContext } from './Activity';


const GetMessages = () => {
    const location = useLocation();
    const activityContext = useContext(ActivityContext);
    const [messages, setMessages] = useState<Message[]>([]);
    const getMessages = async () => {
        return await MessageService.getMessageOfActivity(activityContext.currentActivity?.activityId, activityContext.currentActivity?.communityAdministrationId)
    }
    const fetchData = async () => {
        var res = await getMessages();
        setMessages(res)
        messages.map((m: any) => { console.log(m.messageContent) })
    }
    useEffect(() => {
        fetchData();
        console.log(activityContext.currentActivity, "activityContext.currentActivity");

    }, []);
    return (

        <>
            <div className='messages'>
                {messages && messages.map((m: any) => {
                    return <div className='messageBlock' dir='rtl'>{m.creationDateOfMessage}
                        <br></br>{m.messageContent}</div>
                })}
            </div>
        </>
    )
}
export default GetMessages;