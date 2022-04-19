import React, {useEffect, useState} from "react";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import events from './events'
import "react-big-calendar/lib/css/react-big-calendar.css";
import {Button, Menu, MenuItem, TextField} from "@mui/material";

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";

const localizer = momentLocalizer(moment);


//Made axios global
const axios = require("axios"); //use axios for http requests
const instance = axios.create({ baseURL: "http://localhost:8080" }); //use this instance of axios for http requests

const MyCalendar = props => (
    <div>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ margin: '0.5vmin', height: '80vh' }}
        />
    </div>
)

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#DDDDDD',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const cardStyle  = {
    textAlign: 'center',
    height: '38vh'
}
const fontStyle = {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '6vh',
    fontSize: '1.5vmax',
    fontWeight: 'bold',
}
const Home = () => {
    const [open, setOpen] = useState(false);
    const [pageContent, setPageContent] = useState("");
    const [todayDate, setTodayDate] = useState("");

    //Form Values
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteDescription, setNoteDescription] = useState("");

    //Handle dialog
    const handleClickOpen = (page) => {
        console.log("page", page);
        setPageContent(page);
        setOpen(true);

    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleDialogSubmit = (e, addType) => {
        e.preventDefault();
        console.log("dialog submit", addType);
        resetFields();
        setOpen(false);
    };

    const resetFields = () => {
        setEventTitle("");
        setEventDescription("");
        setDateFrom("");
        setDateTo("");
        setNoteTitle("");
        setNoteDescription("");
    };


    //Update date text every second.
    useEffect(() => {
        const interval = setInterval(() => setTodayDate(moment().format("DD MMM YYYY, dddd h:mm:ss A")), 1000);
        return () => {
            clearInterval(interval);
        };

    }, []);



    // Handle Add Button Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        console.log("event current target", event.currentTarget);
        console.log("event ")
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const addUpcoming = () => {
        console.log("upcoming");
        handleClickOpen("upcoming");
        setAnchorEl(null);
    };
    const addNotes = () => {
        console.log("notes");
        handleClickOpen("notes");
        setAnchorEl(null);
    };

    function renderDialogContent() {
        if (pageContent === "upcoming") {

            return (
            <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>Add Upcoming Events</DialogTitle>
            <DialogContent>
                    {/*<DialogContentText>*/}
                    {/*    ADD UPCOMING*/}
                    {/*</DialogContentText>*/}
                <form onSubmit={(e) => handleDialogSubmit(e, "upcoming")} id="myform">
                <TextField
                        margin="dense"
                        id="eventTitle"
                        label="Event Title"
                        fullWidth
                        variant="standard"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        fullWidth
                        variant="standard"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="dateFrom"
                        label="From"
                        fullWidth
                        variant="standard"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="dateTo"
                        label="To"
                        fullWidth
                        variant="standard"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit" form="myform">Submit</Button>
            </DialogActions>
            </Dialog>
            );
        } else {
            return (
                <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Add Notes</DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/}
                    {/*    ADD NOTES*/}
                    {/*</DialogContentText>*/}
                    <form onSubmit={(e) => handleDialogSubmit(e, "note")} id="myform">
                    <TextField
                        margin="dense"
                        id="noteTitle"
                        label="Title"
                        fullWidth
                        variant="standard"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        fullWidth
                        variant="standard"
                        value={noteDescription}
                        onChange={(e) => setNoteDescription(e.target.value)}
                    />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button type="submit" form="myform">Submit</Button>
                </DialogActions>
                </Dialog>
            );
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{xs:1, sm: 1, md:2, }}>
                <Grid item xs={12}>
                        <div style = {fontStyle}> { todayDate } </div>
                <Divider/>
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ border: 1, marginLeft: 1, padding: 2, borderRadius: 2, borderColor: '#DDDDDD' }}>
                    <MyCalendar></MyCalendar>
                    </Box>
                </Grid>
                <Grid item xs={4} >
                    <Box style = {cardStyle } sx={{border: 1, marginBottom: 1, padding: 2, borderRadius: 2, borderColor: '#DDDDDD' }}>
                        <div> xs=4</div >
                    </Box>
                    <Box style = {cardStyle} sx={{border: 1,  padding: 2, borderRadius: 2, borderColor: '#DDDDDD' }}>
                    <div> xs=4</div >
                    </Box>

                </Grid>
                <Grid item xs={12}>
                    <div style = {{textAlign: 'center'}}>
                        <Button
                            variant = "contained"
                            id="basic-button"
                            aria-controls={menuOpen ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={menuOpen ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <text style = {{ fontWeight: 'bold', fontSize: '0.8vmax'}}>Add Items</text>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={menuOpen}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={addUpcoming}>Add Upcoming</MenuItem>
                            <MenuItem onClick={addNotes}>Add Notes</MenuItem>
                        </Menu>
                    </div>
                </Grid>
                <Grid item xs={8}>
                </Grid>

            </Grid>

            {renderDialogContent()}

        </Box>

    )
}
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route path="/addupcoming" element={<AddUpcoming />} />*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
