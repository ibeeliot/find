require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = 3000;
const app = express();

app.use(cors());
// parsing body
app.use(express.json());

const userRouter = require('./routes/users');
const messageRouter = require('./routes/messages');
const lobbyRouter = require('./routes/lobbies');
const roomRouter = require('./routes/rooms');

app.use('/users', userRouter);
app.use('/messages', messageRouter);
app.use('/lobbies', lobbyRouter);
app.use('/rooms', roomRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };

  const errorObj = Object.assign({}, defaultErr, err);
  res.status(errorObj.status);
  res.send(errorObj.message);
});

app.listen(PORT, () => {
  console.log('server is listening on port: ', PORT);
});
