const { IncomingWebhook } =  require("@slack/webhook");
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

/**
 * Puede conectarse a un canal de telegram y de mas 
 */
const loggerStream = {
    write: message => {
        webHook.send({
            text:message
        })
    },
};



module.exports =  loggerStream;