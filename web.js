// Pat Xu

console.log("centrifugal-hooks bot starting up");

// import modules
var express = require("express");
var app = express();
var rtmClient = require("@slack/client").RtmClient; // real-time messaging

// setup Slack client
var token = process.env.SLACK_BOT_TOKEN, // Add a bot at      https://my.slack.com/services/new/bot and copy the token here.
  autoReconnect = true,
  autoMark = true;
var rtm = new rtmClient(token, autoReconnect, autoMark);
