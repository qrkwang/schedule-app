import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import events from './events'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)
const MyCalendar = props => (
    <div>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 1000 }}
        />
    </div>
)

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const App = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={8}>
                    <MyCalendar></MyCalendar>
                </Grid>
            </Grid>
        </Box>
        // <Grid container spacing={2}>
        //     <Grid item xs={8}>
        //         <Item>xs=8</Item>
        //
        //     </Grid>
        //     <Grid item xs={4}>
        //         <Item>xs=4</Item>
        //     </Grid>
        //     <Grid item xs={4}>
        //         <Item>xs=4</Item>
        //     </Grid>
        //     <Grid item xs={8}>
        //         <Item>xs=8</Item>
        //     </Grid>
        // </Grid>
    )
}

export default App;
