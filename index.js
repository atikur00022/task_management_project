import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import router from './routes/api.js';
import {
    DATABASE,
    MAX_JSON_SIZE,
    PORT,
    REQUEST_LIMIT_NUMBER,
    REQUEST_LIMIT_TIME,
    URL_ENCODED,
    WEB_CACHE
} from "./app/config/config.js";


const app = express();

// App Use Default Middleware
app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODED}));
app.use(helmet());

// App Use Limiter
const limiter = rateLimit({windowMs:REQUEST_LIMIT_TIME, max:REQUEST_LIMIT_NUMBER});
app.use(limiter);

// Cache
app.set('etg', WEB_CACHE);

// Database Connection
mongoose.connect(DATABASE,{autoIndex:true }).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log('MongoDB is not connected');
});

app.use('/api', router);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});