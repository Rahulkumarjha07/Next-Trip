const express = require("express");
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/wanderlast')
  .then(() => console.log('Connected!'));

const Listing = require('./models/listing');

/* app.get("/listings", async (req, res)=>{
   let samplelisting = new Listing({
        title:"sample title",
        description:"sample description",
        price:1200,
        location:"sample location",
        country:"sample country",
    });
   await samplelisting.save();
   console.log("listing saved");
   res.send("saved successfully")
});  */

app.get("/listings", async (req, res){
   let allistings = await Listing.find({}).then(()=>{

        console.log("listings fetched successfully");
        res.render(index.ejs,{allistings});
    });

});

app.get("/",(req,res)=>{ 
    res.send("hello world");
});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
