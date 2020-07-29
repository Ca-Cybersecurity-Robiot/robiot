import express from 'express';
import compression from 'compression'; // compresses requests
import session from 'express-session';
import bodyParser from 'body-parser';
import lusca from 'lusca';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';
import bluebird from 'bluebird';
import { MONGODB_URI, JWT_SECRET } from './util/secrets';
import indexRoute from './routes/index';
import cors from 'cors';
import SwaggerUI from 'swagger-ui-express';
import { SwaggerConfig } from './config/SwaggerConfig';
import { getAction } from './config/axios';
import swaggerJSDoc from 'swagger-jsdoc';

const MongoStore = mongo(session);

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, dbName: 'altermap' })
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    })
    .catch((err) => {
        console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    });

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: JWT_SECRET,
        store: new MongoStore({
            url: mongoUrl,
            autoReconnect: true,
        }),
    }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(cors());

/**
 * Primary app routes.
 */
app.use(indexRoute);

const swaggerSpec = swaggerJSDoc(SwaggerConfig);
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));

console.log(getAction(''));

export default app;
