class Scenario {
  constructor(bot, scenario) {
    this.bot = bot;
    this.scenario = scenario;
  }

  playScenario() {
    for (const hearItem of this.scenario) {
      this.bot.hear(hearItem.listener, async (payload, chat, data) => {
        const regexCounter = 1;
        for (const action of hearItem.actions) {
          const text = action.text ? action.text.replace(
            `{${regexCounter}}`,
            data &&
              data.match &&
              Array.isArray(data.match) &&
              data.match[regexCounter]
              ? data.match[regexCounter]
              : ""
          ) : undefined;
          if (action.type === "say object") {
            const clonedAction = JSON.parse(JSON.stringify(action));
            delete clonedAction.type;
            await chat.say(clonedAction);
          } else if (action.type === "say text" || action.type === "postback") {
            await chat.say(text, action.options);
          }
          console.log(action)
        }
      });
    }
  }
}

module.exports = Scenario;
