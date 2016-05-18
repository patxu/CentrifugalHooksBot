// Pat Xu

console.log('Centrifugal Hooks bot starting up');

// import modules
var port = process.env.PORT || 5000;
var express = require('express');
var app = express();
var slackClient = require('@slack/client').RtmClient; // real-time messaging
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var MemoryDataStore = require('@slack/client').MemoryDataStore;

// setup Slack client
var token = process.env.SLACK_BOT_TOKEN;
var slack = new slackClient(token, {
  logLevel: 'error',
  // Initialise a data store for our client, this will load additional helper functions for the storing and retrieval of data
  dataStore: new MemoryDataStore(),
  // Boolean indicating whether Slack should automatically reconnect after an error response
  autoReconnect: true,
  // Boolean indicating whether each message should be marked as read or not after it is processed
  autoMark: true
});
slack.start();

var general; // #general channel

/**
 * log self and team name
 * Client events: https://github.com/slackhq/node-slack-sdk/blob/5c8d3bdbcc38a71ca45d372444ce5f79178de557/lib/clients/events/client.js
 *
 * @param  {type} startData description
 * @returns {type} description
 */
slack.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (startData) {
  console.log('Logged in as @%s of team %s, but not yet connected to a channel', startData.self.name, startData.team.name);
});

/**
  * log channels
  *
  * @param  {type} CLIENT_EVENTS.RTM.RTM_CONNECTION_OPEN
  * @param  {type}
  * @returns {type} description
 */
slack.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
  var channels = Object.keys(slack.dataStore.channels)
    .filter(function (c) {
      return slack.dataStore.getChannelById(c).is_member;
    })
    .map(function(c) {
      return slack.dataStore.getChannelById(c).name;
    });

  console.log('Channels: %s', channels.join(', '));


  general = slack.dataStore.getChannelByName('general');
  if (general !== null) {
    general = '<#' + general.id + '>';
  } else {
    general = '#general';
  }
});

/**
  * messege event- https://api.slack.com/events/message
  *
  * @param  {type} RTM_EVENTS.MESSAGE description
  * @param  {type} function(message   description
  * @returns {type}                    description
  */
slack.on(RTM_EVENTS.MESSAGE, function(message){
  var type = message.type,
      channel = message.channel,
      user = message.user,
      time = message.ts,
      text = message.text ? message.text : "",
      response = '';
  console.log('received %s', text);
});


/**
  * team_join event- https://api.slack.com/events/team_join
  *
  * @param  {type} team_join description
  * @returns {type} description
  */

slack.on(RTM_EVENTS.TEAM_JOIN, function onTeamJoin(team_join) {
  var user = slack.dataStore.getUserById(team_join.user.id);
  console.log('%s just joined the team!', user.name);

  var dm = slack.dataStore.getDMByName(user.name);

  slack.sendMessage('Hey ' + user.name + ', welcome to the Centrifugal Hooks channel! How are you doing? I\'m your friendly neighborhood brood leader and I\'m excited you\'re here! You can chat me but I can\'t do much yet– I\'m working on it... In the meantime, head over to ' + general + ' and say hi! Also go ahead and update your profile picture to your favorite icon from http://eu.battle.net/sc2/en/game/unit/ Happy kiting!', dm.id);
});

//sets up app
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
