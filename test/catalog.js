require('chromedriver');
const { expect } = require('chai');
const {Builder, By} = require("selenium-webdriver");
const driver = new Builder().forBrowser('chrome').build();

describe("Testing catalog", async function(){
    this.timeout(15000);
    
    it("Open category of goods from the category list", async function(){
        this.timeout(10000);
        const categoryOfGoods = By.css(".cat-item-15 a");
        const resultPageTitle = By.className("entry-title");
        
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        const categoryOfGoodsText = (await driver.findElement(categoryOfGoods).getText()).toUpperCase();
        await driver.findElement(categoryOfGoods).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/product-category/uncategorized/"
            );
        }, 5000);

        const resultPageTitleText = await driver.findElement(resultPageTitle).getText();
        expect(resultPageTitleText).to.be.equal(categoryOfGoodsText, "Wrong title")
    });

    it("Open second page of goods' list", async function(){
        this.timeout(10000);
        const secondPage = By.css(".page-numbers[href$='2/']");
        const secondPageTitle = By.css(".woocommerce-breadcrumb span");
        const countOfGoods = By.className("woocommerce-result-count");
        
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(secondPage));
        await driver.findElement(secondPage).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/product-category/catalog/page/2/"
            );
        }, 5000);

        const secondPageTitleText = await driver.findElement(secondPageTitle).getText();
        const countOfGoodsText = await driver.findElement(countOfGoods).getText();
        expect(secondPageTitleText).to.be.equal("Page 2", "Wrong title");
        expect(countOfGoodsText).to.be.equal("Отображение 13–24 из 129", "Wrong title");
    });

    it("Open product card", async function(){
        this.timeout(10000);
        const productCard = By.className("post-2286");
        const productTitle = By.css(".post-2286 h3");
        const resultPageTitle = By.css(".woocommerce-breadcrumb span");
        const productTitleResult = By.className("product_title");
        
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        const productTitleText = await driver.findElement(productTitle).getText();
        await driver.findElement(productCard).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/product/2%d1%81%d0%bc%d0%b0%d1%80%d1%82%d1%84%d0%be%d0%bd-bq-6430l-aurora/"
            );
        }, 5000);

        const resultPageTitleText = await driver.findElement(resultPageTitle).getText();
        const productTitleResultText = await driver.findElement(productTitleResult).getText();
        expect(resultPageTitleText).to.be.equal(productTitleText, "Wrong title");
        expect(productTitleResultText).to.be.equal(productTitleText, "Wrong title");
    });

    it("Add product to cart", async function(){
        this.timeout(10000);
        const nameOfProduct = By.css(".post-15 h3");
        const addButton = By.css(".post-15 a.add_to_cart_button");
        const moreButton = By.css(".post-15 .added_to_cart");
        const resultProductName = By.css(".product-name a");
        const productPrice = By.css(".post-15 ins bdi");
        const productPriceResult = By.css(".product-price bdi");

        
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        const productNameText = await driver.findElement(nameOfProduct).getText();
        const productPriceText = await driver.findElement(productPrice).getText();
        await driver.findElement(addButton).click();
        await driver.sleep(1000);
        await driver.findElement(moreButton).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/cart/"
            );
        }, 5000);

        const resultProductNameText = await driver.findElement(resultProductName).getText();
        const productPriceResultText = await driver.findElement(productPriceResult).getText();
        expect(resultProductNameText).to.be.equal(productNameText, "Wrong title");
        expect(productPriceResultText).to.be.equal(productPriceText, "Wrong price");
    });

    it("Open product card from list of goods", async function(){
        this.timeout(10000);
        const productCard = By.css(".product_list_widget li:first-child a");
        const productTitle = By.css("li:first-child .product-title");
        const productTitleResult = By.className("product_title");
        
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(productCard));
        const productTitleText = await driver.findElement(productTitle).getText();
        await driver.findElement(productCard).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/product/%d1%82%d0%b5%d1%81%d1%82%d0%be%d0%b2%d0%b0%d1%8f-%d0%ba%d1%83%d1%87%d0%b0/"
            );
        }, 5000);

        const productTitleResultText = await driver.findElement(productTitleResult).getText();
        expect(productTitleText).to.be.equal(productTitleResultText, "Wrong title");
    });

})