const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const db = require('./util/database');
const cron = require('node-cron')
const app = express();
const ports = process.env.PORT || 3001;
const { sendMails } = require('./services/email-sender');

app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers', '*');
  next();
});

const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const historyTaskRouter = require('./routes/historytask')

app.use('/user', userRouter);
app.use('/task', taskRouter);
app.use('/historytask', historyTaskRouter);

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(process.env.PORT || ports, () => {
  console.log(`Listening on port ${ports}`);
});

const task = require('./controllers/task')


const cronJob = require('cron').CronJob
new cronJob('0 0 * * *', () => {
  console.log('1');
  sendMails('razonir@Gmail.com', 'אפליקציה אופסה', '');
    const done =  task.allNot();
}, null, true)