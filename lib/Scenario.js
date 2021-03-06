/**
 * {
  *  type: "on" | undefined = "hear"
  *  listener: "regex pattern to be matched",
  *  actions: {
    *   type: "say text" | "say object" | "sendTextMessage" ,
    *   text: "text",
    *   quickReplies: [quick_replies_object], // if type === "say object" | "sendTextMessage"
    *   buttons: [buttons_object],
    *   ...   
  *   }
 * }
 */

class Scenario {
  constructor(bot, scenario) {
    this.bot = bot;
    this.scenario = scenario;
  }

  playScenario() {
    for (const botBehavior of this.scenario) {
        switch (botBehavior.type) {
            case "on":
                this.handleBotOnAction(botBehavior);
                break;
            case "message":
                this.handleBotOnMessage(botBehavior);
                break;
            case "image":
                this.handleBotOnImage(botBehavior);
                break;
            case "attachment":
                this.handleBotOnAttachment(botBehavior);
                break;
            case "quickReplies":
              console.log("quickReplies")
                this.handleBotOnQuickReplies(botBehavior);
                break;
            default:
                console.log("hear")
                this.handleBotOnHear(botBehavior);
                break;
        }
    }
  }

  handleBotOnHear(botBehavior) {
    this.bot.hear(botBehavior.listener, async (payload, chat) => {
        console.log("Set hear listener: ", botBehavior.listener)
        if (botBehavior.callback && typeof botBehavior.callback === 'function') {
            await botBehavior.callback(payload.sender.id, payload.message.text)
        }
        for (const action of botBehavior.actions) {
            await this.handleAction(chat, action, payload);
        }
      });
  }

  handleBotOnAction(botBehavior) {
    this.bot.on(botBehavior.listener, async (payload, chat) => {
        for (const action of botBehavior.actions) {
            await this.handleAction(chat, action, payload);
        }
      });
  }

  handleBotOnMessage(botBehavior) {}
  handleBotOnImage(botBehavior) {}
  handleBotOnAttachment(botBehavior) {}

  async handleAction(chat, action, payload) {
    if (action.type === "say object") {
      const clonedAction = Object.assign({}, action);
      delete clonedAction.type;
      if (typeof clonedAction.quickRepliesGenerator === "function") {
        clonedAction.quickReplies = clonedAction.quickRepliesGenerator(
          payload.message.text
        );
        delete clonedAction.quickRepliesGenerator;
      }
      await chat.say(clonedAction);
    } else if (action.type === "say text") {
      await chat.say(action.text, action.options);
    } else if (action.type === "sendTextMessage") {
      await chat.sendTextMessage(action.text, action.quickReplies, action.options);
    }
  }
} 

module.exports = Scenario;
