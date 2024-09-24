import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Course from '../../interfaces/Course';
import CourseService from '../../Services/CourseService';
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
import CourseEditing from './CourseEditing';
import GetMessages from './GetMessages';
import close from '../../images/close.png';
import { UserContext } from '../../App';
import { CourseContext } from './Course';
import CourseRegistered from '../../interfaces/CourseRegistered';
import AddCourseRegistered from './AddCourseRegistered';
import { ExportToExcel } from '../ExportToExcel/ExportToExcel';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const FullViewOfCourse = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const myContext = useContext(UserContext);
    const courseContext = useContext(CourseContext);
    const [courseRegistereds, setCourseRegistereds] = useState<CourseRegistered[]>();
    const [value, setValue] = useState(0);
    const [state, setState] = useState<{
        left: boolean;
        activePopup: 'editCourse' | 'addCourseRegistered' | null;
    }>
        ({
            left: false,
            activePopup: null,
        });
    const toggleDrawerEditCourse = (open: boolean) => {
        debugger
        setState({ ...state, left: open, activePopup: 'editCourse' });
    };
    const toggleDrawerAddRegistered = (open: boolean) => {
        debugger
        setState({ ...state, left: open, activePopup: 'addCourseRegistered' });
    };
    const listEditCourse = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawerEditCourse(false)}
            onKeyDown={() => toggleDrawerEditCourse(false)}
        >
            <Divider />
        </Box>
    );
    const listAddRegistered = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawerAddRegistered(false)}
            onKeyDown={() => toggleDrawerAddRegistered(false)}
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

    const getCourseRegistereds = async () => {
        var courseRegistereds = await CourseService.getCourseRegistereds(courseContext.currentCourse?.courseId, myContext.userData?.userId);
        setCourseRegistereds(courseRegistereds);
    }
    useEffect(() => {
        getCourseRegistereds();
    }, [])

    // useEffect(() => {

    // }, [courseContext.currentCourse])

    // useEffect(() => {
    //     debugger
    //     console.log("change");
    //     navigate(`/course/${courseContext.currentTargetAudience}`)

    // }, [courseContext.currentTargetAudience])

    useEffect(() => {
        if (courseContext.currentTargetAudience!="") {
            navigate(`/course/${courseContext.currentTargetAudience}`);
            courseContext.setCurrentTargetAudience(''); // Reset the currentTargetAudience
        }
    }, [courseContext.currentTargetAudience, navigate, courseContext]);

    
    // useEffect(() => {

    // }, [CourseContext])
    
    return (
        <>
            <div className='bodyFullView'>
                <ToolbarNavigation></ToolbarNavigation>
                <ExportToExcel apiData={courseRegistereds} fileName={` הנרשמים לחוג ${courseContext.currentCourse?.courseName}`} />
                <div className='courseDetails'>
                    <h1 className='title'>חוג {courseContext.currentCourse?.courseName}</h1>
                    <img src={profil} className="profilIcon"></img>
                    <span className='operatorDetails'>{courseContext.currentCourse?.operatorName}</span>
                    <img src={countOfRegistereds} className="countOfRegisteredsIcon"></img>
                    <span className='countOfRegistereds' dir='rtl'>{courseContext.currentCourse?.maxParticipants} משתתפים</span>
                    <img src={costIcon} className="costIcon"></img>
                    <span className='costDetails' dir='rtl'>{courseContext.currentCourse?.costForLesson} ש"ח</span>
                    <img src={courseTimeIcon} className="courseTimeIcon"></img>
                    <span className='courseTime' dir='rtl'>יום {courseContext.currentCourse?.day} בין השעות {courseContext.currentCourse?.beginngTime} - {courseContext.currentCourse?.endTime}</span>
                    <img src={editIcon} className="editIcon"></img>
                    <a className='edit' onClick={() => toggleDrawerEditCourse(true)}>עריכה</a>
                    {courseRegistereds && courseContext.currentCourse && courseContext.currentCourse.maxParticipants > courseRegistereds.length ?
                        <a className='addCourseRegistered' onClick={() => toggleDrawerAddRegistered(true)}>הוספת משתתף</a> : null}
                    <TableContainer className='table' component={Paper}>
                        <Table sx={{ minWidth: 100 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left">מייל</TableCell>
                                    <TableCell align="left">טלפון</TableCell>
                                    <TableCell align="left">שם</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courseRegistereds && courseRegistereds.map((r: any) => (
                                    <TableRow
                                        key={r.courseRegisteredId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left" id={r.courseRegisteredId}><button className={!r.paid ? "notPaid" : "paid"}> {!r.paid ? "לא שולם" : "שולם"}</button></TableCell>
                                        <TableCell align="left">{r.email}</TableCell>
                                        <TableCell align="left">{r.phone}</TableCell>
                                        <TableCell align="left">{r.firstName} {r.lastName}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className='courseMessages'>
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
                        {state.activePopup === 'editCourse' && (
                            <Drawer
                                anchor={"left"}
                                open={state.left}
                                onClose={() => toggleDrawerEditCourse(false)}
                            >
                                {listEditCourse("left")}
                                <img src={close} className='closePageIcon' onClick={() => toggleDrawerEditCourse(false)}></img>
                                <CourseEditing></CourseEditing>
                            </Drawer>
                        )}
                    </React.Fragment>
                </div>
                <div id="popUp">
                    <React.Fragment key={"left"}>
                        {state.activePopup === 'addCourseRegistered' && (
                            <Drawer
                                className='addCourseRegisteredPage'
                                anchor={"left"}
                                open={state.left}
                                onClose={() => toggleDrawerAddRegistered(false)}
                            >
                                {listAddRegistered("left")}
                                <img src={close} className='closePageIcon' onClick={() => toggleDrawerAddRegistered(false)}></img>
                                <AddCourseRegistered></AddCourseRegistered>
                            </Drawer>
                        )}
                    </React.Fragment>
                </div>
            </div>
        </>
    )
}
export default FullViewOfCourse;


