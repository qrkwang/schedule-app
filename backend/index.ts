import { PrismaClient } from '@prisma/client'
var cors = require('cors')
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(cors())

app.use(express.json())

// ... your REST API routes will go here

app.get('/events', async (req, res) => {

  try {
    const events = await prisma.event.findMany()
    res.status(200).json(events)
  } catch (error) {
    res.status(400).send(error);
  }

})


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

  res.json(result)  

  } catch (e: any) {


      console.log("error, message is", e.message);
      console.log("error is", e)
    
      throw e
  }
})

app.put('/events:id', async (req, res) => {
  console.log(req.body);
  const { eventTitle, eventDescription, dateTo, dateFrom, isDone } = req.body;
  const { eventId } = req.params;

  console.log(eventTitle, eventDescription, dateTo, dateFrom, isDone);
  try {

  const result = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
          isDone: isDone,
      },
    })

  res.json(result)  

  } catch (e: any) {


      console.log("error, message is", e.message);
      console.log("error is", e)
    
      throw e
  }
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)
