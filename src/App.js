import React, {useCallback, useEffect, useState} from "react";
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
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Collapse from '@mui/material/Collapse';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import events from './events'
import "react-big-calendar/lib/css/react-big-calendar.css";

import { enGB } from 'date-fns/locale'
// import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
// import 'react-nice-dates/build/style.css'

import {
    Button,
    Checkbox, Container, createTheme,
    CssBaseline, FormControlLabel, FormGroup, IconButton, InputAdornment,
    List,
    ListItem,
    ListItemText, Menu,
    MenuItem, Modal,
    TextField,
    Typography
} from "@mui/material";

// import DatePicker from 'react-date-picker'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateRangePicker } from "mui-daterange-picker";

import {
    BrowserRouter,
    Routes,
    Route,
    Link, useNavigate, Navigate
} from "react-router-dom";
import {grey, lightBlue, orange, purple} from "@mui/material/colors";
import {ThemeProvider, makeStyles} from "@mui/styles";

const localizer = momentLocalizer(moment);


//Made axios global
const axios = require("axios"); //use axios for http requests
const instance = axios.create({ baseURL: "http://localhost:8080" }); //use this instance of axios for http requests
const backendURL = `http://192.168.68.100:3000`
// const backendURL = `http://192.168.127.148:3000`



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

const Login = () => {
    let navigate = useNavigate();

    //Form
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //Modal Dialog
    const [open, setOpen] = useState(false);
    const [pageContent, setPageContent] = useState("");

    function areFieldsEmpty() {
        if (userName === "" && password === "") {
            return true;
        }
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!areFieldsEmpty()) {

            console.log("username and password %s %s", userName, password);
            const user = {
                username: userName,
                password: password,
            };

            //Do login request here
            instance.post(backendURL + `/login`, user)
                .then(res => {
                    // console.log(res);
                    // console.log(res.data);
                    console.log("response code is " , res.status);

                    if (res.status === 201) {
                        //Login successfully
                        {
                            console.log("user id is ", res.data);

                            localStorage.setItem("userid", res.data); // The returned data obj contains userId
                            navigate(`/`);
                        }
                    }
                }).catch(error => {
                console.log("error while sending request", error);

                // console.log("error while sending request", error.response.status);

                if (error.response.status === 301) {
                    setPageContent("301")
                    setOpen(true);
                } else if (error.response.status === 302) {
                    setPageContent("302")
                    setOpen(true);
                } else {
                    setPageContent("admin")
                    setOpen(true);
                }

            });

        } else {
            setPageContent("empty");
            setOpen(true);
        }
    }

    function renderDialogContent() {

        return (

            <Dialog style={{}}
                    fullWidth={true}
                    maxWidth={'lg'}
                    open={open}
                    onClose={ ()=> setOpen(false)}
            >
                <div style={{backgroundColor: '#DFE2D7',}}>
                    <DialogTitle sx={{marginBottom: -1,}}>
                        {pageContent === "301" ? (
                                <div style={{color: 'gray'}}>Account does not exist</div>
                            )
                            : pageContent === "302" ? (
                                    <div style={{color: 'gray'}}>Invalid credentials</div>
                                )
                                : pageContent === "empty" ? (
                                    <div style={{color: 'gray'}}>Empty fields</div>
                                ) : (
                                    <div style={{color: 'gray'}}>Something went wrong</div>
                                )
                        }
                    </DialogTitle>
                </div>
                <DialogContent>
                    {pageContent === "301" ? (

                        <div>
                            <p>An account with this username does not exist. Please sign up or contact the administrator if you wish to get support.</p>
                        </div>
                    )
                        : pageContent === "302" ? (
                            <div>
                                <p>You have entered an invalid username or password. Please try again.</p>
                            </div>
                        )
                        : pageContent === "empty" ? (
                            <div>
                                <p>Please fill in all fields before logging in.</p>
                            </div>
                        ) : (
                            <div>
                                <p>Please contact the administrator.</p>
                            </div>
                        )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={ () => setOpen(false)}>Okay</Button>
                </DialogActions>
            </Dialog>
        );

    }
        return (
        <div>
    <Container component="main" maxWidth="xs" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <div
            // className={useStyles.paper}
        >
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <form
                // className={useStyles.form}
                noValidate
                onSubmit={(e) => handleSubmit(e)}
            >

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
                        size="normal"
                        InputProps={{ style: { fontSize: '1vmax' } }}
                        InputLabelProps={{ style: { fontSize: '1vmax' } }}
                    />

                     <TextField
                         variant="outlined"
                         margin="normal"
                         type={"password"}
                         required
                         fullWidth
                         id="password"
                         label="Password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                         size="normal"
                         InputProps={{ style: { fontSize: '1vmax' } }}
                         InputLabelProps={{ style: { fontSize: '1vmax' } }}
                    />
                <Button


                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
                <Grid container style={{ paddingTop: "10px" } }>
                    <Grid item>
                        <Link to="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>

            </form>
            {renderDialogContent()}

        </div>
    </Container>
        </div>
        // <Box sx={{ flexGrow: 1 }}>
        //     <form>
        //     <TextField
        //         margin="none"
        //         id="username"
        //         label="Username"
        //         fullWidth
        //         variant="standard"
        //         // value={eventTitle}
        //         // onChange={(e) => setEventTitle(e.target.value)}
        //         size="normal"
        //         InputProps={{ style: { fontSize: '1vmax' } }}
        //         InputLabelProps={{ style: { fontSize: '1vmax' } }}
        //     />
        //
        //         <TextField
        //             margin="none"
        //             id="password"
        //             label="Password"
        //             fullWidth
        //             variant="standard"
        //             // value={eventTitle}
        //             // onChange={(e) => setEventTitle(e.target.value)}
        //             size="normal"
        //             InputProps={{ style: { fontSize: '1vmax' } }}
        //             InputLabelProps={{ style: { fontSize: '1vmax' } }}
        //         />
        //
        //         <Button style = {{ marginTop:"20px"}}variant="contained">Login</Button>
        //     </form>
        // </Box>
        )

}

const Register = () => {

    //Form
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //Modal Dialog
    const [open, setOpen] = useState(false);
    const [pageContent, setPageContent] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!areFieldsEmpty()) {
            const user = {
                username: userName,
                password: password,
            };

            //Do register request here
            instance.post(backendURL + `/users`, user)
                .then(res => {
                    // console.log(res);
                    // console.log(res.data);
                    console.log("response code is " , res.status);
                    if (res.status === 201) {
                        setPageContent("201");
                        setOpen(true);
                    }
                }).catch(error => {
                console.log("error while sending request", error.response.status);

                if (error.response.status === 301) {
                    setPageContent("301")
                    setOpen(true);
                } else {
                    setPageContent("admin");
                    setOpen(true);
                }

            });

        } else {
            setPageContent("empty");
            setOpen(true);
        }


    }

    function areFieldsEmpty() {
        if (userName === "" && password === "") {
            return true;
        }
        return false;
    }

    function renderDialogContent() {

            return (

                <Dialog style={{}}
                        fullWidth={true}
                        maxWidth={'lg'}
                        open={open}
                        onClose={ ()=> setOpen(false)}
                    >
                    <div style={{backgroundColor: '#DFE2D7',}}>
                        <DialogTitle sx={{marginBottom: -1,}}>
                            {pageContent === "301" ? (
                                    <div style={{color: 'gray'}}>Account already exists</div>
                                )
                                : pageContent === "201" ? (
                                <div style={{color: 'gray'}}>Account created</div>
                                 )
                                : pageContent === "empty" ? (
                                    <div style={{color: 'gray'}}>Empty fields</div>
                                ) : (
                                    <div style={{color: 'gray'}}>Something went wrong</div>
                                )
                            }
                        </DialogTitle>
                    </div>
                    <DialogContent>
                        {pageContent === "301" ? (
                            <div>
                                <p>An account with this username already exists. Please login using this username or contact the administrator if you wish to get support.</p>
                            </div>
                        ) : pageContent === "201" ? (
                            <div>
                                <p>Account has been successfully created.</p>
                            </div>
                        )
                        : pageContent === "empty" ? (
                            <div>
                                <p>Please fill in all fields before signing up.</p>
                            </div>
                        ) : (
                            <div>
                                <p>Please contact the administrator.</p>
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => setOpen(false)}>Okay</Button>
                    </DialogActions>
                </Dialog>
            );

    }

        return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div
                    // className={useStyles.paper}
                >
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <form
                        // className={useStyles.form}
                        noValidate
                        onSubmit={(e) => handleSubmit(e)}
                    >

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))} //Regex to not include whitespaces or spaces
                            size="normal"
                            InputProps={{ style: { fontSize: '1vmax' } }}
                            InputLabelProps={{ style: { fontSize: '1vmax' } }}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))} //Regex to not include whitespaces or spaces
                            size="normal"
                            InputProps={{ style: { fontSize: '1vmax' } }}
                            InputLabelProps={{ style: { fontSize: '1vmax' } }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // className={useStyles.submit}
                        >
                            Register
                        </Button>
                        <Grid container style={{ paddingTop: "10px" }}>
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    {"Have an account? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Modal center
                        // open={open}
                        // onClose={onCloseModal}
                    >
                        {/*{modalType === "invalid" ? (*/}
                        {/*    <div>*/}
                        {/*        <h2> Invalid Login Details </h2>*/}
                        {/*        <p>Invalid username or password.</p>*/}
                        {/*    </div>*/}
                        {/*) : modalType === "empty" ? (*/}
                        {/*    <div>*/}
                        {/*        <h2> Empty fields</h2>*/}
                        {/*        <p>Please fill in all fields before logging in.</p>*/}
                        {/*    </div>*/}
                        {/*) : (*/}
                        {/*    <div>*/}
                        {/*        <h2> Error fetching</h2>*/}
                        {/*        <p>Please contact the administrator.</p>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </Modal>
                    {renderDialogContent()}

                </div>


            </Container>
        </div>
    )

}

const Home = () => {

    let navigate = useNavigate();

    interface DateRange {
        startDate?: Date,
        endDate?: Date
    }

    const [open, setOpen] = useState(false);
    const [pageContent, setPageContent] = useState("");
    const [todayDate, setTodayDate] = useState("");
    const [triggerEventUpdate, setTriggerEventUpdate] = useState("");
    const [triggerNoteUpdate, setTriggerNoteUpdate] = useState("");

    //Form Values
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteDescription, setNoteDescription] = useState("");
    // const [isTodayChecked, setTodayChecked] = useState(false);
    const [weeklyChecked, setWeeklyChecked] = useState(false);
    const [monthlyChecked, setMonthlyChecked] = useState(false);
    const [yearlyChecked, setYearlyChecked] = useState(false);
    const [weeklyDisabled, setWeeklyDisabled] = useState(false);
    const [monthlyDisabled, setMonthlyDisabled] = useState(false);
    const [yearlyDisabled, setYearlyDisabled] = useState(false);
    //Upcoming Events & Upcoming Notes Values
    const [eventList, setEventList] = useState([]);
    const [currentClickedItem, setCurrentClickedItem] = useState("");
    const [checked, setChecked] = useState([]);
    // const [noteChecked, setNoteChecked] = useState([]);
    //Form Date Pickers
    const [dateRange, setDateRange] = React.useState({});
    const [datePickerOpen, setDatePickerOpen] = React.useState(false);
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());

    const toggle = () => setDatePickerOpen(!setDatePickerOpen());


    const [noteList, setNoteList] = useState([]);

    // Handle Add Button Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    //Calendar Values
    const [events, setCalendarEvents] = useState([])

    //Retrieve logged in user from localStorage and store into global var
    const userId = localStorage.getItem("userid");

    //For the disabled button to get custom colors
    // const useStyles = makeStyles(theme => ({
    //     root: {
    //         "& > *": {
    //             margin: theme.spacing(1)
    //         },
    //         // using classname
    //         "& .Mui-disabled": {
    //             background: "#ffb303"
    //         }
    //     }
    // }));

    // const classes = useStyles();
    // const theme = createTheme();
    const MyCalendar = props => (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ margin: '0.5vmin', height: '80vh' }}
                onSelectEvent={handleSelectEvent}

            />
        </div>
    )

    //Handle calendar event click
    const handleSelectEvent = useCallback(
        (event) => {
            console.log("eventlist array length print out ", eventList);
            console.log("event on click");
            const eventId = event.id;
            console.log("event id from calendar is %s", event.id);

            //Search for the clicked event in calendar event list.
            const eventItem = events.filter(eventObj => eventObj.id === eventId).at(0);

            handleClickOpen("eventItem", eventItem);


        },
        [eventList]
    )

    //Handle dialog
    const handleClickOpen = (page, eventItem) => {
        // console.log("eventitem received is", eventItem);
        // console.log("handle click open " + page);
        // console.log("handle click open eventitem is  " + JSON.stringify(eventItem));

        if(typeof eventItem !== "undefined") {
            // console.log("handle click open " + eventItem.title);
            // eventItem.dateFrom = moment(eventItem.dateFrom).format('DD MMM YYYY h:mm:ss a');
            // eventItem.dateTo = moment(eventItem.dateTo).format('DD MMM YYYY h:mm:ss a');

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
            //determine recurrence, only 1 is possible.
            let recurrence = "";
            if (weeklyChecked){
                console.log("weekly is checked");
                recurrence = "weekly";
            } else if (monthlyChecked) {
                console.log("monthly is checked");
                recurrence = "monthly";
            } else if (yearlyChecked) {
                console.log("yearly is checked");
                recurrence = "yearly";
            }

            const event = {
                eventTitle: eventTitle,
                eventDescription: eventDescription,
                dateFrom: dateFrom,
                dateTo: dateTo,
                userId: userId,
                recurrence: recurrence,
            };

            // console.log("event post", event);
            instance.post(backendURL + `/events/user/create`, event)
                .then(res => {
                    //Set boolean true to triggerRender to load eventList again (to populate accurate checkbox values)
                    setTriggerEventUpdate(true);
                    console.log("after create response is ", res);
                    console.log(res.data);
                })
                .catch(error => {
                  console.log(error.response.data.error);
                })

        } else if (addType === "note") {
            const note = {
                noteTitle: noteTitle,
                noteDescription: noteDescription,
                userId: userId,
            };

            instance.post(backendURL + `/notes/user/create`, note)
                .then(res => {
                    //Set boolean true to triggerRender to load eventList again (to populate accurate checkbox values)
                    setTriggerEventUpdate(true);
                    console.log(res);
                    console.log(res.data);
                });
        }
        //After post, then reset state to empty.
        resetFields();
        setOpen(false);

    };

    const deleteItem = (item, type) => {
        // console.log("deleting item ", item);
        // console.log("type is ", type);

        if (type === 1) {
            // console.log("deleting event");
        instance.delete(backendURL + `/events/` + item.id)
            .then(res => {
                console.log(res);
                //Set boolean true to triggerRender to load eventList again (to populate accurate checkbox values)
                setTriggerEventUpdate(true);
            })

        } else if (type === 2) {
            // console.log("deleting notes");
            instance.delete(backendURL + `/notes/` + item.id)
                .then(res => {
                    console.log(res);
                    //Set boolean true to triggerRender to load eventList again (to populate accurate checkbox values)
                    setTriggerEventUpdate(true);
                })
        }
        handleDialogClose();
    }
    const deleteAllRecurrences = (item) => {
        console.log("deleting all recurrences");
        // console.log("item", item);
        console.log("item mainid", item.mainId);
        if (!item.recurrence) {
            console.log("event is not recurring, cannot delete");
        } else {
            if (item.mainId === 0) {

            }
            console.log("event is recurring");
        // console.log("deleting item ", item);
        // console.log("type is ", type);

            // console.log("deleting event");
            instance.delete(backendURL + `/events/recurrence/` + item.mainId)
                .then(res => {
                    console.log(res);
                    //Set boolean true to triggerRender to load eventList again (to populate accurate checkbox values)
                    setTriggerEventUpdate(true);
                })
        }
        handleDialogClose();
    }

    const resetFields = () => {
        setEventTitle("");
        setEventDescription("");
        setDateFrom(new Date());
        setDateTo(new Date());
        setDatePickerOpen(false)
        setNoteTitle("");
        setNoteDescription("");
        setWeeklyDisabled(false);
        setMonthlyDisabled(false);
        setYearlyDisabled(false);
        setWeeklyChecked(false);
        setMonthlyChecked(false);
        setYearlyChecked(false);
    };


    const areDatesOnSameDay = (date1, date2) => {

        // console.log("date1 year %s, date2 year %s", date1.getFullYear(), date2.getFullYear());
        // console.log("date1 month %s, date2 month %s", date1.getMonth(), date2.getMonth());
        // console.log("date1 date %s, date2 date %s", date1.getDate(), date2.getDate());

        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }

    const areDatesWithin30Days = (date1, date2) => {
        // console.log("date 1 ", date1)
        // console.log("date 2", date2)
        // console.log("date2 - date1", (date2-date1)/(1000*60*60*24));
        // console.log("are within 30 days", (date2-date1)/(1000*60*60*24) <= 30 && (date2-date1)/(1000*60*60*24) >= 0)

        return (date2-date1)/(1000*60*60*24) <= 30 && (date2-date1)/(1000*60*60*24) >= 0
    }

    const involvesToday = (todayDate, date2, date3) => {
        // console.log("today date", todayDate);
        // console.log("dateFrom", date2);
        // console.log("dateTo", date3);
        // console.log("today more than dateFrom", todayDate>=date2)
        // console.log("today less than dateTo", todayDate<=date3)

        return todayDate>=date2 && todayDate<=date3
    }

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

    // //Retrieve the current logged in user
    // useEffect(() => {
    //     // const loggedInUser = localStorage.getItem("username");
    //     // if (loggedInUser) {
    //     //     console.log("retrieved logged in user ", loggedInUser);
    //     //     setLoggedInUser(loggedInUser);
    //     // } else {
    //     //     console.log("did not retrieve user");
    //     // }
    //
    // }, []);

    //Call APIs for events and notes
    useEffect(()=> {
        console.log("open or triggerEventUpdate is toggled");
        getEventsAndNotes();

        setTriggerEventUpdate(false);

    }, [open,triggerEventUpdate]);

    useEffect(() => {
        // console.log("event list updated", eventList) // do something after state has updated
    }, [eventList])
    // useEffect(() => {
    //     console.log("checked list updated", checked) // do something after state has updated
    // }, [checked])
    //
    // useEffect(() => {
    //     console.log("current clicked item updated", currentClickedItem) // do something after state has updated
    // }, [currentClickedItem])


    const getEventsAndNotes = () => {
        const loggedInUser = userId;
        // console.log("getevents");
        // console.log("logged in user is ", loggedInUser);

        const user = {
            userId: loggedInUser,
        }
        instance.post(backendURL + `/events/user/`, user)

            .then((res) => {
                    // console.log(res.data)
                    const arrayEvents = [];
                    const checkedArray = [];
                    const calendarEventsArr = [];

                    const todayDateAsDateType= new Date();
                    let index = 0;
                res.data.forEach(eventItem => {
                        // console.log("event item %s", eventItem.eventTitle);
                        // console.log("dateFrom %s", eventItem.dateFrom);

                    // console.log("is done", eventItem.isDone);
                        // console.log("index", index);
                        // var itemEventObj = {
                        //     id: eventItem.id,
                        //     eventTitle: eventItem.eventTitle,
                        //     title: eventItem.eventTitle,
                        //     eventDescription: eventItem.eventDescription,
                        //     start: moment(eventItem.dateFrom).toDate(),
                        //     end: moment(eventItem.dateTo).toDate(),
                        //     dateFrom: moment(eventItem.dateFrom).format('DD MMM YYYY h:mm:ss a'),
                        //     dateTo: moment(eventItem.dateTo).format('DD MMM YYYY h:mm:ss a')
                        //
                        // }
                        // if (eventItem.)

                        //Combine eventItem with calendar attributes to be able to fit calendar's usage
                        //Dates are also formatted for better display.
                        eventItem.start = moment(eventItem.dateFrom).toDate()
                        eventItem.end = moment(eventItem.dateTo).toDate()
                        eventItem.dateFrom = moment(eventItem.dateFrom).format('DD MMM YYYY h:mm a')
                        eventItem.dateTo = moment(eventItem.dateTo).format('DD MMM YYYY h:mm a')
                        eventItem.title = eventItem.eventTitle;

                        // console.log("print recurrence id ", eventItem.recurrenceId);

                        // console.log("after change eventtitle", eventItem.eventTitle);
                        calendarEventsArr.push(eventItem);

                        const formattedDateFrom = Date.parse(eventItem.dateFrom);
                        const formattedDateTo = Date.parse(eventItem.dateTo);

                        //If event is before today and ends before today, do not display. Display everything else. <<
                        //Additional check for if event startdate or end date is within today.
                        // if ( todayDateAsDateType.getTime() >= formattedDateFrom && todayDateAsDateType.getTime() >= formattedDateTo && !areDatesOnSameDay(todayDateAsDateType, new Date(formattedDateFrom))
                        //     && !areDatesOnSameDay(todayDateAsDateType, new Date(formattedDateTo))) {
                        //     console.log("this event has passed");
                        //
                        //     // if ( todayDateAsDateType.getTime() >= Date.parse(eventItem.dateFrom) && todayDateAsDateType.getTime() >= Date.parse(eventItem.dateTo) && !areDatesOnSameDay(todayDateAsDateType, new Date(Date.parse(eventItem.dateFrom)))
                        //     //     && !areDatesOnSameDay(todayDateAsDateType, new Date(Date.parse(eventItem.dateTo)))) {
                        //
                        //     // console.log("Event starts and ends before today & is not within today, not displaying this.", eventItem.eventTitle);
                        //     // console.log("datefrom",  Date.parse(eventItem.dateFrom));
                        //     // console.log("dateto", Date.parse(eventItem.dateTo));
                        //     // console.log("Today Date bigger than datefrom", todayDateAsDateType.getTime() > Date.parse(eventItem.dateFrom));
                        //     // console.log("Today Date bigger than dateTo", todayDateAsDateType.getTime() > Date.parse(eventItem.dateTo));
                        //
                        // } else if (!areDatesWithin30Days(todayDateAsDateType.getTime(), formattedDateFrom)) {
                        //     //Don't display events that are not in the same month and year
                        //     console.log("this event is not within 30 days");
                        // }
                        //Display event if:
                        // dates are within 30 days of today (counting downwards)
                        // OR starting today
                        // OR ending today
                        // OR goes through today
                        // if (todayDateAsDateType.getTime() <= formattedDateFrom && todayDateAsDateType.getTime() <= formattedDateTo && areDatesOnSameDay(todayDateAsDateType, new Date(formattedDateFrom)) && )
                        let eventDatesOnSameDay = false;
                        let eventInvolvesToday = false;

                        eventItem.displayEndingStr = false;
                        if (areDatesOnSameDay(todayDateAsDateType, new Date(formattedDateTo))) {
                            //Event ends today
                            eventItem.displayEndingStr = true // to write "Ending on ... "

                            eventDatesOnSameDay = true;
                        }
                        if (involvesToday(todayDateAsDateType.getTime(), formattedDateFrom, formattedDateTo)) {
                            eventItem.displayEndingStr = true // to write "Ending on ... "
                            eventInvolvesToday = true;
                        }

                        if (areDatesWithin30Days(todayDateAsDateType.getTime(), formattedDateFrom) || areDatesOnSameDay(todayDateAsDateType, new Date(formattedDateFrom)) || eventDatesOnSameDay
                            || eventInvolvesToday)
                        // else
                         {
                            // Display if checks pass
                            arrayEvents.push(eventItem);

                            // Set checkedArray for items displayed
                            if (eventItem.isDone === true) {
                                // console.log("is done is true");
                                // let obj = {};
                                // if (eventItem.isRecurring) {
                                //     obj = {
                                //         recurrenceId: eventItem.recurrenceId,
                                //         eventId: eventItem.id
                                //     }
                                // } else {
                                //     obj = {
                                //         eventId: eventItem.id,
                                //
                                //     }
                                // }
                                // checkedArray.push(obj);
                                checkedArray.push(index);

                            }

                            index ++;
                        }
                    })
                    // console.log("checked array is ", checkedArray);
                    // console.log("array events is ", arrayEvents);
                    setChecked(checkedArray);
                    setEventList(arrayEvents);
                    // console.log("checked array state ", checked);
                    // console.log("eventlist array state ", eventList);

                    setCalendarEvents(calendarEventsArr);

                    }
            )
            .catch((err) => console.error(err));

        // console.log("get notes");

        instance.post(backendURL + `/notes/user`, user)
            .then((res) => {
                // console.log(res.data)
                const arrayNotes = [];

                // let index = 0;
                // const checkedArray = [];

                res.data.forEach(noteItem => {
                    arrayNotes.push(noteItem);
                    // if (noteItem.isDone === true) {
                    //     // console.log("is done is true");
                    //     checkedArray.push(index);
                    // }
                    // index ++;
                })
                // setNoteChecked(checkedArray);
                setNoteList(arrayNotes);
            })
            .catch((err) => console.error(err));

        }


    const handleLogout = () => {
        console.log("logging out");
        localStorage.removeItem("userid");
        console.log("have removed userid ", userId);
        navigate(`/login`, {replace: true});
    };

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

    const itemClicked = (clickedItem, type) => {
        console.log("item clicked", clickedItem);
        if (type === 1) {
            handleClickOpen("eventItem", clickedItem);
        } else if (type === 2){
            handleClickOpen("noteItem", clickedItem)
        }
    };

    //Handle toggle checkbox
    const handleToggle = (value: number, checkedItem, type) => () => {
        // const currentIndex = checked.indexOf(value);
        // const newChecked = [...checked];

        // console.log("current index toggle", value);
        // console.log("current item being checked", checkedItem.eventTitle);
        // console.log("current item being checked", type);
        // console.log("updating isDone from %s to %s", checkedItem.isDone, !checkedItem.isDone);

        if (type === 1) {
            const event = {
                eventTitle: checkedItem.eventTitle,
                eventDescription: checkedItem.eventDescription,
                dateTo: checkedItem.dateTo,
                dateFrom: checkedItem.dateFrom,
                isDone: !checkedItem.isDone,
                userId: userId,
            };

            //Axios post update to item isDone
            instance.put(backendURL + `/events/` + checkedItem.id, event)
                .then(res => {
                    // console.log("")
                    // console.log(res);
                })
        } else if (type === 2) {
            const note = {
                noteTitle: checkedItem.eventTitle,
                noteDescription: checkedItem.eventDescription,
                isDone: !checkedItem.isDone,
                userId: userId,

            };

            //Axios post update to item isDone
            instance.put(backendURL + `/notes/` + checkedItem.id, note)
                .then(res => {
                    console.log("")
                    console.log(res);
                })
        } else {

        }
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

    const dateRangeSelected = (range) => {
        console.log("date range selected", range);
        console.log("stratdate", range.startDate);
        console.log("enddate", range.endDate)
        setDatePickerOpen(false);

        setDateFrom(range.startDate);
        setDateTo(range.endDate);
    }

    const handleCheckBoxChange = (type) => {
        if (type === 0) {
            // console.log("istoday is checked");
            // setTodayChecked(!isTodayChecked);

        } else if (type === 1) {
            console.log("weekly checked is ", weeklyChecked);
            setWeeklyChecked(!weeklyChecked);
            console.log("weekly toggled to ", weeklyChecked);
            //Disable other options
            setMonthlyDisabled(!monthlyDisabled)
            setYearlyDisabled(!yearlyDisabled)
        } else if (type === 2){
            setMonthlyChecked(!monthlyChecked);
            //Disable other options
            setWeeklyDisabled(!weeklyDisabled)
            setYearlyDisabled(!yearlyDisabled)
        } else {
            setYearlyChecked(!yearlyChecked);
            //Disable other options
            setMonthlyDisabled(!monthlyDisabled)
            setWeeklyDisabled(!weeklyDisabled)
        }
        console.log("weekly checked", weeklyChecked);
        console.log("monthly checked", monthlyChecked);
        console.log("yearly checked", yearlyChecked);

    };

    function renderEventBoxContent() {
        // { console.log("checked arr", checked) }
        // { console.log("eventList arr", eventList) }
        if (eventList.length>0){
            return (
                <div  style={{maxHeight: '75%', overflow: 'auto'}}>

                    <List
                    >
                        { eventList.map((eventItem, index) =>{
                            // console.log("mapping eventlist with item %s", eventItem.eventTitle);
                            // console.log("mapping eventItem on list", eventItem);
                            // console.log("index is ", index);
                            // console.log("checked index of ", checked.indexOf(index));
                            // console.log("true or false ", checked.indexOf(index) !== -1);


                            // let checkedResult = false;
                            // // console.log("checked array printout", checked);
                            // //Search in checkedarray whether this eventItem should be checked or not, result will be stored in checkedResult.
                            // checked.every(eventObj => {
                            //     // console.log("eventobj is ", eventObj);
                            //     if (eventObj.recurrenceId) {
                            //         if (eventObj.eventId === eventItem.id && eventObj.recurrenceId === eventItem.recurrenceId) {
                            //             // console.log("this event is in checked array, recurrence");
                            //             checkedResult = true;
                            //             //if return false means break out of loop for every() function.
                            //             return false;
                            //         }
                            //     } else {
                            //         // console.log("eventobj id is ", eventObj.eventId);
                            //         // console.log("eventItem id is ", eventItem.id);
                            //
                            //         if (eventObj.eventId === eventItem.id) {
                            //             // console.log("this event is in checked array");
                            //             checkedResult = true;
                            //             return false;
                            //         }
                            //     }
                            //     return true;
                            // })
                            // console.log("event item isCheck result ", checkedResult);
                            //If event is recurring, render recurring events list item.
                            // if (eventItem.recurrence) {
                            //     return (
                            //         <ListItem
                            //             divider = {true}
                            //             key = {index}
                            //             secondaryAction={
                            //                 // <ThemeProvider theme = {theme}>
                            //                 <div>
                            //                 <IconButton
                            //                     // classes={{ root: classes.root, disabled: classes.disabled }}
                            //                     aria-label="recurringIcon"
                            //                     // disableRipple={true}
                            //                     // disableTouchRipple={true}
                            //                     // disableFocusRipple={true}
                            //                     // color={'white'}
                            //                     disabled
                            //                     // className={{disable : classes.iconButton}}
                            //                     // classes={{ disabled: classes.disabledButton }}
                            //
                            //                     // color="blue"
                            //                 >
                            //                     <EventRepeatIcon
                            //                         style={{
                            //                             transform: "scale(1.2)",
                            //                         }}
                            //                         edge="start"
                            //                     />
                            //                 </IconButton>
                            //                 <Checkbox
                            //                 style={{
                            //                 transform: "scale(1.2)",
                            //             }}
                            //                 edge="start"
                            //                 onChange={handleToggle(index, eventItem, 1)}
                            //                 checked={checked.indexOf(index) !== -1}
                            //                 />
                            //                 </div>
                            //                 // </ThemeProvider>
                            //             }
                            //         >
                            //
                            //             <ListItemText
                            //                 disableTypography
                            //                 onClick={() => itemClicked(eventItem, 1)}
                            //                 primary= {<Typography style={{                 overflow: 'hidden',
                            //                     fontSize: '17px', color: '#000000', marginRight: '1vmax'}}> {eventItem.eventTitle }</Typography>}
                            //                 secondary={  <Typography style = {{overflow: 'hidden' ,fontSize: '14px', color: '#515151'}}>
                            //                     {eventItem.dateFrom}
                            //                 </Typography>}
                            //             />
                            //         </ListItem>
                            //     )
                            // } else {


                                // if (checked.indexOf(index) !== -1) { //If indexOf value is not -1, means it found something.

                                    return (
                                        <ListItem
                                            divider = {true}
                                            key = {index}
                                            secondaryAction={
                                                //Show recurring icon if event is recurring type.
                                                 eventItem.recurrence === "" ? (
                                                <Checkbox
                                                    style={{
                                                        transform: "scale(1.2)",
                                                    }}
                                                    edge="start"
                                                    onChange={handleToggle(index, eventItem, 1)}
                                                    checked={checked.indexOf(index) !== -1}
                                                /> ) : (
                                                     <div>
                                                          <IconButton
                                                             // classes={{ root: classes.root, disabled: classes.disabled }}
                                                             aria-label="recurringIcon"
                                                             // disableRipple={true}
                                                             // disableTouchRipple={true}
                                                             // disableFocusRipple={true}
                                                             // color={'white'}
                                                             disabled
                                                             // className={{disable : classes.iconButton}}
                                                             // classes={{ disabled: classes.disabledButton }}

                                                             // color="blue"
                                                         >
                                                             <EventRepeatIcon
                                                                 style={{
                                                                     transform: "scale(1.2)",
                                                                 }}
                                                                 edge="start"
                                                             />
                                                         </IconButton>
                                                         <Checkbox
                                                             style={{
                                                                 transform: "scale(1.2)",
                                                             }}
                                                             edge="start"
                                                             onChange={handleToggle(index, eventItem, 1)}
                                                             checked={checked.indexOf(index) !== -1}
                                                         />
                                                     </div>
                                                )
                                            }
                                            style = {{
                                                //If event is done / checked, let the row be green.
                                                backgroundColor: checked.indexOf(index) !== -1 && "lightgreen"
                                            }}
                                        >
                                            <ListItemText
                                                disableTypography
                                                onClick={() => itemClicked(eventItem, 1)}
                                                primary= {
                                                    //if checkbox is ticked, display completed theme
                                                    checked.indexOf(index) !== -1 ? (
                                                            <Typography style={{               textDecoration: "line-through",
                                                                overflow: 'hidden',
                                                                fontSize: '17px', color: '#000000', marginRight: '1vmax'}}> {eventItem.eventTitle }
                                                            </Typography>
                                                        ) : (
                                                            //if checkbox unticked, display normal theme
                                                        <Typography style={{                 overflow: 'hidden',
                                                            fontSize: '17px', color: '#000000', marginRight: '1vmax'}}> {eventItem.eventTitle }
                                                        </Typography>
                                                        )

                                                }
                                                secondary={  <Typography style = {{overflow: 'hidden' ,fontSize: '14px', color: '#515151'}}>

                                                    { eventItem.displayEndingStr === false ?
                                                        ( "Starting on " + moment(eventItem.start).format('DD MMM YYYY h:mm a') ) : ( "Ending on " + moment(eventItem.end).format('DD MMM YYYY h:mm a')) }
                                                </Typography>}
                                            />
                                        </ListItem>
                                    )



                                // else {
                                //     //if checkbox is not ticked, display normal colors
                                //     return (
                                //
                                //         <ListItem
                                //             divider = {true}
                                //             key = {index}
                                //             secondaryAction={
                                //                 eventItem.recurrence === "" ? (
                                //                     <Checkbox
                                //                         style={{
                                //                             transform: "scale(1.2)",
                                //                         }}
                                //                         edge="start"
                                //                         onChange={handleToggle(index, eventItem, 1)}
                                //                         checked={checked.indexOf(index) !== -1}
                                //                     /> ) : (
                                //                     <div>
                                //                         <IconButton
                                //                             aria-label="recurringIcon"
                                //                             disabled
                                //                         >
                                //                             <EventRepeatIcon
                                //                                 style={{
                                //                                     transform: "scale(1.2)",
                                //                                 }}
                                //                                 edge="start"
                                //                             />
                                //                         </IconButton>
                                //                         <Checkbox
                                //                             style={{
                                //                                 transform: "scale(1.2)",
                                //                             }}
                                //                             edge="start"
                                //                             onChange={handleToggle(index, eventItem, 1)}
                                //                             checked={checked.indexOf(index) !== -1}
                                //                         />
                                //                     </div>
                                //                 )
                                //             }
                                //         >
                                //
                                //             <ListItemText
                                //                 disableTypography
                                //                 onClick={() => itemClicked(eventItem, 1)}
                                //                 primary= {<Typography style={{                 overflow: 'hidden',
                                //                     fontSize: '17px', color: '#000000', marginRight: '1vmax'}}> {eventItem.eventTitle }</Typography>}
                                //                 secondary={  <Typography style = {{overflow: 'hidden' ,fontSize: '14px', color: '#515151'}}>
                                //                     {eventItem.start}
                                //                 </Typography>}                                            />
                                //         </ListItem>
                                //     )
                                // }
                            // }

                        }) }
                    </List>
                </div>
            )
        }
        // else {
        //     return (
        //         // <div>
        //         //     <Grid item xs={12}>
        //         //         <div style = {fontSubHeaderStyle}> Upcoming Events </div>
        //         //         <Divider/>
        //         //     </Grid>
        //         // </div>
        //     )
        // }
    }
    function renderNoteBoxContent() {
        if (noteList.length>0){
            return (
                <div>

                    <List style={{maxHeight: '75%', overflow: 'auto'}}
                    >
                        { noteList.map((noteItem, index) =>{

                            // if (noteChecked.indexOf(index) !== -1) {
                                //if this item is checked, display completed colors
                                return (

                                    <ListItem
                                        divider = {true}
                                        key = {index}
                                        // secondaryAction={
                                            // <Checkbox
                                            //     style={{
                                            //         transform: "scale(1.2)",
                                            //     }}
                                            //     edge="start"
                                            //     onChange={handleToggle(index, noteItem, 2)}
                                            //     checked={noteChecked.indexOf(index) !== -1}
                                            // />
                                        // }
                                        // style = {{
                                        //     backgroundColor: "lightgreen"
                                        // }}
                                    >

                                        <ListItemText
                                            disableTypography
                                            onClick={() => itemClicked(noteItem, 2)}
                                            primary= {
                                                <Typography style={{                 overflow: 'hidden',
                                                    fontSize: '17px', color: '#000000', marginRight: '1vmax'}}> {noteItem.noteTitle }</Typography>
                                            }
                                            // secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItem>
                                )
                            // } else {
                                //if this item is not checked, display normal colors
                                // return (
                                //
                                //     <ListItem
                                //         divider = {true}
                                //         key = {index}
                                //         secondaryAction={
                                //             <Checkbox
                                //                 style={{
                                //                     transform: "scale(1.2)",
                                //                 }}
                                //                 edge="start"
                                //                 onChange={handleToggle(index, noteItem, 2)}
                                //                 checked={noteChecked.indexOf(index) !== -1}
                                //             />
                                //         }
                                //     >
                                //
                                //         <ListItemText
                                //             disableTypography
                                //             onClick={() => itemClicked(noteItem, 2)}
                                //             primary= {
                            //             <Typography style={{                 overflow: 'hidden',
                                //                 fontSize: '0.8vmax', color: '#000000', marginRight: '1vmax'}}> {noteItem.noteTitle }</Typography>
                            //                 }
                                //             // secondary={secondary ? 'Secondary text' : null}
                                //         />
                                //     </ListItem>
                                // )
                            // }
                        })
                        }
                    </List>
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
                    <div style = {{backgroundColor: '#DFE2D7',}}>
                    <DialogTitle sx = {{ marginBottom: -1, }}><div style = {{color: 'gray'}}>Add Upcoming Events</div>
                    </DialogTitle>
                    </div>
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
                                    autoFocus
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
                                <FormGroup>

                                    {/*<FormControlLabel*/}
                                    {/*    label="Today?"*/}
                                    {/*    control ={*/}
                                    {/*        <Checkbox*/}
                                    {/*            checked={isTodayChecked}*/}
                                    {/*            onChange={() => handleCheckBoxChange(0)}*/}
                                    {/*            inputProps={{'aria-label': 'controlled'}}*/}

                                    {/*        />*/}
                                    {/*    }*/}
                                    {/*/>*/}
                                </FormGroup>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>


                                    {/*<DateRangePicker*/}
                                    {/*    startDate={dateFrom}*/}
                                    {/*    endDate={dateTo}*/}
                                    {/*    onStartDateChange={setDateFrom}*/}
                                    {/*    onEndDateChange={setDateTo}*/}
                                    {/*    minimumDate={new Date().setDate()}*/}
                                    {/*    minimumLength={0}*/}
                                    {/*    format='dd MMM yyyy'*/}
                                    {/*    locale={enGB}*/}
                                    {/*>*/}
                                    {/*    {({ startDateInputProps, endDateInputProps, focus }) => (*/}
                                    {/*        <div className='date-range'>*/}
                                    {/*            <input*/}
                                    {/*                className={'input' + (focus === START_DATE ? ' -focused' : '')}*/}
                                    {/*                {...startDateInputProps}*/}
                                    {/*                placeholder='Start date'*/}
                                    {/*            />*/}
                                    {/*            <span className='date-range_arrow' />*/}
                                    {/*            <input*/}
                                    {/*                className={'input' + (focus === END_DATE ? ' -focused' : '')}*/}
                                    {/*                {...endDateInputProps}*/}
                                    {/*                placeholder='End date'*/}
                                    {/*            />*/}
                                    {/*        </div>*/}
                                    {/*    )}*/}
                                    {/*</DateRangePicker>*/}
                                    {/*<DatePicker*/}
                                    {/*    inputFormat ="dd/MM/yyyy"*/}
                                    {/*    label="Date From"*/}
                                    {/*    value={dateFrom}*/}
                                    {/*    onChange={(newValue) => {*/}
                                    {/*        setDateFrom(newValue);*/}
                                    {/*        setDateTo(newValue);*/}
                                    {/*    }}*/}
                                    {/*    renderInput={(params) => <TextField {...params} />}*/}
                                    {/*    InputProps={{ style: { fontSize: '1vmax' } }}*/}
                                    {/*    // InputLabelProps={{ style: { fontSize: '1vmax' } }}*/}
                                    {/*/>*/}

                                    {/*<DatePicker*/}
                                    {/*    inputFormat ="dd/MM/yyyy"*/}
                                    {/*    label="Date To"*/}
                                    {/*    value={dateTo}*/}
                                    {/*    onChange={(newValue) => {*/}
                                    {/*        setDateTo(newValue);*/}
                                    {/*    }}*/}
                                    {/*    renderInput={(params) => <TextField {...params} />}*/}
                                    {/*    InputProps={{ style: { fontSize: '1vmax' } }}*/}
                                    {/*    // InputLabelProps={{ style: { fontSize: '1vmax' } }}*/}
                                    {/*/>*/}

                                    <Grid container>
                                    <Grid item xs = '6' style = {{paddingRight: "10px"}} >
                                        <TextField
                                            onClick={toggle}
                                            margin="none"
                                            id="dateFrom"
                                            label="Start Date"
                                            autoFocus
                                            fullWidth
                                            variant="standard"
                                            value={moment(dateFrom).format('DD MMM YYYY')}
                                            onChange={(e) => setEventTitle(e.target.value)}
                                            size="normal"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <CalendarMonthIcon
                                                            fontSize = "large"/>
                                                    </InputAdornment>
                                                ),style: { fontSize: '1vmax' } }}
                                            InputLabelProps={{ style: { fontSize: '1vmax' } }}
                                        />
                                    </Grid>
                                        <Grid item xs = '6' style = {{paddingLeft: "10px"}} >
                                        <TextField
                                            onClick={toggle}
                                            margin="none"
                                            id="dateTo"
                                            label="End Date"
                                            fullWidth
                                            variant="standard"
                                            value={moment(dateTo).format('DD MMM YYYY')}
                                            onChange={(e) => setEventDescription(e.target.value)}
                                            size="normal"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <CalendarMonthIcon
                                                            fontSize = "large"/>
                                                    </InputAdornment>
                                                ),
                                                style: { fontSize: '1vmax' } }}
                                            InputLabelProps={{ style: { fontSize: '1vmax' } }}
                                        />
                                    </Grid>
                                    </Grid>

                                    <Collapse in={datePickerOpen}>
                                        <DateRangePicker
                                            style = {{position: "absolute"}}
                                            open={true}
                                            // toggle={toggle}
                                            onChange={(range) => dateRangeSelected(range)}
                                            closeOnClickOutside={true}
                                        />
                                    </Collapse>


                                    <FormGroup>

                                    <FormControlLabel
                                        label="Weekly"
                                        control ={
                                            <Checkbox
                                                checked={weeklyChecked}
                                                onChange={() => handleCheckBoxChange(1)}
                                                inputProps={{'aria-label': 'controlled'}}
                                                disabled= {weeklyDisabled}

                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        label="Monthly"
                                        control ={
                                            <Checkbox
                                                checked={monthlyChecked}
                                                onChange={() => handleCheckBoxChange(2)}
                                                inputProps={{'aria-label': 'controlled'}}
                                                disabled= {monthlyDisabled}
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        label="Yearly"
                                        control = {
                                            <Checkbox
                                                checked={yearlyChecked}
                                                onChange={ () => handleCheckBoxChange(3)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                disabled= {yearlyDisabled}

                                            />
                                        }
                                    />
                                    </FormGroup>
                                </LocalizationProvider>
                            </Stack>
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
                    <DialogTitle sx = {{marginBottom: -1, }}><div style = {{color: 'gray'}}>Add Notes</div>
                    </DialogTitle>
                    <Divider/>
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
                                InputProps={{
                                    style: { fontSize: '1vmax' } }}
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
            // console.log("page content is eventItem");
            // console.log("current clickeditem is ", currentClickedItem);
            // console.log("current clickeditem eventTitle ", currentClickedItem.eventTitle);
            // console.log("current clickeditem eventDesc ", currentClickedItem.eventDescription);

            return (
                <Dialog style = {{
                }}
                        fullWidth={true}
                        maxWidth={'lg'}
                        open={open}
                        onClose={handleDialogClose}>
                    {/*<Box style = {cardStyle } sx={{border: 1, marginBottom: 1, padding: 0, borderRadius: 2, borderColor: '#DDDDDD' }}>*/}

                    <DialogTitle sx = {{marginBottom: -1, }}><div style = {{color: 'gray'}}>Event Item Detail</div>
                    </DialogTitle>
                    <Divider/>

                    <DialogContent>
                        <Stack spacing={3}>

                        <Typography style = {{fontSize: '1vmax'}}> Event Title: {currentClickedItem.eventTitle} </Typography>

                        <Typography style = {{fontSize: '1vmax'}}> Event Description: {currentClickedItem.eventDescription !== "" ? currentClickedItem.eventDescription : 'N/A'}</Typography>

                        <Typography style = {{fontSize: '1vmax'}}> From: {moment(currentClickedItem.start).format('DD MMM YYYY h:mm a')}</Typography>
                        <Typography style = {{fontSize: '1vmax'}}> To: {moment(currentClickedItem.end).format('DD MMM YYYY h:mm a')}</Typography>

                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        {currentClickedItem.recurrence !== "" && (
                        <Button variant = "outlined" color = "error"  onClick={ () => deleteAllRecurrences(currentClickedItem, 1)}>Remove all recurrences</Button> )}
                        <Button variant = "outlined" color = "warning" onClick={ () => deleteItem(currentClickedItem, 1)}>Remove this</Button>
                        <Button variant = "outlined" color = "primary"
                                onClick={handleDialogClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            )
        } else if (pageContent === "noteItem") {
            return (
                <Dialog style = {{
                }}
                        fullWidth={true}
                        maxWidth={'lg'}
                        open={open}
                        onClose={handleDialogClose}>
                    {/*<Box style = {cardStyle } sx={{border: 1, marginBottom: 1, padding: 0, borderRadius: 2, borderColor: '#DDDDDD' }}>*/}

                    <DialogTitle sx = {{marginBottom: -1, }}><div style = {{color: 'gray'}}>Note Item Detail</div>
                    </DialogTitle>
                    <Divider/>

                    <DialogContent>
                        <Stack spacing={3}>

                            <Typography style = {{fontSize: '1vmax'}}> Note Title: {currentClickedItem.noteTitle} </Typography>

                            <Typography style = {{fontSize: '1vmax'}}> Note Description: {currentClickedItem.noteDescription !== "" ? currentClickedItem.noteDescription : 'N/A'}</Typography>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button variant = "outlined" color = "warning"  onClick={ () => deleteItem(currentClickedItem, 2)}>Remove this</Button>
                        <Button variant = "outlined" color = "primary" onClick={handleDialogClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            )
        } else {
            // console.log("no content");

        }
    }

    return userId !== null ? (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{xs:1, sm: 1, md:2, }}>
                <Grid item xs={12}>
                    <div style = {fontStyle}> { todayDate }  </div>
                    <Divider/>
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ border: 1, marginLeft: 1, padding: 2, borderRadius: 2, borderColor: '#DDDDDD' }}>
                        <MyCalendar></MyCalendar>
                    </Box>
                </Grid>
                <Grid item xs={4} >
                    <Box style = {cardStyle } sx={{border: 1, marginBottom: 1, padding: 0, borderRadius: 2, borderColor: '#DDDDDD'  }}>
                        <Grid item xs={12}>
                            <div style = {fontSubHeaderStyle}> Upcoming Events </div>
                            <Divider/>
                        </Grid>
                        {renderEventBoxContent()}
                    </Box>
                    <Box style = {cardStyle } sx={{border: 1, marginBottom: 1, padding: 0, borderRadius: 2, borderColor: '#DDDDDD' }}>
                        <Grid item xs={12}>
                            <div style = {fontSubHeaderStyle}> Notes </div>
                            <Divider/>
                        </Grid>
                        {renderNoteBoxContent()}
                    </Box>

                </Grid>
                <Grid item xs={12} style = {{textAlign: 'center' }}>

                        <Button
                                variant = "contained"
                                id="basic-button"
                                aria-controls={menuOpen ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={menuOpen ? 'true' : undefined}
                                onClick={handleClick}
                                style = {{marginRight: "5px"}}
                            >
                                <text style = {{ fontWeight: 'bold', fontSize: '0.8vmax'}}>Add Items</text>
                            </Button>

                            <Button
                                style = {{marginLeft: "5px", backgroundColor: orange[500],
                                }}
                                variant = "contained"
                                id="basic-button"
                                onClick={handleLogout}
                            >
                                <text style = {{ fontWeight: 'bold', fontSize: '0.8vmax'}}>Logout</text>
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
                </Grid>
                <Grid item xs={8}>
                </Grid>

            </Grid>

            {renderDialogContent()}

        </Box>

    ) : (
        <Navigate replace = {true} to = '/login'></Navigate>
    )
}
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/*<Route path="/addupcoming" element={<AddUpcoming />} />*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;