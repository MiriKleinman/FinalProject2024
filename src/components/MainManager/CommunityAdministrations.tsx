import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from "react-router-dom";
import LoginService from '../../Services/LoginService';
import CommunityAdministrationsService from '../../Services/CommunityAdministrationService'
import User from '../../interfaces/User';
import { render } from '@testing-library/react';
import { Password } from '@mui/icons-material';
import { UserContext } from '../../App';
import ToolbarNavigation from '../Home/ToolbarNavigation';
import './CommunityAdministrations.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import CommunityAdministrationDto from '../../interfaces/CommunityAdministrationDto';
import UpdateCommunityAdministration from './updateCommunityAdministration';
import close from '../../images/close.png';
import CommunityAdministration from '../../interfaces/CommunityAdministration';
import AddCommunityAdministration from './AddCommunityAdministration';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import Home from '../Home/Home';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
export const CommunityAdministrationContext = React.createContext<ContextProps>({
    currentCommunityAdministration: null,
    setCurrentCommunityAdministration: () => null,
});
interface ContextProps {
    readonly currentCommunityAdministration: CommunityAdministrationDto | null;
    readonly setCurrentCommunityAdministration: (currentCommunityAdministration: CommunityAdministrationDto) => void;
}
const CommunityAdministrations = () => {
    const navigate = useNavigate();
    const [communityAdministrations, setCommunityAdministrations] = useState<any[]>([]);
    const [communityAdministrationSelect, setCommunityAdministrationSelect] = useState();
    // const [entrance, setEnterance] = useState(false);
    var a = [{}];
    const myContext = useContext(UserContext);
    var communityAdministration: any;
    const [communityAdministrationDto, setCommunityAdministrationDto] = useState<CommunityAdministrationDto[]>();
    const location = useLocation();
    const [state, setState] = useState<{
        left: boolean;
        activePopup: 'edit' | 'add' | null;
    }>
        ({
            left: false,
            activePopup: null,
        });
    const [currentCommunityAdministration, setCurrentCommunityAdministration] = useState<CommunityAdministrationDto | null>(null);
    const value = {
        currentCommunityAdministration,
        setCurrentCommunityAdministration,
    };
    // const getNamesListOfCommunityAdministration = async () => {
    //     return await CommunityAdministrationsService.GetNamesListOfCommunityAdministration().then((res: any) => {
    //         communityAdministration = res;
    //         a.pop();
    //         communityAdministration.map((c: any) => {
    //             console.log(c.communityAdministrationName, c.communityAdministrationId);
    //             a.push({ label: c.communityAdministrationName, value: c.communityAdministrationId })
    //             var c: any = getCommunityAdministratinById(c.communityAdministrationId);
    //         })
    //         console.log(communityAdministration, "activitiesList getActivities");
    //         return communityAdministration;
    //     })
    // }
    // const getCommunityAdministratinById = async (communityAdministrationId: string) => {
    //     return await CommunityAdministrationsService.getCommunityAdministratinById(communityAdministrationId)
    // }
    const toggleDrawerEdit = (open: boolean) => {
        setState({ ...state, left: open, activePopup: 'edit' });
    };
    const listEdit = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawerEdit(true)}
            onKeyDown={() => toggleDrawerEdit(true)}
        >
            <Divider />
        </Box>
    );
    const toggleDrawerAdd = (open: boolean) => {
        setState({ ...state, left: open, activePopup: 'add' });
    };
    const listAdd = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawerAdd(true)}
            onKeyDown={() => toggleDrawerAdd(true)}
        >
            <Divider />
        </Box>
    );
    const getCommunityAdministrations = async () => {
        return await CommunityAdministrationsService.getCommunityAdministrations(myContext.userData?.userId, myContext.userData?.password);
    }
    const addCommunityAdministration = () => {
        navigate(`/addCommunityAdministration`, { state: location.state });
    }
    const updateCommunityAdministration = async (communityAdministrationId: string) => {
        console.log(communityAdministrationId, "communityAdministrationId");
        var communityAdministration = await CommunityAdministrationsService.getCommunityAdministratinById(communityAdministrationId);
        navigate(`/updateCommunityAdministration`, { state: { communityAdministration: communityAdministration, manager: location.state } });
    }
    const edit = (c: CommunityAdministrationDto) => {
        setCurrentCommunityAdministration(c);
        toggleDrawerEdit(true);
    }
    // const entranceToCommunity = (c: CommunityAdministrationDto) => {
    //     setCurrentCommunityAdministration(c);
    //     setEnterance(true);
    // }
    const fetchData = async () => {
        var data = await getCommunityAdministrations();
        console.log(data);
        setCommunityAdministrations([...data]);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <CommunityAdministrationContext.Provider value={{ currentCommunityAdministration, setCurrentCommunityAdministration }}>
                <><div className="row">
                    {communityAdministrations && communityAdministrations.map((c) => <div className="column" dir='rtl'>
                        <span className='communityAdministrationName'>מינהל קהילתי {c.name}</span><br></br><br></br>
                        <FmdGoodOutlinedIcon htmlColor='#FC2A84' />
                        <span className='communityAdministrationAddress' dir="rtl">{c.address}</span><br></br><br></br>
                        <AttachEmailOutlinedIcon htmlColor='#FC2A84' />
                        <span className='communityAdministrationEmail' dir="rtl">{c.email}</span><br></br><br></br>
                        <PhoneEnabledOutlinedIcon htmlColor='#FC2A84' />
                        <span className='communityAdministrationPhone' dir="rtl">{c.phone}</span><br></br><br></br>
                        <button className="editCommunityBtn" onClick={() => edit(c)}>לעדכון</button>
                        {/* <button className="entranceToCommunity" onClick={() => entranceToCommunity(c)}>לכניסה</button> */}
                    </div>
                    )}
                </div><a className="addCommunityBtn" onClick={() => toggleDrawerAdd(true)}>להוספת מינהל קהילתי</a><React.Fragment key="left">
                        {state.activePopup === 'edit' && (
                            <Drawer
                                anchor="left"
                                open={state.left}
                                onClose={() => toggleDrawerEdit(false)}
                            >
                                {listEdit('left')}
                                <img src={close} className='closePageIcon' onClick={() => toggleDrawerEdit(false)}></img>
                                <UpdateCommunityAdministration />
                            </Drawer>
                        )}
                    </React.Fragment><React.Fragment key="left">
                        {state.activePopup === 'add' && (
                            <Drawer
                                anchor="left"
                                open={state.left}
                                onClose={() => toggleDrawerAdd(false)}
                            >
                                {listAdd('left')}
                                <img src={close} className='closePageIcon' onClick={() => toggleDrawerAdd(false)}></img>
                                <AddCommunityAdministration />
                            </Drawer>
                        )}
                    </React.Fragment></>
            </CommunityAdministrationContext.Provider>
        </>
    )
}
export default CommunityAdministrations;

