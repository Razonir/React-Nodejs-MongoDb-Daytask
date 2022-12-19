const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Razonir:Razonir@daytask.r5cpiej.mongodb.net/?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
  console.log('--* mongoose connected *--');
})
