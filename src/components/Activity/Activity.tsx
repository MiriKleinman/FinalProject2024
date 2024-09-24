import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Activity from '../../interfaces/Activity';
import ActivityService from '../../Services/ActivityService';
import ToolbarNavigation from '../Home/ToolbarNavigation';
import Paper from '@mui/material/Paper';
import iconActivity from '../../images/iconActivity.png';
import deleteIcon from '../../images/deleteIcon.png';
import messageIcon from '../../images/messageIcon.png';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import './Activity.css';
import AddActivity from './AddACtivity';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import close from '../../images/close.png';
import ActivityEditing from './ActivityEditing';
import { UserContext } from '../../App';
import FullViewOfActivity from './FullViewOfActivity';
import SendMessage from './SendMessage';


type Anchor = 'top' | 'left' | 'bottom' | 'right';
export const ActivityContext = React.createContext<ContextProps>({
    activityData: null,
    currentActivity: null,
    setActivityData: () => null,
    setCurrentActivity: () => null
});
interface ContextProps {
    readonly activityData: Activity[] | null;
    readonly currentActivity: Activity | null;
    readonly setActivityData: (activityData: Activity[]) => void;
    readonly setCurrentActivity: (currentActivity: Activity) => void;
}
const Activities = () => {
    var res: any;
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [dataActivities, setDataActivities] = useState<any[]>([]);
    const [stateActivities, setStateActivities] = useState<any[]>([]);
    const [activityChange, setActivityChange] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [activityDetails, setActivityDetails] = useState<Activity>();
    const [fullViewFlag, setFullViewFlag] = useState(false);
    const [status, setStatus] = useState();
    const myContext = useContext(UserContext);

    var activitiesList: any;
    const [state, setState] = useState<{
        left: boolean;
        activePopup: 'addActivity' | 'activityEditing' | 'sendMessage' | null;
    }>
        ({
            left: false,
            activePopup: null,
        });
    const [activityData, setActivityData] = useState<Activity[] | null>(null);
    const value = {
        activityData,
        setActivityData,
    };
    const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
    const currentActivityValue = {
        currentActivity,
        setCurrentActivity,
    };
    const handleClose = () => {
        setOpen(false);
    };
    const toggleDrawerAddActivity = (open: boolean) => {
        setState({ ...state, left: open, activePopup: 'addActivity' });
    };

    const listAddActivity = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawerAddActivity(false)}
            onKeyDown={() => toggleDrawerAddActivity(false)}
        >
            <Divider />
        </Box>
    );
    const toggleDrawerEditActivity = (open: boolean) => {
        setState({ ...state, left: open, activePopup: 'activityEditing' });
    };

    const listEditActivity = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawerEditActivity(false)}
            onKeyDown={() => toggleDrawerEditActivity(false)}
        >
            <Divider />
        </Box>
    );
    const toggleDrawerSendMessage = (open: boolean) => {
        setState({ ...state, left: open, activePopup: 'sendMessage' });
    };

    const listSendMessage = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawerSendMessage(false)}
            onKeyDown={() => toggleDrawerSendMessage(false)}
        >
            <Divider />
        </Box>
    );
    const getActivities = async () => {
        console.log(dataActivities, "dataActivities getActivities");
        return await ActivityService.getActivities(myContext.userData?.communityAdministrationId, params.targetAudience).then((res: any) => {
            activitiesList = res;
            console.log(activitiesList, "activitiesList getActivities");
            return activitiesList;
        })
    }
    const editActivity = async (row: any) => {
        setCurrentActivity(row);
        toggleDrawerEditActivity(true);
    }
    const deleteActivity = async () => {
        console.log(activityDetails, "activity");
        if (activityDetails) {
            await ActivityService.deleteActivity(activityDetails.activityId, myContext.userData?.userId);
            handleClose();
            fetchData();
        }
    }
    const checkForDelete = async (row: any) => {
        setActivityDetails(row);
        res = await ActivityService.checkForDelete(row.activityId, myContext.userData?.userId);
        console.log(res, "res");
        setStatus(res && res);
        setOpen(true);
        await fetchData();
        console.log(res, "result of delete");
    }
    const sendMessage = async (row: any) => {
        setCurrentActivity(row);
        toggleDrawerSendMessage(true);
    }
    const fullViewOfActivity = async (row: any) => {
        setCurrentActivity(row);
        setFullViewFlag(true);
    }
    const fetchData = async () => {
        debugger
        var data = await getActivities();
        console.log(data, "data");
        var stateActivity: number[] = [];
        data.forEach(async (activity: Activity) => {
            console.log(stateActivity, "stateActivity in foreach");
            setStateActivities([...stateActivity]);
        });
        setDataActivities([...data]);
        setActivityData([...data]);
    }
    useEffect(() => {
        fetchData();
    }, [params.targetAudience]);



    return (
        <>
            <ActivityContext.Provider value={{ activityData, setActivityData, currentActivity, setCurrentActivity }}>
                {fullViewFlag ? <FullViewOfActivity></FullViewOfActivity> :
                    <div id='activityBody'>
                        <ToolbarNavigation></ToolbarNavigation>
                        <div className='titleWrapper'>
                            <img className='icon' src={iconActivity}></img>
                            <h3 dir='rtl' className='title'>זמני הפעילויות הקרובות ל{params.targetAudience}</h3>
                            <h3 dir='rtl' className='subTitle'>עדכון ועריכת שעות הפעילויות</h3>
                        </div>
                        <TableContainer component={Paper} id="table">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left">מצב רישום</TableCell>
                                        <TableCell align="left"> מספר משתתפים מקסימלי</TableCell>
                                        <TableCell align="left">עלות</TableCell>
                                        <TableCell align="left">זמן</TableCell>
                                        <TableCell align="left"> הפעילות</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataActivities.map((row, i) => (
                                        <TableRow
                                            key={row.ActivityId}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left"><a onClick={() => checkForDelete(row)}><img src={deleteIcon} className='deleteLink'></img></a></TableCell>
                                            <TableCell align="left"><a onClick={() => sendMessage(row)}><img src={messageIcon} className='sendMessageLink'></img></a></TableCell>
                                            <TableCell align="left"><a onClick={() => editActivity(row)} className='editLink'>עריכה</a></TableCell>
                                            <TableCell align="left"><a onClick={() => fullViewOfActivity(row)} className='fullViewLink'>צפייה בפרטי הפעילות</a></TableCell>
                                            <TableCell align="left">{row.countOfParticipants + '/' + row.maxParticipants}</TableCell>
                                            <TableCell align="left">{row.maxParticipants}</TableCell>
                                            <TableCell align="left">{row.cost}</TableCell>
                                            <TableCell align="left">יום {row.day} {row.date}<br></br>בין השעות {row.endTime} - {row.beginngTime}</TableCell>
                                            <TableCell align="left">{row.activityName}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div id="popUp">
                            <React.Fragment key={"left"}>
                                <button className="addActivity" onClick={() => toggleDrawerAddActivity(true)}>להוספת פעילות</button>
                                {state.activePopup === 'addActivity' && (
                                    <Drawer
                                        anchor={"left"}
                                        open={state["left"]}
                                        onClose={() => toggleDrawerAddActivity(false)}
                                    >
                                        {listAddActivity("left")}
                                        <img src={close} className='closeAddingIcon' onClick={() => toggleDrawerAddActivity(false)}></img>
                                        <AddActivity></AddActivity>
                                    </Drawer>
                                )}
                            </React.Fragment>
                        </div>
                        <div id="popUp">
                            <React.Fragment key={"left"}>
                                {state.activePopup === 'activityEditing' && (
                                    <Drawer
                                        anchor={"left"}
                                        open={state["left"]}
                                        onClose={() => toggleDrawerEditActivity(false)}
                                    >
                                        {listEditActivity("left")}
                                        <img src={close} className='closeAddingIcon' onClick={() => toggleDrawerEditActivity(false)}></img>
                                        <ActivityEditing></ActivityEditing>
                                    </Drawer>
                                )}
                            </React.Fragment>
                            <React.Fragment key={"left"}>
                                {state.activePopup === 'sendMessage' && (
                                    <Drawer
                                        anchor={"left"}
                                        open={state["left"]}
                                        onClose={() => toggleDrawerSendMessage(false)}
                                    >
                                        {listSendMessage("left")}
                                        <img src={close} className='closeAddingIcon' onClick={() => toggleDrawerSendMessage(false)}></img>
                                        <SendMessage></SendMessage>
                                    </Drawer>
                                )}
                            </React.Fragment>
                        </div>
                        {status ?
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title" dir="rtl">
                                    {"האם אתה בטוח שברצונך למחוק את הפעילות?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description" dir="rtl">
                                        אם תאשר את המחיקה, הפעילות תמחק לנצח ולא תהיה אפשרות לשחזר אותה.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions dir="rtl">
                                    <Button onClick={handleClose} autoFocus >אל תמחק</Button>
                                    <Button onClick={() => deleteActivity()} >
                                        בסדר, מוכן
                                    </Button>
                                </DialogActions>
                            </Dialog> :
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title" dir="rtl">
                                    {"אין אפשרות למחוק את הפעילות"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description" dir="rtl">
                                        יש נרשמים לפעילות, או שאין לך את ההרשאות למחיקת פעילות.
                                        פנה למנהל המערכת.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions dir="rtl">
                                    <Button onClick={handleClose} autoFocus dir="rtl">
                                        קבלתי, תודה
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        }
                    </div>}
            </ActivityContext.Provider>
        </>
    )
}
export default Activities;