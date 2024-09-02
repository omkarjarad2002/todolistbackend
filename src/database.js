const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://omkarjarad2019:8VisPCeEf6Z3fAW0@todotask.whz16.mongodb.net/?retryWrites=true&w=majority&appName=todotask"
  )
  .then(() => {
    console.log("Connection Successfull!");
  })
  .catch((e) => {
    console.log(e);
  });
