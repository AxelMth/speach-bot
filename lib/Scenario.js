class Scenario {
  constructor(bot, scenario) {
    this.bot = bot;
    this.scenario = scenario;
  }

  playScenario() {
    for (const hearItem of this.scenario) {
      this.bot.hear(hearItem.listener, async (payload, chat, data) => {
        if (hearItem.callback && typeof hearItem.callback === 'function') {
            await hearItem.callback(payload.sender.id, payload.message.text)
        }
        const regexCounter = 1;
        for (const action of hearItem.actions) {
          const text = action.text
            ? action.text.replace(
                `{${regexCounter}}`,
                data &&
                  data.match &&
                  Array.isArray(data.match) &&
                  data.match[regexCounter]
                  ? data.match[regexCounter]
                  : ""
              )
            : undefined;
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
            await chat.say(text, action.options);
          }
        }
      });
    }
  }
}

module.exports = Scenario;
