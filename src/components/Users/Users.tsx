import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ToolbarNavigation from "../Home/ToolbarNavigation";
import usersPicture from '../../images/usersPicture.svg';
import deleteIcon from '../../images/deleteIcon.png';
import { Box, Divider, Drawer, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import close from '../../images/close.png';
import { UserContext } from '../../App';
import AddUser from "./AddUser";
import './Users.css';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Users = () => {
    const myContext = useContext(UserContext);
    const [state, setState] = useState<{
        left: boolean;
        activePopup: 'addUser' | 'updateUser' | null;
    }>
        ({
            left: false,
            activePopup: null,
        });

    const toggleDrawerAddUser = (open: boolean) => {
        setState({ ...state, left: open, activePopup: 'addUser' });
    };
    const listAddUser = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawerAddUser(true)}
            onKeyDown={() => toggleDrawerAddUser(true)}
        >
            <Divider />
        </Box>
    );
    const toggleDrawerUpdateUser = (open: boolean) => {
        setState({ ...state, left: open, activePopup: 'updateUser' });
    };
    const listUpdateUser = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawerUpdateUser(true)}
            onKeyDown={() => toggleDrawerUpdateUser(true)}
        >
            <Divider />
        </Box>
    );
    return (
        <>
            <div id="body">
                <ToolbarNavigation></ToolbarNavigation>
                <div className="titleWrapper">
                    <img className="icon" src={usersPicture} ></img>
                    <h1 className="title">המשתמשים במערכת</h1>
                    <h2 className="subTitle">עדכון ועריכת פרטי המשתמשים </h2>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">מייל</TableCell>
                                <TableCell align="left">טלפון</TableCell>
                                <TableCell align="left">סיסמא</TableCell>
                                <TableCell align="left">תעודת זהות</TableCell>
                                <TableCell align="left">שם</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myContext.communityAdministrationUsersData?.map((row) => (
                                <TableRow
                                    key={row.userId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.phone}</TableCell>
                                    <TableCell align="left">{row.password}</TableCell>
                                    <TableCell align="left">{row.userId}</TableCell>
                                    <TableCell align="left">{row.firstName} {row.lastName}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div id="popUp">
                <React.Fragment key={"left"}>
                    <button className="addUserBtn" onClick={() => toggleDrawerAddUser(true)}>להוספת משתמש</button>
                    {state.activePopup === 'addUser' && (
                        <Drawer
                            anchor={"left"}
                            open={state["left"]}
                            onClose={() => toggleDrawerAddUser(false)}
                        >
                            {listAddUser("left")}
                            <img src={close} className='closePageLibraryIcon' onClick={() => toggleDrawerAddUser(false)}></img>
                            <AddUser></AddUser>
                        </Drawer>
                    )}
                </React.Fragment>
                <React.Fragment key={"left"}>
                    {state.activePopup === 'updateUser' && (
                        <Drawer
                            anchor={"left"}
                            open={state["left"]}
                            onClose={() => toggleDrawerUpdateUser(false)}
                        >
                            {listUpdateUser("left")}
                            <img src={close} className='closePageLibraryIcon' onClick={() => toggleDrawerUpdateUser(false)}></img>
                            <AddUser></AddUser>
                        </Drawer>
                    )}
                </React.Fragment>
            </div>
        </>
    )
}
export default Users;
