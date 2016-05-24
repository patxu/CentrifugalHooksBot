# Centrifugal Hooks Bot
A Slack bot for the CentrifugalHooks Slack team. Take a look at the [guide](https://github.com/dali-lab/dev-resources/blob/slack/slack_bot.md) (work in progress) for details on how this was set up.

## Features
An overview of what the bot can do:
### - Onboarding
  - welcome new users to the team by sending them a DM
  - contains startup info, like setting the profile picture

## Architecture at a glance
  - [Node.js](https://nodejs.org/en/) + [Express.js](http://expressjs.com/)
  - runs on [Heroku](http://heroku.com)

## Contributing
- ### Clone, branch, pull request
  - `git clone https://github.com/patxu/CentrifugalHooksBot`
  - `master` is a protected branch so we need to use **pull requests**
    - `git checkout -b <feature>`
    - `git push origin <feature>`
    - open a pull request on the Github website or the Github Desktop client
  - a [Git intro](https://github.com/dali-lab/gitivity)

- ### Environment Variables
  1. get the API token
    - if you are part of the team you can [check yourself](https://centrifugal-hooks.slack.com/services/B1996SDM2)
    - if you are not part of the team get an API token from a current developer
  1. set environment variables (for local testing)
    - export each environment variable (e.g. `export SLACK_BOT_TOKEN="XXXX"`)
    `SLACK_BOT_TOKEN`

- Resources
  - [node-slack-client](https://github.com/slackhq/node-slack-client)
  - [Slack API](https://api.slack.com/), particularly the [events](https://api.slack.com/events)
