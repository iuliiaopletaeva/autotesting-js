require('chromedriver');
const { expect } = require('chai');
const {Builder, By} = require("selenium-webdriver");
const driver = new Builder().forBrowser('chrome').build();

describe("Testing the main page", async function(){
    this.timeout(15000);
    
    it("Testing opening book section", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const bookCard = By.css("aside#accesspress_storemo-2");
        const sectionTitle = By.css("h1.entry-title");

        await driver.findElement(bookCard).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/product-category/catalog/books/"
            );
        }, 5000);
        const sectionTitleText = await driver.findElement(sectionTitle).getText();
        expect(sectionTitleText).to.be.equal("КНИГИ", "Wrong title")
    });

    it("Testing opening tablet section", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const tabletCard = By.css("aside#accesspress_storemo-3");
        const sectionTitle = By.css("h1.entry-title");

        await driver.findElement(tabletCard).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/product-category/catalog/electronics/pad/"
            );
        }, 5000);
        const sectionTitleText = await driver.findElement(sectionTitle).getText();
        expect(sectionTitleText).to.be.equal("ПЛАНШЕТЫ", "Wrong title")
    });

    it("Testing opening photo section", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const photoCard = By.css("aside#accesspress_storemo-4");
        const sectionTitle = By.css("h1.entry-title");

        await driver.findElement(photoCard).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/product-category/catalog/electronics/photo_video/"
            );
        }, 5000);
        const sectionTitleText = await driver.findElement(sectionTitle).getText();
        expect(sectionTitleText).to.be.equal("ФОТО/ВИДЕО", "Wrong title")
    });

    it("Testing sale sticker presence", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const saleCard = By.css("[id='product1'] [class*='slick-active']");
        const saleStickers = By.css("[id='product1'] [class*='slick-active'] [class='onsale']");

        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(saleCard));
        await driver.sleep(5000);
        const saleStickersText = await driver.findElement(saleStickers).getText();
        expect(saleStickersText).to.be.equal("Скидка!", "Wrong sticker text");
        expect(saleCard.length).to.be.equal(saleStickers.length, "Wrong length")
    });

    it("Testing opening sale product 1", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const saleCard = By.className("slick-active");
        const firstSaleLink = By.css("section#product1 li[class*='active'] a[title='Куча']:first-child");
        const productTitle = By.css("[id='product1'] li[class*='active'] a[title='Куча'] h3");
        const productEntryTitle = By.className("product_title");
     
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(saleCard));
        await driver.sleep(5000);
        const productTitleText = await driver.findElement(productTitle).getText();
        await driver.findElement(firstSaleLink).click();
        await driver.wait(async () => {
            return (
                expect(await driver.getCurrentUrl()).contains("http://intershop5.skillbox.ru/product")
            );
        }, 5000);
        const productEntryTitleText = await driver.findElement(productEntryTitle).getText();
        expect(productEntryTitleText.toUpperCase()).to.be.equal(productTitleText, "Wrong product");
    });

    it("Testing opening sale product 2", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const saleCard = By.className("slick-active");
        const firstSaleLink = By.css("section#product1 li[class*='active'] a[title='Трррррр']:first-child");
        const productTitle = By.css("[id='product1'] li[class*='active'] a[title='Трррррр'] h3");
        const productEntryTitle = By.className("product_title");
     
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(saleCard));
        await driver.sleep(5000);
        const productTitleText = await driver.findElement(productTitle).getText();
        await driver.findElement(firstSaleLink).click();
        await driver.wait(async () => {
            return (
                expect(await driver.getCurrentUrl()).contains("http://intershop5.skillbox.ru/product")
            );
        }, 5000);
        const productEntryTitleText = await driver.findElement(productEntryTitle).getText();
        expect(productEntryTitleText.toUpperCase()).to.be.equal(productTitleText, "Wrong product");
    });

    it("Testing opening sale product 3", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const saleCard = By.className("slick-active");
        const firstSaleLink = By.css("section#product1 li[class*='active'] a[title='New Black Men’s Jeans']:first-child");
        const productTitle = By.css("[id='product1'] li[class*='active'] a[title='New Black Men’s Jeans'] h3");
        const productEntryTitle = By.className("product_title");
     
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(saleCard));
        await driver.sleep(5000);
        const productTitleText = await driver.findElement(productTitle).getText();
        await driver.findElement(firstSaleLink).click();
        await driver.wait(async () => {
            return (
                expect(await driver.getCurrentUrl()).contains("http://intershop5.skillbox.ru/product")
            );
        }, 5000);
        const productEntryTitleText = await driver.findElement(productEntryTitle).getText();
        expect(productEntryTitleText.toUpperCase()).to.be.equal(productTitleText, "Wrong product");
    });

    it("Testing opening sale product 4", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const saleCard = By.className("slick-active");
        const firstSaleLink = By.css("section#product1 li[class*='active'] a[title='фломастер']:first-child");
        const productTitle = By.css("[id='product1'] li[class*='active'] a[title='фломастер'] h3");
        const productEntryTitle = By.className("product_title");
     
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(saleCard));
        await driver.sleep(5000);
        const productTitleText = await driver.findElement(productTitle).getText();
        await driver.findElement(firstSaleLink).click();
        await driver.wait(async () => {
            return (
                expect(await driver.getCurrentUrl()).contains("http://intershop5.skillbox.ru/product")
            );
        }, 5000);
        const productEntryTitleText = await driver.findElement(productEntryTitle).getText();
        expect(productEntryTitleText.toUpperCase()).to.be.equal(productTitleText, "Wrong product");
    });

    it("Testing opening promo product", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const promoSection = By.css("#promo-section2 .promo-image");
        const productEntryTitle = By.className("product_title");
     
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(promoSection));
        await driver.sleep(5000);
        await driver.findElement(promoSection).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/?product=ipad-2020-32gb-wi-fi"
            );
        }, 5000);
        const productEntryTitleText = await driver.findElement(productEntryTitle).getText();
        expect(productEntryTitleText).to.be.equal("iPad 2020 32gb wi-fi", "Wrong product");
    });

    it("Testing new sticker presence", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const saleCard = By.css("[id='product2'] [class*='slick-active']");
        const saleStickers = By.css("[id='product2'] [class*='slick-active'] .label-new");

        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(saleCard));
        await driver.sleep(5000);
        const saleStickersText = await driver.findElement(saleStickers).getText();
        expect(saleStickersText).to.be.equal("Новый!", "Wrong sticker text");
        expect(saleCard.length).to.be.equal(saleStickers.length, "Wrong length")
    });

    it("Testing opening new product 1", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const newCard = By.css("[id='product2'] li[class*='active']");
        const firstSaleLink = By.css("[id='product2'] li[class*='active'] a[title='Куча']:first-child");
        const productTitle = By.css("[id='product2'] li[class*='active'] a[title='Куча'] h3");
        const productEntryTitle = By.className("product_title");
     
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(newCard));
        await driver.sleep(5000);
        const productTitleText = await driver.findElement(productTitle).getText();
        await driver.findElement(firstSaleLink).click();
        await driver.wait(async () => {
            return (
                expect(await driver.getCurrentUrl()).contains("http://intershop5.skillbox.ru/product")
            );
        }, 5000);
        const productEntryTitleText = await driver.findElement(productEntryTitle).getText();
        expect(productEntryTitleText.toUpperCase()).to.be.equal(productTitleText, "Wrong product");
    });

    it("Testing opening new product 2", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const newCard = By.css("[id='product2'] li[class*='active']");
        const firstSaleLink = By.css("[id='product2'] li[class*='active'] a[title='Трррррр']:first-child");
        const productTitle = By.css("[id='product2'] li[class*='active'] a[title='Трррррр'] h3");
        const productEntryTitle = By.className("product_title");
     
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(newCard));
        await driver.sleep(5000);
        const productTitleText = await driver.findElement(productTitle).getText();
        await driver.findElement(firstSaleLink).click();
        await driver.wait(async () => {
            return (
                expect(await driver.getCurrentUrl()).contains("http://intershop5.skillbox.ru/product")
            );
        }, 5000);
        const productEntryTitleText = await driver.findElement(productEntryTitle).getText();
        expect(productEntryTitleText.toUpperCase()).to.be.equal(productTitleText, "Wrong product");
    });

    it("Testing opening new product 3", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const newCard = By.css("[id='product2'] li[class*='active']");
        const firstSaleLink = By.css("[id='product2'] li[class*='active'] a[title='New Black Men’s Jeans']:first-child");
        const productTitle = By.css("[id='product2'] li[class*='active'] a[title='New Black Men’s Jeans'] h3");
        const productEntryTitle = By.className("product_title");
     
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(newCard));
        await driver.sleep(5000);
        const productTitleText = await driver.findElement(productTitle).getText();
        await driver.findElement(firstSaleLink).click();
        await driver.wait(async () => {
            return (
                expect(await driver.getCurrentUrl()).contains("http://intershop5.skillbox.ru/product")
            );
        }, 5000);
        const productEntryTitleText = await driver.findElement(productEntryTitle).getText();
        expect(productEntryTitleText.toUpperCase()).to.be.equal(productTitleText, "Wrong product");
    });

    it("Testing opening new product 4", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const newCard = By.css("[id='product2'] li[class*='active']");
        const firstSaleLink = By.css("[id='product2'] li[class*='active'] a[title='фломастер']:first-child");
        const productTitle = By.css("[id='product2'] li[class*='active'] a[title='фломастер'] h3");
        const productEntryTitle = By.className("product_title");
     
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(newCard));
        await driver.sleep(5000);
        const productTitleText = await driver.findElement(productTitle).getText();
        await driver.findElement(firstSaleLink).click();
        await driver.wait(async () => {
            return (
                expect(await driver.getCurrentUrl()).contains("http://intershop5.skillbox.ru/product")
            );
        }, 5000);
        const productEntryTitleText = await driver.findElement(productEntryTitle).getText();
        expect(productEntryTitleText.toUpperCase()).to.be.equal(productTitleText, "Wrong product");
    });

    it("Testing veiwed products section", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const promoSection = By.css("#promo-section2 .promo-image");
        const productEntryTitle = By.className("product_title");
        const mainPageLink = By.css("#menu-item-26");
        const veiwedProductsSection = By.css("#woocommerce_recently_viewed_products-2");
        const lastProduct = By.css(".product-title:nth-of-type(1)");
     
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(promoSection));
        await driver.sleep(5000);
        await driver.findElement(promoSection).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/?product=ipad-2020-32gb-wi-fi"
            );
        }, 5000);
        const productEntryTitleText = await driver.findElement(productEntryTitle).getText();
        await driver.findElement(mainPageLink).click();
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(veiwedProductsSection));
        const lastProductTitle = await driver.findElement(lastProduct).getText();
        expect(lastProductTitle).to.be.equal(productEntryTitleText, "Wrong product");
    });

    it("Testing phone number footer", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const phoneNumber = By.css(".top-footer-block:first-child p:nth-of-type(1)");
     
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(phoneNumber));
        await driver.sleep(1000);
        const phoneNumberText = (await driver.findElement(phoneNumber).getText()).trim();
        expect(phoneNumberText).contains("7-999-123-12-12", "Wrong number");
    });

    it("Testing email footer", async function(){
        this.timeout(10000);
        
        await driver.get("http://intershop5.skillbox.ru/#");
        const email = By.css(".top-footer-block:first-child p:nth-of-type(2)");
     
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(email));
        await driver.sleep(1000);
        const emailText = (await driver.findElement(email).getText()).trim();
        expect(emailText).contains("skillbox@skillbox.ru", "Wrong email");
    });

    it("Searching the product", async function(){
        this.timeout(10000);
        const searchField = By.css("input.search-field");
        const searchButton = By.className("searchsubmit");
        const resultPageTitle = By.className("entry-title");
        const title = By.tagName("h3");
        const searchValue = "холодильник"
        
        await driver.get("http://intershop5.skillbox.ru/#");

        await driver.findElement(searchField).sendKeys(searchValue);
        await driver.findElement(searchButton).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/?s=%D1%85%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA&post_type=product"
            );
        }, 5000);
        const resultPageTitleText = await driver.findElement(resultPageTitle).getText();
        expect(resultPageTitleText.toLowerCase()).to.be.equal(`результаты поиска: “${searchValue}”`, "Wrong product");
        const productTitles = await driver.findElements(title);
        expect(
            productTitles.some(async (titles) => {
                const titlesText = (await titles.getText()).toLowerCase();
                titlesText.includes(searchValue)
            })
        ).to.be.true;
    });

    it("Searching the product that do not exist", async function(){
        this.timeout(10000);
        const searchField = By.css("input.search-field");
        const searchButton = By.className("searchsubmit");
        const resultPageTitle = By.className("entry-title");
        const errorMessage = By.className("woocommerce-info");
        const searchValue = "бомба"
        
        await driver.get("http://intershop5.skillbox.ru/#");

        await driver.findElement(searchField).sendKeys(searchValue);
        await driver.findElement(searchButton).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/?s=%D0%B1%D0%BE%D0%BC%D0%B1%D0%B0&post_type=product"
            );
        }, 5000);
        const resultPageTitleText = await driver.findElement(resultPageTitle).getText();
        expect(resultPageTitleText.toLowerCase()).to.be.equal(`результаты поиска: “${searchValue}”`, "Wrong product");
        const errorMessageText = await driver.findElement(errorMessage).getText();
        expect(errorMessageText).to.be.equal("По вашему запросу товары не найдены.", "Wrong product");
    });

    it("Following catalog link", async function(){
        this.timeout(10000);
        const catalogLink = By.id("menu-item-46");
        const resultPageTitle = By.className("entry-title");
        
        await driver.get("http://intershop5.skillbox.ru/#");

        const catalogLinkText = await driver.findElement(catalogLink).getText();
        await driver.findElement(catalogLink).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/product-category/catalog/"
            );
        }, 1000);
        const resultPageTitleText = await driver.findElement(resultPageTitle).getText();
        expect(resultPageTitleText).to.be.equal(catalogLinkText, "Wrong page");
    });

    it("Following my account link from the menu", async function(){
        this.timeout(10000);
        const myAccountLink = By.id("menu-item-30");
        const resultPageTitle = By.className("entry-title");
        
        await driver.get("http://intershop5.skillbox.ru/#");

        const myAccountLinkText = await driver.findElement(myAccountLink).getText();
        await driver.findElement(myAccountLink).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/my-account/"
            );
        }, 1000);
        const resultPageTitleText = (await driver.findElement(resultPageTitle).getText()).toUpperCase();
        expect(resultPageTitleText).to.be.equal(myAccountLinkText, "Wrong page");
    });

    it("Following my account link from the enter button", async function(){
        this.timeout(10000);
        const myAccountLink = By.className("account");
        const resultPageTitle = By.className("entry-title");
        
        await driver.get("http://intershop5.skillbox.ru/#");

        await driver.findElement(myAccountLink).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/my-account/"
            );
        }, 1000);
        const resultPageTitleText = await driver.findElement(resultPageTitle).getText();
        expect(resultPageTitleText).to.be.equal("Мой аккаунт", "Wrong page");
    });

    it("Following cart link", async function(){
        this.timeout(10000);
        const cartLink = By.id("menu-item-29");
        const resultPageTitle = By.css("#accesspress-breadcrumb .current");
        
        await driver.get("http://intershop5.skillbox.ru/#");

        const cartLinkText = await driver.findElement(cartLink).getText();
        await driver.findElement(cartLink).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/cart/"
            );
        }, 1000);
        const resultPageTitleText = (await driver.findElement(resultPageTitle).getText()).toUpperCase();
        expect(resultPageTitleText).to.be.equal(cartLinkText, "Wrong page");
    });

    it("Following order link", async function(){
        this.timeout(15000);
        const orderLink = By.id("menu-item-31");
        const saleCard = By.className("slick-active");
        const addButton = By.css("section#product1 li[class*='active'] .add_to_cart_button");
        const resultPageTitle = By.css("#accesspress-breadcrumb .current");

        await driver.get("http://intershop5.skillbox.ru/#");
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(saleCard));
        await driver.sleep(5000);
        await driver.findElement(addButton).click();
        // await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(orderLink));
        await driver.sleep(5000);
        const orderLinkText = await driver.findElement(orderLink).getText();
        await driver.findElement(orderLink).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/checkout/"
            );
        }, 5000);
        const resultPageTitleText = (await driver.findElement(resultPageTitle).getText()).toUpperCase();
        expect(resultPageTitleText).to.be.equal(orderLinkText, "Wrong page");
    });
});