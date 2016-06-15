"use strict";

let express = require("express");
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + "/../client") );

app.get("/sports", (request, response) => {
    let sports = mongoUtil.sports();
    let sportNames;
    sports.find().toArray((err, docs) => {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(docs));
            let sportNames = docs.map((sport) => sport.name);
            response.json( sportNames );
        }
    });
});

app.listen(8080, () => console.log( "Listening on 8080" ));