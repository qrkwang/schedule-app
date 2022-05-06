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


//Create
app.post('/events', async (req, res) => {
  console.log(req.body);
  const { eventTitle, eventDescription, dateTo, dateFrom } = req.body


  console.log(eventTitle, eventDescription, dateTo, dateFrom);
  try {

  const result = await prisma.event.create({
      data: {
        eventTitle, eventDescription, dateTo, dateFrom, 
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
app.put('/events/:id', async (req, res) => {
  console.log(req.body);
  const { eventTitle, eventDescription, dateTo, dateFrom, isDone } = req.body;
  const { id } = req.params;


  console.log(eventTitle, eventDescription, dateTo, dateFrom, isDone);
  try {

  const result = await prisma.event.update({
      where: {
        id: parseInt(id),
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

//Create
app.post('/notes', async (req, res) => {
  console.log(req.body);
  const { noteTitle, noteDescription } = req.body

  console.log(noteTitle, noteDescription);

  try {

  const result = await prisma.note.create({
      data: {
        noteTitle, noteDescription,  
        },
    })

  res.status(201).json(result)  

  } catch (e: any) {


      console.log("error, message is", e.message);
      console.log("error is", e)
    
      res.status(404);
  }
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)
