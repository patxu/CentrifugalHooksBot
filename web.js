// Pat Xu

console.log("centrifugal-hooks bot starting up");

// import modules
var express = require("express");
var app = express();
var slackClient = require("@slack/client").RtmClient; // real-time messaging

// setup Slack client
var token = process.env.SLACK_BOT_TOKEN, // Add a bot at      https://my.slack.com/services/new/bot and copy the token here.
  autoReconnect = true,
  autoMark = true;
var slack = new slackClient(token, autoReconnect, autoMark);


/**
 * messege event- https://api.slack.com/events/message
 */
slack.on('message', onMessage(message));


/**
 * team_join event- https://api.slack.com/events/team_join
 */
slack.on('team_join', onTeamJoin());

function onMessage(message) {
  var type = message.type,
      channel = slack.getChannelGroupOrDMByID(message.channel),
      user = slack.getUserByID(message.user),
      time = message.ts,
      text = (message.text) ? message.text : "",
      response = '';
}

/**
 * onTeamJoin - description
 *
 * @returns {type}  description
 */
function onTeamJoin(team_join) {

}
