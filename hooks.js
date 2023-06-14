const {Builder} = require("selenium-webdriver");
exports.mochaHooks = {
    beforeEach: async function(){
        driver = await new Builder().forBrowser("chrome").build();
    },

    
    afterEach: async function(){
        await driver.quit();
    }
}