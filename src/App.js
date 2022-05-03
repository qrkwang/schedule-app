import React, {useEffect, useState} from "react";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import events from './events'
import "react-big-calendar/lib/css/react-big-calendar.css";
import {Button, Checkbox, List, ListItem, ListItemText, Menu, MenuItem, TextField, Typography} from "@mui/material";
// import DatePicker from 'react-date-picker'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

const fontSubHeaderStyle = {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '6vh',
    fontSize: '1.2vmax',
    fontWeight: 'bold',
}
const Home = () => {
    const [open, setOpen] = useState(false);
    const [pageContent, setPageContent] = useState("");
    const [todayDate, setTodayDate] = useState("");
    const [triggerEventUpdate, setTriggerEventUpdate] = useState("");
    const [triggerNoteUpdate, setTriggerNoteUpdate] = useState("");

    //Form Values
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [noteTitle, setNoteTitle] = useState("");
    const [noteDescription, setNoteDescription] = useState("");

    //Upcoming Events & Upcoming Notes Values
    const [eventList, setEventList] = useState([]);
    const [currentClickedItem, setCurrentClickedItem] = useState("");
    const [checked, setChecked] = useState([]);

    // Handle Add Button Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);


    //Handle dialog
    const handleClickOpen = (page, eventItem) => {
        console.log("handlie click open " + page);

        if(typeof eventItem !== "undefined") {
        console.log("handlie click open " + eventItem);
        setCurrentClickedItem(eventItem);
        }
        setPageContent(page);
        setOpen(true);

    };

    const handleDialogClose = () => {
        setOpen(false);
        resetFields();
    };

    const handleDialogSubmit = (e, addType) => {
        e.preventDefault();
        console.log("dialog submit", addType);

        if (addType === "upcoming") {
        const event = {
            eventTitle: eventTitle,
            eventDescription: eventDescription,
            dateTo: dateTo,
            dateFrom: dateFrom,
        };

        axios.post(`http://localhost:3000/events`, event)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });

        } else if (addType === "note") {
            const note = {
                noteTitle: noteTitle,
                noteDescription: noteDescription,
            };

            axios.post(`http://localhost:3000/notes`, note)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                });
        }

        //After post, then reset state to empty.
        resetFields();
        setOpen(false);


    };

    const deleteItem = (eventItem) => {
        console.log("deleting item ", eventItem);
        axios.delete(`http://localhost:3000/events/` + eventItem.id)
            .then(res => {
                console.log(res);
            })
        handleDialogClose();
    }

    const resetFields = () => {
        setEventTitle("");
        setEventDescription("");
        setDateFrom(new Date());
        setDateTo(new Date());
        setNoteTitle("");
        setNoteDescription("");
    };


    //Update date text every second.
    useEffect(() => {
        //Will do it once to set initial loading
        setTodayDate(moment().format("DD MMM YYYY, dddd h:mm A"));

        //Intervally update time per 30 seconds.
        const interval = setInterval(() => setTodayDate(moment().format("DD MMM YYYY, dddd h:mm A")), 30000);
        return () => {
            clearInterval(interval);
        };

    }, []);

    //Call APIs for events and notes
    useEffect(()=> {
        getEvents();
        setTriggerEventUpdate(false);

    }, [open, triggerEventUpdate]);

    const getEvents = () => {
        console.log("getevents");
        return axios.get(`http://localhost:3000/events`)

            .then((res) => {
                console.log(res.data)
                const arrayEvents = [];
                const checkedArray = [];
                res.data.forEach(function (eventItem, index) {
                    // console.log("event item", eventItem);
                    // console.log("is done", eventItem.isDone);
                    // console.log("index", index);
                    arrayEvents.push(eventItem);
                    if (eventItem.isDone === true) {
                        // console.log("is done is false");
                        checkedArray.push(index);
                    }
                })
                setChecked(checkedArray);
                setEventList(arrayEvents);
            }
            )
            .catch((err) => console.error(err));
    }



    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const addUpcoming = () => {
        handleClickOpen("upcoming");
        setAnchorEl(null);
    };
    const addNotes = () => {
        handleClickOpen("notes");
        setAnchorEl(null);
    };

    const itemClicked = (eventItem) => {
        console.log("item clicked", eventItem);
        handleClickOpen("eventItem", eventItem);
    };

    //Handle toggle checkbox
    const handleToggle = (value: number, eventItem) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        // console.log("current index toggle", value);
        console.log("current item being checked", eventItem.eventTitle);

        const event = {
            eventTitle: eventItem.eventTitle,
            eventDescription: eventItem.eventDescription,
            dateTo: eventItem.dateTo,
            dateFrom: eventItem.dateFrom,
            isDone: !eventItem.isDone,
        };

        console.log("updating isDone from %s to %s", eventItem.isDone, !eventItem.isDone);
        //Axios post update to item isDone
        axios.put(`http://localhost:3000/events/` + eventItem.id, event)
            .then(res => {
                console.log("")
                console.log(res);
            })

        //Set boolean true to triggerRender to load eventList again (to populate accurate checkbox values)
        setTriggerEventUpdate(true);

        //
        // if (currentIndex === -1) {
        //     newChecked.push(value);
        // } else {
        //     newChecked.splice(currentIndex, 1);
        // }
        //
        // setChecked(newChecked);
    };

    function renderEventBoxContent() {

        if (eventList.length>0){
            return (
                <div>
                    <Grid item xs={12}>
                        <div style = {fontSubHeaderStyle}> Upcoming Events </div>
                        <Divider/>
                    </Grid>
                    <List style={{maxHeight: '75%', overflow: 'auto'}}
                    >
                    { eventList.map((eventItem, index) =>{
                    console.log("mapping eventlist with item %s", eventItem.eventTitle);
                    // console.log("mapping eventItem on list", eventItem);
                    // console.log("checked index of ", checked.indexOf(index));
                    // console.log("true or false ", checked.indexOf(index) !== -1);
                    return (
                            <ListItem
                                divider = {true}
                                key = {index}
                                secondaryAction={
                                    <Checkbox
                                        style={{
                                            transform: "scale(1.2)",
                                        }}
                                        edge="start"
                                        onChange={handleToggle(index, eventItem)}
                                        checked={checked.indexOf(index) !== -1}
                                    />
                                }
                            >

                                <ListItemText
                                    disableTypography
                                    onClick={() => itemClicked(eventItem)}
                                    primary= {<Typography style={{                 overflow: 'hidden',
                                        fontSize: '0.8vmax', color: '#000000', marginRight: '1vmax'}}> {eventItem.eventTitle }</Typography>}
                                    // secondary={secondary ? 'Secondary text' : null}
                                />
                            </ListItem>
                    )
                }) }
                    </List>
                </div>
            )
        } else {
            return (
            <div>
                <Grid item xs={12}>
                    <div style = {fontSubHeaderStyle}> Upcoming Events </div>
                    <Divider/>
                </Grid>
            </div>
            )
        }
    }

    function renderDialogContent() {
        if (pageContent === "upcoming") {

            return (
            <Dialog style = {{
                }}
                fullWidth={true}
                maxWidth={'lg'}
                open={open}
                onClose={handleDialogClose}>
            <DialogTitle>Add Upcoming Events</DialogTitle>
            <DialogContent>
                    {/*<DialogContentText>*/}
                    {/*    ADD UPCOMING*/}
                    {/*</DialogContentText>*/}
                <form onSubmit={(e) => handleDialogSubmit(e, "upcoming")} id="myform">
                    <Stack spacing={3}>

                    <TextField
                        margin="none"
                        id="eventTitle"
                        label="Event Title"
                        fullWidth
                        variant="standard"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        size="normal"
                        InputProps={{ style: { fontSize: '1vmax' } }}
                        InputLabelProps={{ style: { fontSize: '1vmax' } }}
                    />
                    <TextField
                        margin="none"
                        id="description"
                        label="Description"
                        fullWidth
                        variant="standard"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        size="normal"
                        InputProps={{ style: { fontSize: '1vmax' } }}
                        InputLabelProps={{ style: { fontSize: '1vmax' } }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date To"
                            value={dateTo}
                            onChange={(newValue) => {
                                setDateTo(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            InputProps={{ style: { fontSize: '1vmax' } }}
                            // InputLabelProps={{ style: { fontSize: '1vmax' } }}
                        />

                            <DatePicker
                                label="Date From"
                                value={dateFrom}
                                onChange={(newValue) => {
                                    setDateFrom(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                InputProps={{ style: { fontSize: '1vmax' } }}
                                // InputLabelProps={{ style: { fontSize: '1vmax' } }}
                            />
                    </LocalizationProvider>
                    </Stack>
                    {/*<DatePicker name= "dateTo" onChange={setDateTo} value={dateTo} />*/}
                    {/*<DatePicker name="dateFrom" onChange={setDateFrom} value={dateFrom} />*/}

                    {/*<TextField*/}
                    {/*    margin="dense"*/}
                    {/*    id="dateFrom"*/}
                    {/*    label="From"*/}
                    {/*    fullWidth*/}
                    {/*    variant="standard"*/}
                    {/*    value={dateFrom}*/}
                    {/*    onChange={(e) => setDateFrom(e.target.value)}*/}
                    {/*/>*/}
                    {/*<TextField*/}
                    {/*    margin="dense"*/}
                    {/*    id="dateTo"*/}
                    {/*    label="To"*/}
                    {/*    fullWidth*/}
                    {/*    variant="standard"*/}
                    {/*    value={dateTo}*/}
                    {/*    onChange={(e) => setDateTo(e.target.value)}*/}                    {/*/>*/}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit" form="myform">Submit</Button>
            </DialogActions>
            </Dialog>
            );
        } else if (pageContent === "notes"){
            return (
                <Dialog
                    fullWidth={true}
                    maxWidth={'lg'}
                    open={open}
                    onClose={handleDialogClose}>
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
                        InputProps={{ style: { fontSize: '1vmax' } }}
                        InputLabelProps={{ style: { fontSize: '1vmax' } }}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        fullWidth
                        variant="standard"
                        value={noteDescription}
                        onChange={(e) => setNoteDescription(e.target.value)}
                        InputProps={{ style: { fontSize: '1vmax' } }}
                        InputLabelProps={{ style: { fontSize: '1vmax' } }}
                    />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button type="submit" form="myform">Submit</Button>
                </DialogActions>
                </Dialog>
            );
        } else if (pageContent === "eventItem") {
            return (
                <Dialog style = {{
                }}
                    fullWidth={true}
                    maxWidth={'lg'}
                    open={open}
                    onClose={handleDialogClose}>
                    <DialogTitle>Event Item Detail</DialogTitle>
                    <DialogContent>
                        <div> {currentClickedItem.eventTitle} </div>

                        <div> {currentClickedItem.eventDescription} </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => deleteItem(currentClickedItem)}>Delete</Button>
                        <Button onClick={handleDialogClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            )
        } else {
            console.log("no content");
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
                    <Box style = {cardStyle } sx={{border: 1, marginBottom: 1, padding: 0, borderRadius: 2, borderColor: '#DDDDDD' }}>

                        {renderEventBoxContent()}
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
