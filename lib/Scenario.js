class Scenario {

    constructor(bot, scenario) {
        this.bot = bot;
        this.scenario = scenario;
    }

    playScenario() {
        for (const [listener, actions] of this.scenario) {
            this.bot.hear(listener, async (payload, chat) => {
                for (const action of actions) {
                    await chat.say(action.text, action.options);
                }
            })
        }
    }

}

module.exports = Scenario;
