import app from './App';

const port = 8080;

require('dotenv').config()
console.log("Starting server!");
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${port}`);
})

