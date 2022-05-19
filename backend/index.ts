import { PrismaClient } from '@prisma/client'
var cors = require('cors')
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(cors())

app.use(express.json())

// ... your REST API routes will go here

// EVENTS

//Read
app.get('/events', async (req, res) => {

  try {
    const events = await prisma.event.findMany({
       orderBy: [
        {
          dateFrom: 'asc',
        },
      ],
    })
    res.status(200).json(events)
  } catch (error) {
    res.status(400).send(error);
  }

})

// //Get Events By Username
// app.post('/events/user', async (req, res) => {
//   console.log("get events by id");
//   const { userId } = req.body

//   // console.log("user id is ", userId);

//   try {
    
//     const events = await prisma.event.findMany({
//        orderBy: [
//         {
//           dateFrom: 'asc',
//         },
//       ],
//        where: {
//         userId:  parseInt(userId),
//       },
//     })


//     let newArray: Array<Object> = [];
//     let indexRecurrenceEvents = -1;
//     //for loop each event, check for weekly, monthly or yearly then populate more events
//     const newEvents = Promise.all(events.map(event => {

//       newArray.push(event);
//       // console.log(event);
//       // console.log("type of event", typeof event);


//       // console.log("event recurrence is ", event.recurrence);

//       var newDateFrom;
//       var newDateTo;

//       if (event.recurrence === "weekly") {
//         //add recurrence for 52 weeks ahead
//         let currentDateFrom = event.dateFrom;
//         let currentDateTo = event.dateTo;

//         console.log(typeof currentDateTo);

//         // console.log("first currentDateFrom", currentDateFrom);
//         // console.log("first currentDateTo", currentDateTo);


//         for (let i = 0; i < 52; i++) {
//           newDateFrom = new Date(currentDateFrom);
//           newDateFrom.setDate(newDateFrom.getDate() + 7 * i);
//           newDateTo   = new Date(currentDateTo);
//           newDateTo.setDate(newDateTo.getDate() + 7 * i);

//         // console.log("after add", newDateFrom);
//         // console.log("after add", newDateTo);
            
//             let newEvent = {
//               recurrenceId: indexRecurrenceEvents,
//               id: event.id,
//               eventTitle: event.eventTitle,
//               eventDescription: event.eventDescription,
//               dateFrom: newDateFrom,
//               dateTo: newDateTo,
//               isRecurring: true,
//               recurrence: event.recurrence,

//             }
//             newArray.push(newEvent);
//             indexRecurrenceEvents--;
//         }

//       } else if (event.recurrence === "monthly") {

//       } else if (event.recurrence === "yearly") {
 
//       } else {

//       }


//       //Old method using spread operator, but we simplified the database to reduce processing.
//       // //Remove recurrence boolean and return as one column string.
//       // let { weekly, monthly, yearly, ...newEvent} = event;

//       // if (event.weekly) {

//       //   console.log("new event", newEvent);
//       //   return { newEvent, recurrence: "weekly"}


//       // } else if (event.monthly) {
//       //   // event["recurrence"] = 'monthly';
//       //   return { newEvent, recurrence: "weekly"}

//       // } else {
//       //   return { newEvent, recurrence: "yearly"}
//       // }
//     } )
//     )

//     // console.log("events", newArray)

//     res.status(200).json(newArray)
//   } catch (error) {
//     console.log("error is ", error);
//     res.status(400).send(error);
//   }

// })


//Get Events By Username
app.post('/events/user', async (req, res) => {
 
  console.log("get events by id");
  const { userId } = req.body

  // console.log("user id is ", userId);

  try {

    const events = await prisma.event.findMany({
       orderBy: [
        {
          dateFrom: 'asc',
        },
      ],
       where: {
        userId:  parseInt(userId),
      },
    })


    let newArray: Array<Object> = [];
    let indexRecurrenceEvents = -1;
    //for loop each event, check for weekly, monthly or yearly then populate more events
    const newEvents = Promise.all(events.map(event => {

      newArray.push(event);
      // console.log(event);
      // console.log("type of event", typeof event);


      // console.log("event recurrence is ", event.recurrence);

      // var newDateFrom;
      // var newDateTo;

      // if (event.recurrence === "weekly") {
        //add recurrence for 52 weeks ahead
        // let currentDateFrom = event.dateFrom;
        // let currentDateTo = event.dateTo;

        // console.log(typeof currentDateTo);

        // console.log("first currentDateFrom", currentDateFrom);
        // console.log("first currentDateTo", currentDateTo);


      //   for (let i = 0; i < 52; i++) {
      //     newDateFrom = new Date(currentDateFrom);
      //     newDateFrom.setDate(newDateFrom.getDate() + 7 * i);
      //     newDateTo   = new Date(currentDateTo);
      //     newDateTo.setDate(newDateTo.getDate() + 7 * i);

      //   // console.log("after add", newDateFrom);
      //   // console.log("after add", newDateTo);
            
      //       let newEvent = {
      //         recurrenceId: indexRecurrenceEvents,
      //         id: event.id,
      //         eventTitle: event.eventTitle,
      //         eventDescription: event.eventDescription,
      //         dateFrom: newDateFrom,
      //         dateTo: newDateTo,
      //         isRecurring: true,
      //         recurrence: event.recurrence,

      //       }
      //       newArray.push(newEvent);
      //       indexRecurrenceEvents--;
      //   }

      // } else if (event.recurrence === "monthly") {

      // } else if (event.recurrence === "yearly") {
 
      // } else {

      // }


      //Old method using spread operator, but we simplified the database to reduce processing.
      // //Remove recurrence boolean and return as one column string.
      // let { weekly, monthly, yearly, ...newEvent} = event;

      // if (event.weekly) {

      //   console.log("new event", newEvent);
      //   return { newEvent, recurrence: "weekly"}


      // } else if (event.monthly) {
      //   // event["recurrence"] = 'monthly';
      //   return { newEvent, recurrence: "weekly"}

      // } else {
      //   return { newEvent, recurrence: "yearly"}
      // }
    } )
    )

    // console.log("events", newArray)

    res.status(200).json(newArray)
  } catch (error) {
    console.log("error is ", error);
    res.status(400).send(error);
  }

})


// //Create
// app.post('/events', async (req, res) => {
//   console.log(req.body);
//   const { eventTitle, eventDescription, dateTo, dateFrom } = req.body


//   console.log(eventTitle, eventDescription, dateTo, dateFrom);
//   try {

//   const result = await prisma.event.create({
//       data: {
//         eventTitle, eventDescription, dateTo, dateFrom, 
//         },
//     })

//   res.status(201).json(result)  

//   } catch (e: any) {


//       console.log("error, message is", e.message);
//       console.log("error is", e)
    
//       res.status(404);
//   }
// })

//Create Events By Username
app.post('/events/user/create/', async (req, res) => {
  console.log("create events by id");
  const { eventTitle, eventDescription, dateTo, dateFrom, userId, recurrence} = req.body

  console.log("recurrence ", recurrence);


  try {
    let result;
    if (recurrence) {
      console.log("recurrence exists");

      let multipleEventsArray = []; 
      var newDateFrom = dateFrom; //start with intitial dateFrom
      var newDateTo = dateTo; // start with initial dateTo

      if (recurrence === "weekly") {

          for (let i = 0; i < 52; i++) {

            console.log("current datefrom", newDateFrom);;
            console.log("current dateto", newDateTo);
              
            let newEvent = {
              eventTitle: eventTitle,
              eventDescription: eventDescription,
              dateFrom: newDateFrom,
              dateTo: newDateTo,
              recurrence: recurrence,
              userId: parseInt(userId),
            }
            multipleEventsArray.push(newEvent);
            newDateFrom = new Date(newDateFrom);
            newDateFrom.setDate(newDateFrom.getDate() + 7);
            newDateTo   = new Date(newDateTo);
            newDateTo.setDate(newDateTo.getDate() + 7);
            }
          
          result = await prisma.event.createMany({
            data: multipleEventsArray,
          })
      }
    } else {
      console.log("recurrence does not exist");
      result = await prisma.event.create({
      data: {
        eventTitle, eventDescription, dateTo, dateFrom, userId: parseInt(userId)
        },
    })

    }


    res.status(201).json(result)  
  } catch (error) {
    console.log("error is ", error);
    res.status(400).send(error);
  }

})


//Update
app.put('/events/:id', async (req, res) => {
  console.log(req.body);
  const { eventTitle, eventDescription, dateTo, dateFrom, isDone, userId } = req.body;
  const { id } = req.params;


  console.log(eventTitle, eventDescription, dateTo, dateFrom, isDone);
  try {

  const result = await prisma.event.updateMany({
      where: {
        // user_query: {
          id: parseInt(id),
          userId: parseInt(userId),
        // }
      },
      data: {
          isDone: isDone,
      },
    })

  res.status(201).json(result)  

  } catch (e: any) {


      console.log("error, message is", e.message);
      console.log("error is", e)
    
      res.status(404);
  }
})

//Delete
app.delete('/events/:id', async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  console.log(id);

  try {

  const result = await prisma.event.delete({
      where: {
        id: parseInt(id),
      },
    })

  res.status(201).json(result)  

  } catch (e: any) {


      console.log("error, message is", e.message);
      console.log("error is", e)
      
      res.status(404);
  }
})

// NOTES

//Read
app.get('/notes', async (req, res) => {

  try {
    const notes = await prisma.note.findMany({
       orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    })
    res.status(201).json(notes)
  } catch (error) {
    res.status(400).send(error);
  }

})


//Get Notes By userid
app.post('/notes/user', async (req, res) => {
  console.log("get notes by id");
  const { userId } = req.body

  console.log("user id is ", userId);

  try {
    const events = await prisma.note.findMany({
       orderBy: [
        {
          createdAt: 'asc',
        },
      ],
       where: {
        userId:  parseInt(userId),
      },
    })
    res.status(200).json(events)
  } catch (error) {
    console.log("error is ", error);
    res.status(400).send(error);
  }

})

// //Create
// app.post('/notes', async (req, res) => {
//   console.log(req.body);
//   const { noteTitle, noteDescription } = req.body

//   console.log(noteTitle, noteDescription);

//   try {

//   const result = await prisma.note.create({
//       data: {
//         noteTitle, noteDescription,  
//         },
//     })

//   res.status(201).json(result)  

//   } catch (e: any) {


//       console.log("error, message is", e.message);
//       console.log("error is", e)
    
//       res.status(404);
//   }
// })

//Create notes by user id
app.post('/notes/user/create', async (req, res) => {
  console.log(req.body);

  const { noteTitle, noteDescription, userId } = req.body

  console.log(noteTitle, noteDescription);

  try {

  const result = await prisma.note.create({
      data: {
        noteTitle, noteDescription, userId: parseInt(userId)
        },
    })

  res.status(201).json(result)  

  } catch (e: any) {


      console.log("error, message is", e.message);
      console.log("error is", e)
    
      res.status(404);
  }
})

//Update
app.put('/notes/:id', async (req, res) => {
  console.log(req.body);
  const { noteTitle, noteDescription, isDone, userId } = req.body;
  const { id } = req.params;


  console.log(noteTitle, noteDescription, isDone);
  try {

  const result = await prisma.note.updateMany({
      where: {
       // user_query: {
          id: parseInt(id),
          userId: parseInt(userId),
        // }
      },
      data: {
          isDone: isDone,
      },
    })

  res.status(201).json(result)  

  } catch (e: any) {


      console.log("error, message is", e.message);
      console.log("error is", e)
    
      res.status(404);
  }
})

//Delete
app.delete('/notes/:id', async (req, res) => {
  console.log("delete notes by id");

  console.log(req.body);
  const { id } = req.params;

  console.log(id);
  try {

  const result = await prisma.note.delete({
      where: {
        id: parseInt(id),
      },
    })

  res.status(201).json(result)  

  } catch (e: any) {


      console.log("error, message is", e.message);
      console.log("error is", e)
      
      res.status(404);
  }
})


// USER
//Read
app.get('/users', async (req, res) => {

  try {
    const users = await prisma.user.findMany({
       orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    })
    res.status(201).json(users)
  } catch (error) {
    res.status(400).send(error);
  }

})

//Create
app.post('/users', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body

  console.log(username, password);

  try {

  const result = await prisma.user.create({
      data: {
        username, password,  
        },
    })

  res.status(201).json(result)  

  } catch (e: any) {


      console.log("error, message is", e.message);
      console.log("error is", e)

      if (e.code === 'P2002') {
        console.log("username already exists");
        res.status(301).send("DUPLICATE USERNAME");
      }
    
      // res.status(404);
  }

})

//LOGIN

app.post('/login', async (req, res) => {
  const { username, password} = req.body;
  console.log("username and password is %s and %s", username, password)

  try {
    const users = await prisma.user.findUnique({
       where: {
        username: String(username),
       },
    })

    console.log("users obj", users);
    //Check if username exist first, if exist then validate password. If not exist, send back code 301. 
    //If password not correct, send back code 302.

    if (users == null) {
      // console.log("username not found");
      res.status(301).send("USERNAME NOT EXIST");

    } else {
      // console.log("username found");

      if (password == users.password) {
        console.log("password matches");
        res.status(201).send(String(users.id));
      } else {
        res.status(302).send("WRONG PASSWORD");
        console.log("password not match");
      }
    }

  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }

})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)
