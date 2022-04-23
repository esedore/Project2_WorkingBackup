const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(__dirname+"views"));
app.use(express.static(__dirname+"model"));
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"controllers"));

module.exports = router;

app.use('/',router);
