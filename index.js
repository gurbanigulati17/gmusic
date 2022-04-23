const express= require('express');
const mongoose= require('mongoose');

const app=express();

const port=9000;
const url= "mongodb+srv://gmusic:gmusic@cluster0.6zqwt.mongodb.net/gmusic?retryWrites=true&w=majority";

mongoose.connect(url,{useNewUrlParser: true});
const con= mongoose.connection;
app.use(express.json());
try{
    con.on('open',() => {
        console.log('connected');
    })
}catch(error)
{
    console.log("Error: "+error);
}
mongoose.set('useFindAndModify', false);

const musicRouter= require("./routes/music");
app.use('/api/music',musicRouter)



app.listen(port, () =>{
    console.log('Server started');
})

