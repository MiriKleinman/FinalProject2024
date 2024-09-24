import { useLocation, useNavigate, useParams } from "react-router-dom";
import LibraryService from '../../Services/LibraryService';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ToolbarNavigation from "../Home/ToolbarNavigation";
import libraryPicture from '../../images/libraryPicture.png';
import deleteIcon from '../../images/deleteIcon.png';
import './Library.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import AddUnitTimeOfLibrary from "./AddUnitTimeOfLibrary";
import EditingUnitTimeOfLibrary from "./EditingUnitTimeOfLibrary";
import { Row } from "rsuite";
import { UserContext } from '../../App';
import close from '../../images/close.png';
import UnitTimeOfLibrary from "../../interfaces/UnitTimeOfLibrary";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export const LibraryContext = React.createContext<ContextProps>({
    libraryData: null,
    currentUnitTime: null,
    setLibraryData: () => null,
    setCurrentUnitTime: () => null
});
interface ContextProps {
    readonly libraryData: UnitTimeOfLibrary[] | null;
    readonly currentUnitTime: UnitTimeOfLibrary | null;
    readonly setLibraryData: (libraryData: UnitTimeOfLibrary[]) => void;
    readonly setCurrentUnitTime: (currentUnitTime: UnitTimeOfLibrary) => void;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';
const Library = () => {
    var library: any;
    var days: string[] = ["ראשון", "שני", "שלישי", "רביעי", "חמישי"];
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const myContext = useContext(UserContext);
    const [dataLibrary, setDataLibrary] = useState<any[]>([]);
    const [unitTimeChange, setUnitTimeChange] = useState<any>();
    const [open, setOpen] = useState(false);
    const [state, setState] = useState<{
        left: boolean;
        activePopup: 'addUnitTime' | 'editUnitTime' | null;
    }>
        ({
            left: false,
            activePopup: null,
        });
    const [libraryData, setLibraryData] = useState<UnitTimeOfLibrary[] | null>(null);
    const value = {
        libraryData,
        setLibraryData,
    };
    const [currentUnitTime, setCurrentUnitTime] = useState<UnitTimeOfLibrary | null>(null);
    const currentUnitTimeValue = {
        currentUnitTime,
        setCurrentUnitTime,
    };
    const toggleDrawerAddUnitTime = (open: boolean) => {
        setState({ ...state, left: open, activePopup: 'addUnitTime' });
    };
    const listAddUnitTime = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawerAddUnitTime(true)}
            onKeyDown={() => toggleDrawerAddUnitTime(true)}
        >
            <Divider />
        </Box>
    );
    const toggleDrawerEditUnitTime = (open: boolean) => {
        setState({ ...state, left: open, activePopup: 'editUnitTime' });
    };
    const listEditUnitTime = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawerEditUnitTime(true)}
            onKeyDown={() => toggleDrawerEditUnitTime(true)}
        >
            <Divider />
        </Box>
    );
    const handleClose = () => {
        setOpen(false);
    };
    const getLibrary = async () => {
        debugger
        return await LibraryService.getLibrary(myContext.userData?.communityAdministrationId).then((res: any) => {
            library = res;
            console.log(library, "library");
            return library;
        })
    }
    const editLibraryTime = async (row: any) => {
        setCurrentUnitTime(row);
        toggleDrawerEditUnitTime(true);
    }
    const checkForDelete = async (row: any) => {
        setCurrentUnitTime(row);
        setOpen(true);
    };

    const deleteLibraryTime = async () => {
        var res = await LibraryService.deleteUnitTimeOfLibrary(currentUnitTime?.unitTimeId, myContext.userData?.userId);
        setUnitTimeChange(res);
        handleClose();
    }
    const addUnitTimeOfLibrary = async () => {
        console.log(location.state);
        console.log(dataLibrary, "dataLibrary");
        navigate('/addUnitTimeOfLibrary', { state: location.state })
    }
    useEffect(() => {
        const fetchData = async () => {
            console.log(myContext.userData, "mycontext.userData");
            var data = await getLibrary();
            console.log(data, "data");
            setDataLibrary([...data]);
        }
        fetchData();
    }, [unitTimeChange]);
    useEffect(() => {

    }, [dataLibrary])

    return (
        <>
            <LibraryContext.Provider value={{ libraryData, setLibraryData, currentUnitTime, setCurrentUnitTime }}>
                <div id="body">
                    <ToolbarNavigation></ToolbarNavigation>
                    <div className="titleWrapper">
                        <img className="icon" src={libraryPicture} ></img>
                        <h1 className="title">שעות פעילות הספריה</h1>
                        <h2 className="subTitle">עדכון ועריכת שעות פעילות הספריה</h2>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left">קהל יעד</TableCell>
                                    <TableCell align="left">שעות פעילות</TableCell>
                                    <TableCell align="left">יום</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {days.map((d) => <TableRow>{d}</TableRow>)} */}
                                {dataLibrary.map((row) => (
                                    <TableRow
                                        key={row.unitTimeId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell id="delete" align="left"><a onClick={() => checkForDelete(row)}><img src={deleteIcon}></img></a></TableCell>
                                        <TableCell id="edit" align="left"><a onClick={() => editLibraryTime(row)} className="editUnitTimeLink">עריכה</a></TableCell>
                                        <TableCell align="left">{row.targetAudience}</TableCell>
                                        <TableCell align="left">{row.beginngTime} - {row.endTime}</TableCell>
                                        <TableCell align="left">{row.day}</TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div id="popUp">
                    <React.Fragment key={"left"}>
                        <button className="addUnitTimeButton" onClick={() => toggleDrawerAddUnitTime(true)}>להוספת זמנים</button>
                        {state.activePopup === 'addUnitTime' && (
                            <Drawer
                                anchor={"left"}
                                open={state["left"]}
                                onClose={() => toggleDrawerAddUnitTime(false)}
                            >
                                {listAddUnitTime("left")}
                                <img src={close} className='closePageLibraryIcon' onClick={() => toggleDrawerAddUnitTime(false)}></img>
                                <AddUnitTimeOfLibrary></AddUnitTimeOfLibrary>
                            </Drawer>
                        )}
                    </React.Fragment>
                    <React.Fragment key={"left"}>
                        {state.activePopup === 'editUnitTime' && (
                            <Drawer
                                anchor={"left"}
                                open={state["left"]}
                                onClose={() => toggleDrawerEditUnitTime(false)}
                            >
                                {listEditUnitTime("left")}
                                <img src={close} className='closePageLibraryIcon' onClick={() => toggleDrawerEditUnitTime(false)}></img>
                                <EditingUnitTimeOfLibrary></EditingUnitTimeOfLibrary>
                            </Drawer>
                        )}
                    </React.Fragment>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" dir="rtl">
                        {"האם אתה בטוח שברצונך למחוק את זמני הפעילות?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" dir="rtl">
                            אם תאשר את המחיקה, שעות הפעילות ימחקו לנצח ולא תהיה אפשרות לשחזר אותן.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions dir="rtl">
                        <Button onClick={handleClose} autoFocus >אל תמחק</Button>
                        <Button onClick={() => deleteLibraryTime()} >
                            בסדר, מוכן
                        </Button>
                    </DialogActions>
                </Dialog>
            </LibraryContext.Provider>
        </>
    )
}
export default Library;
