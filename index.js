const express = require('express');
const { connectToSqlDb } = require('./config/sqlConfig/sqlConfig');
const apiRouter = require('./routes/apiRoutes/apiRoutes');
const app = express();

app.use(express.json())

const PORT = 8000;

// test req
app.get(`/`, (req, res)=>{
    return res.send(
        "<h1>hello </h1>"
    )
})

// routes
app.use(`/api`, apiRouter)

// connect to sql db
connectToSqlDb()

app.listen(PORT, ()=>{
    console.log(`sql app in listening on port http://localhost:${PORT}`);
})