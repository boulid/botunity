var Botkit = require('./node_modules/botkit/lib/Botkit.js');

const {Wit,log} = require('node-wit');
const client = new Wit({accessToken: 'JEU2TEQ4A2BSTCGGKQVR262KKOBJ4N5F'});


var controller = Botkit.sparkbot({
    debug: true,
    log: true,
    public_address: 'https://botunity.herokuapp.com/',
    ciscospark_access_token: 'ZjNjNzM4ODgtYTg4NC00ZWVjLWFmNzUtNWEyMWFmOWFhYWFiODIzZGNmZGQtZWYw'
});


var bot = controller.spawn({
});
controller.setupWebserver(process.env.PORT || 3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        console.log("SPARK: Webhooks set up!");
    });
});


controller.on('direct_message', function(bot, message) {
    
    client.message(message.text, {}).then((data) => {
    //=====================
    var result =data;
    var msg='Please specifiy '
    var hi=''
    var IsUndefined=0;
    
    if(typeof result.entities.actor== 'undefined'){
        msg = msg + 'The Actor name {Actor1,...,Actor5} From the chatbox. ';
        IsUndefined=1;
    }
    if(typeof result.entities.position== 'undefined'){
        msg = msg + 'The Position name {a, b, c, d, e} ';
        IsUndefined=1;
    }
    if(typeof result.entities.intent== 'undefined'){
        msg = 'Please try for example: Select an Actor1 from chatbox and tape [move to position B] ';
        IsUndefined=1;
    }    
    if (typeof result.entities.greetings!='undefined'){
        hi='Hi, hope youre doing good !';
    }

    
    if(IsUndefined==1)
        result.message=hi+msg;
    else
        result.message=hi;    
    
    bot.reply(message,JSON.stringify(result));
    console.dir(JSON.stringify(result))
    })
    .catch(console.error)
});


