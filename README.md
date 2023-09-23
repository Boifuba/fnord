![Alt](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)![Alt](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![Alt](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)![Alt](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)![Alt](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=black)
# Fnord Discord Bot

GURPS[^1] Fnord Bot is a stand-alone, interactive, discord bot to work as game aid to [GURPS 4<sup>th</sup> Edition](http://www.sjgames.com/gurps) roleplaying game system.

## How to Use
If you're not familiar with running Node.js applications, this guide may not be suitable for you. However, it's not overly complicated, and you can find various tutorials on the internet to help you learn. Here's what you'll need:

A machine running 24/7 to keep your bot running. There are several free services that offer virtual machines, and I recommend using Oracle Cloud for this purpose.
An account with MongoDB.
A development environment with VSCode and Node.js installed on your machine.
If you have these prerequisites in place, you can proceed with the tutorial.


## Creating your bot and getting your token
1. Go to [Discord Developers Portal](https://discord.com/developers/docs/intro) and click on Application on Left site 
2. Create a new application 
3. Give a name, change the aplication image (this is not your bot yet!)
4. Now you need to get a token, if is not visible, click on reset token and copy it on some place to use it later and do not share this key! This key is something like this 

```bash
MTE1MTI4Mjg0ODMwMTU4NDQ2Ng.GT8d6O.sQKmqYhXIrjNL07bDa3MiF6uv4mcOdkk0_OzF4
```
5. In settings go to Bot
   
    - Here you need to choose yout bot name and avatar.
    - If you want your bot public check PUBLIC BOT
    - In Privileged Gateway Intents turn on: PRESENCE INTENT, SERVER MEMBER INTENT AND MESSAGE CONTENT INTENT.
    - Save de changes
 
6. Now go to left side again in OAUTH2>URL Generator 

    - On Scopes select Bot 
    - On Bot permissions select Administrator. 
    - Scroll down the page and copy the url and paste it on your web browser. This is the url you need to invite your bot to your channel! Now you can see your bot running on your server! 

Once you have your bot running we need to put some code on it! 


 ## Installation

Make sure you have Node.js and npm installed on your machine.

1. Clone this repository:

```bash
git clone https://github.com/yourusername/yourbot.git
```

Navigate to the project folder:

2. Install the dependencies:
   
```bash
npm install
```

4. Create a mongodb account on

```bash
https://www.mongodb.com/
```

5. Create your dotenv file

Create a file ```.env```  under root folder follow this example:

```bash
DISCORD_TOKEN = discord token
GUILD_ID = discord channel id 
CLIENT_ID = bot id
MONGODB_SRV = monngo url with login and passwd
```
6.  Deploying Commands

Before running the bot, you need to deploy the commands to your Discord server. Execute the following command. This command will register all the commands defined for your bot on the Discord server.

```bash
node ./deploy_commands
```


7. Running the Bot

Now you're ready to start the bot:

```bash
node .
```
The bot is now up and running on your Discord server.

## Commands
Here are some of the commands available for use with this bot:

> Under Construction. I'll be listing it soon. 





------------



[^1]: GURPS is a trademark of Steve Jackson Games, and its rules and art are copyrighted by Steve Jackson Games. All
rights are reserved by Steve Jackson Games. This game aid is the original creation of Richard A. Wilkes and is
released for free distribution, and not for resale, under the permissions granted in the
<a href="http://www.sjgames.com/general/online_policy.html">Steve Jackson Games Online Policy</a>.