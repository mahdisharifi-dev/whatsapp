import Parse from 'parse/dist/parse.min.js';
// import { initializeParse } from '@parse/react';

const PARSE_APPLICATION_ID = 'W3gTMJYZ217KGqvaNEEwjevtu5YOwF5eXzCVPSa6';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'B3DkE2gmo6lv9eGFzX7VEY4nvfrEewQ21e1CQmmS';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;



// initializeParse(
//     'votingapp.b4a.io', // e.g. YOUR_APP_NAME.b4a.io
//     PARSE_APPLICATION_ID,
//     PARSE_JAVASCRIPT_KEY
// );