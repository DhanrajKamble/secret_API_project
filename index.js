import express from "express";
import axios from "axios";
import path from 'path';
import { fileURLToPath } from 'url';

// Get the __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path.join(__dirname, '../FRONTEND/views'));

// Serve static files from the 'FRONTEND/public' directory
app.use(express.static(path.join(__dirname, '../FRONTEND/public'))); 


app.get("/", async (req, res)=>{
    try {
        // Replace the URL with a real API endpoint that provides random secrets
        const response = await axios.get('https://secrets-api.appbrewery.com/random');  
        const { username, secret } = response.data;
        res.render('index', { username, secret });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, ()=>{
    console.log(`Server stared on port ${port}`);
});