import React, {useState, useContext} from "react";
import {Box, Button, Tab, Tabs} from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export default function CustomToolbar(props) {

    const goToBack = () => {
        let mDate = props.date;
        console.log("mdate", mDate);
        let newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
        props.onNavigate("prev", newDate);
    };

    const goToNext = () => {
        let mDate = props.date;
        console.log("mdate", mDate);

        let newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
        props.onNavigate("next", newDate);
    };

    const goToToday = () => {
        props.onNavigate("today", new Date());
    };

    return (<>
        <Grid container style={{
            marginTop: "-15px"
        }}>
            <Grid item xs={1}>
                {/*<Button  style={{}}*/}
                {/*         aria-label="Today"*/}
                {/*         variant="outlined" size="small"*/}
                {/*         id="prev-btn-icon" onClick={goToToday}*/}
                {/*>*/}

                {/*    /!*<ChevronLeftIcon fontSize="large"></ChevronLeftIcon>*!/*/}
                {/*    <div>TODAY</div>*/}
                {/*</Button>*/}
                <Button  style={{}}
                         variant="outlined" size="small"
                         id="prev-btn-icon" onClick={goToToday}
                >
                    <div style= {{fontSize: "20px", fontWeight: 'bold', }}>TODAY</div>
                </Button>
            </Grid>


            <Grid item xs={11}>
                <Box style = {{display:"flex", justifyContent: 'space-evenly'}}>
                <Button  style={{}}
                        variant="outlined" size="small"
                        id="prev-btn-icon" onClick={goToBack}
                >
                    <ArrowLeftIcon fontSize="large"/>
                    <div style= {{fontSize: "20px", fontWeight: 'bold', }}>Back</div>
                </Button>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: "25px",
                    fontWeight: 'bold'
                }}>
                    {props.label}
                </div>
                <Button style={{}}
                        variant="outlined" size="small"
                     id="next-btn-icon" onClick={goToNext}>
                    <div style = {{ fontSize: "20px", fontWeight: 'bold',}}>NEXT</div>
                    <ArrowRightIcon fontSize="large"/>

                </Button>

                </Box>
            </Grid>
        </Grid>
        {/*  <Box sx={{ display: "flex", gap: "20px" }}>*/}
        {/*      <Box*/}
        {/*          sx={{*/}
        {/*              display: "inline-flex",*/}
        {/*              background: "#EFEFFF",*/}
        {/*              alignItems: "center"*/}
        {/*          }}*/}
        {/*      >*/}
        {/*<span className="" id="prev-btn-icon" onClick={goToBack}>*/}
        {/*  <ChevronLeftIcon />*/}
        {/*</span>*/}
        {/*          {props.label}*/}
        {/*          <span className="" id="next-btn-icon" onClick={goToNext}>*/}
        {/*  <ChevronRightIcon />*/}
        {/*</span>*/}
        {/*      </Box>*/}


        {/*  </Box>*/}
    </>);
}
