import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ToolbarNavigation from '../Home/ToolbarNavigation';
import './FullView.css';
import profil from '../../images/profil.png';
import countOfRegistereds from '../../images/countOfRegistereds.png';
import costIcon from '../../images/costIcon.png';
import courseTimeIcon from '../../images/courseTimeIcon.png';
import editIcon from '../../images/editIcon.png';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SendMessage from './SendMessage';
import GetMessages from './GetMessage';
import close from '../../images/close.png';
import dateIcon from '../../images/dateIcon.png';
import activityDescIcon from '../../images/activityDescIcon.png';
import ActivityEditing from './ActivityEditing';
import { ActivityContext } from './Activity';
import { UserContext } from '../../App';
import ParticipantInActivity from '../../interfaces/ParticipantInActivity';
import ActivityService from '../../Services/ActivityService';
import ActivityRegistering from './ActivityRegistering';
import { ExportToExcel } from '../ExportToExcel/ExportToExcel';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

const FullViewOfActivity = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [apiData, setApiData] = useState([]);
    const [value, setValue] = React.useState(0);
    const [participantInActivity, setParticipantInActivity] = useState<ParticipantInActivity[]>();
    const activityContext = useContext(ActivityContext);
    const myContext = useContext(UserContext);
    const formatDate = (date: Date) => {
        const formattedDate = date instanceof Date ? date : new Date(date);
        const day = formattedDate.getDate();
        const month = formattedDate.getMonth() + 1;
        const year = formattedDate.getFullYear();

        return `${day}/${month}/${year}`;
    };
    const [state, setState] = useState<{
        left: boolean;
        activePopup: 'editActivity' | 'addParticipant' | null;
    }>
        ({
            left: false,
            activePopup: null,
        });
    const toggleDrawerAddParticipant = (open: boolean) => {
        setState({ ...state, left: open, activePopup: 'addParticipant' });
    };
    const listAddParticipant = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawerAddParticipant(false)}
            onKeyDown={() => toggleDrawerAddParticipant(false)}
        >
            <Divider />
        </Box>
    );
    const toggleDrawerEditActivity = (open: boolean) => {
        setState({ ...state, left: open, activePopup: 'editActivity' });
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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        newValue === 0 ? <GetMessages></GetMessages> : <SendMessage></SendMessage>
        setValue(newValue);
    };
    const AntTabs = styled(Tabs)({
        borderBottom: '1px solid #e8e8e8',
        '& .MuiTabs-indicator': {
            backgroundColor: '#262041',
        },
    });
    const getParticipantInActivity = async () => {
        var activityParticipants = await ActivityService.getParticipantInActivity(activityContext.currentActivity?.activityId, myContext.userData?.userId);
        setParticipantInActivity(activityParticipants);
    }
    const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
        ({ theme }) => ({
            textTransform: 'none',
            minWidth: 0,
            [theme.breakpoints.up('sm')]: {
                minWidth: 0,
            },
            fontWeight: 600,
            marginRight: theme.spacing(1),
            color: '#C3C1CF',
            fontFamily: [
                'Noto Sans Hebrew'
            ].join(','),
            '&:hover': {
                color: '#262041',
                opacity: 1,
            },
            '&.Mui-selected': {
                color: '#262041',
                fontWeight: 600,
            },
            '&.Mui-focusVisible': {
                backgroundColor: '#262041'
            },
        }),
    );
    interface StyledTabsProps {
        children?: React.ReactNode;
        value: number;
        onChange: (event: React.SyntheticEvent, newValue: number) => void;
    }
    interface StyledTabProps {
        label: string;
    }
    useEffect(() => {
        getParticipantInActivity();
    }, [])
    return (
        <>
            <div className='bodyFullViewOfActivity'>
                <ToolbarNavigation></ToolbarNavigation>
                <ExportToExcel apiData={participantInActivity} fileName={`הנרשמים ל${activityContext.currentActivity?.activityName}`} />
                <div className='ActivityDetails'>
                    <div className='titleWrapper'>
                        <h1 dir='rtl' className='title'> {activityContext.currentActivity?.activityName}</h1>
                        <h1 dir='rtl' className='subTitle'>{activityContext.currentActivity?.description}</h1>
                    </div>
                    <img src={costIcon} className="costActivityIcon"></img>
                    {activityContext.currentActivity != undefined && activityContext.currentActivity?.cost > 0 ? <span className='costDetailsActivity' dir='rtl'>{activityContext.currentActivity?.cost} ש"ח</span>
                        : <span className='costDetailsActivity'>ההשתתפות חינם</span>}
                    <img src={countOfRegistereds} className="countOfRegisteredsActivityIcon"></img>
                    <span className='countOfParticipantsActivity' dir='rtl'>{activityContext.currentActivity?.maxParticipants} משתתפים</span>
                    <img src={dateIcon} className="dateIcon"></img>
                    <span className='activityDate' dir='rtl'>יום {activityContext.currentActivity?.day} {formatDate(activityContext.currentActivity?.endTimeOfPreview || new Date())}</span>                    <img src={courseTimeIcon} className="activityTimeIcon"></img>
                    <span className='activitytime' dir='rtl'>{activityContext.currentActivity?.beginngTime} - {activityContext.currentActivity?.endTime}</span>
                    <img src={editIcon} className="editActivityIcon"></img>
                    <a className='editActivityA' onClick={() => toggleDrawerEditActivity(true)}>עריכה</a>
                    {participantInActivity && activityContext.currentActivity && activityContext.currentActivity.maxParticipants > participantInActivity.length ?
                        <a className='addParticipantBtn' onClick={() => toggleDrawerAddParticipant(true)}>הוספת משתתף</a> : null}
                    <TableContainer className='table' component={Paper}>
                        <Table sx={{ minWidth: 100 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">מייל</TableCell>
                                    <TableCell align="left">טלפון</TableCell>
                                    <TableCell align="left">שם</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {participantInActivity && participantInActivity.map((p: any) => (
                                    <TableRow
                                        key={p.participantInActivityId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{p.email}</TableCell>
                                        <TableCell align="left">{p.phone}</TableCell>
                                        <TableCell align="left">{p.firstName} {p.lastName}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>

                <div className='activityMessages'>
                    <Box sx={{ bgcolor: 'var(--purple-text,  #C3C1CF);' }} dir="rtl">
                        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                            <AntTab label="הודעות שנשלחו" />
                            <AntTab label="הודעה חדשה" />
                        </AntTabs>
                    </Box>
                    {value === 1 ? <SendMessage></SendMessage> : <GetMessages></GetMessages>}
                </div>
                <div id="popUp">
                    <React.Fragment key={"left"}>
                        {state.activePopup === 'editActivity' && (
                            <Drawer
                                anchor={"left"}
                                open={state["left"]}
                                onClose={() => toggleDrawerEditActivity(false)}
                            >
                                {listEditActivity("left")}
                                <img src={close} className='closePageIcon' onClick={() => toggleDrawerEditActivity(false)}></img>
                                <ActivityEditing></ActivityEditing>
                            </Drawer>
                        )}
                    </React.Fragment>
                    <React.Fragment key={"left"}>
                        {state.activePopup === 'addParticipant' && (
                            <Drawer
                                anchor={"left"}
                                open={state["left"]}
                                onClose={() => toggleDrawerAddParticipant(false)}
                            >
                                {listAddParticipant("left")}
                                <img src={close} className='closePageIcon' onClick={() => toggleDrawerAddParticipant(false)}></img>
                                <ActivityRegistering></ActivityRegistering>
                            </Drawer>
                        )}
                    </React.Fragment>
                </div>
            </div>
        </>
    )
}
export default FullViewOfActivity;
