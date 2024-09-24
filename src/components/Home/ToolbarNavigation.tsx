import React, { useContext, useEffect, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import { Menubar } from 'primereact/menubar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { IoIosWoman } from 'react-icons/io';
import { MdElderlyWoman, MdWoman2 } from 'react-icons/md'
import { BiChild } from 'react-icons/bi';
import { IoAlarmOutline } from 'react-icons/io5';
import { GiBookshelf, GiTrojanHorse, GiChainedHeart, GiClover } from "react-icons/gi";
import './ToolbarNavigation.css';
import home from '../../images/home.png';
import about from '../../images/about.png';
import activity from '../../images/activity.png';
import users from '../../images/users.png';
import course from '../../images/course.png';
import library from '../../images/library.png';
import personal from '../../images/personal.png';
import playingCenter from '../../images/playingCenter.png';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import CommunityAdministrationService from '../../Services/CommunityAdministrationService';
import CommunityAdministration from '../../interfaces/CommunityAdministration';
import UserService from '../../Services/UserService';
import User from '../../interfaces/User';
import { CommunityAdministrationContext } from '../MainManager/CommunityAdministrations';

const ToolbarNavigation = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const myContext = useContext(UserContext);
    const myCommunityAdministrationContext = useContext(CommunityAdministrationContext);
    const [communityAdministration, setCommunityAdministration] = useState<CommunityAdministration>();

    const getCommunityAdministratinById = async () => {
        var res = await CommunityAdministrationService.getCommunityAdministratinById(myContext.userData?.communityAdministrationId);
        setCommunityAdministration(res);
    }

    useEffect(() => {
        if (myCommunityAdministrationContext.currentCommunityAdministration)
            setCommunityAdministration(myCommunityAdministrationContext.currentCommunityAdministration);
        else
            getCommunityAdministratinById();
    }, [])

    return (
        <>
            <div id='body'>
                <div id="navigation">
                    <img src={logo} className='logo'></img>
                    <h1 className='logoSentence'>בית.קהילה.חויה</h1>
                    <h1 className='logoSubSentence' dir='rtl'>מינהל קהילתי {communityAdministration && communityAdministration.name}</h1>
                    <div id='navi'>
                        <div id='nav' onClick={() => { navigate(`/home`) }}>בית<img src={home}></img></div><br></br>
                        <div id='navSelect'>
                            <select id='select' value="" dir='rtl' onChange={(e) => {
                                navigate(`/course/${e.target.value}`)
                            }}>
                                <option className='option'></option>
                                <option className='option'>נשים</option>
                                <option className='option'>נערות</option>
                                <option className='option'>גיל הזהב</option>
                                <option className='option'>בנים</option>
                                <option className='option'>בנות</option>
                            </select>
                            חוגים<img src={course}></img>
                        </div><br></br>
                        <div id='nav' onClick={() => { navigate(`/library`) }}>ספריה<img src={library}></img></div><br></br>
                        <div id='navSelect'>
                            <select id='select' value="" onChange={(e) => {
                                navigate(`/activity/${e.target.value}`, { state: myContext.userData })
                            }}>
                                <option className='option'></option>
                                <option className='option'>נשים</option>
                                <option className='option'>נערות</option>
                                <option className='option'>גיל הזהב</option>
                                <option className='option'>בנים</option>
                                <option className='option'>בנות</option>
                            </select>פעילויות<img src={activity}></img></div><br></br>
                        <div id='nav' onClick={() => { navigate(`/playingCenter`, { state: myContext.userData }) }}>משחקיה<img src={playingCenter}></img></div><br></br>
                        <div id='nav' onClick={() => { navigate(`/users`) }}>משתמשים<img className="usersIcon" src={users}></img></div><br></br>
                        {/* <div id='nav' onClick={() => { navigate(`/connect`, { state: myContext.userData }) }}>צור קשר<img src={connection}></img></div> */}
                        <div id='nav' onClick={() => { navigate(`/personalArea`, { state: myContext.userData }) }}>עריכת פרופיל<img src={personal}></img></div>
                    </div>
                </div>
            </div>

        </>


    )
}
export default ToolbarNavigation;






