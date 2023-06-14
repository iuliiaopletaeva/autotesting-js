require('chromedriver');
const { expect } = require('chai');
const {Builder, By} = require("selenium-webdriver");
const driver = new Builder().forBrowser('chrome').build();

describe("Testing cart", async function(){
    this.timeout(15000);
    
    it("Add several products to cart", async function(){
        const nameOfProduct = By.css(".post-15 h3");
        const addButton = By.css(".post-15 a.add_to_cart_button");
        const productPrice = By.css(".post-15 ins bdi");
        const nameOfProduct2 = By.css(".post-55 h3");
        const productPrice2 = By.css(".post-55 bdi");
        const addButton2 = By.css(".post-55 a.add_to_cart_button");
        const moreButton = By.css(".post-55 .added_to_cart");
        const resultProductName = By.css("tr:first-child .product-name a");
        const productPriceResult = By.css("tr:first-child .product-price bdi");
        const resultProductName2 = By.css("tr:nth-child(2) .product-name a");
        const productPriceResult2 = By.css("tr:nth-child(2) .product-price bdi");
 
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        const productNameText = await driver.findElement(nameOfProduct).getText();
        const productPriceText = await driver.findElement(productPrice).getText();
        await driver.findElement(addButton).click();
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(nameOfProduct2));
        const productNameText2 = await driver.findElement(nameOfProduct2).getText();
        const productPriceText2 = await driver.findElement(productPrice2).getText();
        await driver.findElement(addButton2).click();
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
        const resultProductNameText2 = await driver.findElement(resultProductName2).getText();
        const productPriceResultText2 = await driver.findElement(productPriceResult2).getText();
        expect(resultProductNameText).to.be.equal(productNameText, "Wrong title");
        expect(productPriceResultText).to.be.equal(productPriceText, "Wrong price");
        expect(resultProductNameText2).to.be.equal(productNameText2, "Wrong title of second good");
        expect(productPriceResultText2).to.be.equal(productPriceText2, "Wrong price of second good");
    });

    it("Testing total price", async function(){
        const addButton = By.css(".post-15 a.add_to_cart_button");
        const nameOfProduct2 = By.css(".post-55 h3");
        const addButton2 = By.css(".post-55 a.add_to_cart_button");
        const moreButton = By.css(".post-55 .added_to_cart");
        const productPrice1 = By.css("tr:first-child .product-subtotal bdi");
        const productPrice2 = By.css("tr:nth-child(2) .product-subtotal bdi");
        const totalPrice = By.css(".order-total bdi");
 
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        await driver.findElement(addButton).click();
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(nameOfProduct2));
        await driver.findElement(addButton2).click();
        await driver.sleep(1000);
        await driver.findElement(moreButton).click();
        await driver.sleep(3000);
        const productPriceText1 = parseInt(await driver.findElement(productPrice1).getText());
        const productPriceText2 = parseInt(await driver.findElement(productPrice2).getText());
        const amountPrice = productPriceText1 + productPriceText2;
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(totalPrice));
        const totalPriceText = parseInt(await driver.findElement(totalPrice).getText());
        expect(totalPriceText).to.be.equal(amountPrice, "Wrong total price");
    });

    it("Delete the product", async function(){
        const addButton = By.css(".post-15 a.add_to_cart_button");
        const nameOfProduct2 = By.css(".post-55 h3");
        const addButton2 = By.css(".post-55 a.add_to_cart_button");
        const moreButton = By.css(".post-55 .added_to_cart");
        const productName = By.css("tr:first-child .product-name a");
        const deleteButton = By.css("tr:first-child .remove");
        const deleteMessage = By.className("woocommerce-message");
        const productPrice = By.css("tr:first-child .product-subtotal bdi");
        const totalPrice = By.css(".order-total bdi");
 
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        await driver.findElement(addButton).click();
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(nameOfProduct2));
        await driver.findElement(addButton2).click();
        await driver.sleep(1000);
        await driver.findElement(moreButton).click();
        await driver.sleep(3000);
        const productNameText = await driver.findElement(productName).getText();
        const productPriceText = parseInt(await driver.findElement(productPrice).getText());
        const totalPriceText = parseInt(await driver.findElement(totalPrice).getText());
        await driver.findElement(deleteButton).click();
        await driver.sleep(3000);
        const deleteMessageText = await driver.findElement(deleteMessage).getText();
        const totalPriceTextNew = parseInt(await driver.findElement(totalPrice).getText());
        expect(deleteMessageText).to.be.equal(`“${productNameText}” удален. Вернуть?`, "Wrong delete message");
        expect(totalPriceTextNew).to.be.equal(totalPriceText - productPriceText, "Wrong total price");
    });

    it("Return the product after deleting", async function(){
        this.timeout(20000);
        const addButton = By.css(".post-15 a.add_to_cart_button");
        const nameOfProduct2 = By.css(".post-55 h3");
        const addButton2 = By.css(".post-55 a.add_to_cart_button");
        const moreButton = By.css(".post-55 .added_to_cart");
        const productName = By.css("tr:first-child .product-name a");
        const deleteButton = By.css("tr:first-child .remove");
        const returnButton = By.className("restore-item");
        const resultProductName = By.css("tr:nth-child(2) .product-name a");
 
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        await driver.findElement(addButton).click();
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(nameOfProduct2));
        await driver.findElement(addButton2).click();
        await driver.sleep(1000);
        await driver.findElement(moreButton).click();
        await driver.sleep(3000);
        const productNameText = await driver.findElement(productName).getText();
        await driver.findElement(deleteButton).click();
        await driver.sleep(3000);
        await driver.findElement(returnButton).click();
        await driver.sleep(3000);
        const productNameTextAfterReturning = await driver.findElement(resultProductName).getText();
        expect(productNameTextAfterReturning).to.be.equal(productNameText, "Wrong product");
    });

    it("Use valid promocode", async function(){
        const addButton = By.css(".post-15 a.add_to_cart_button");
        const nameOfProduct2 = By.css(".post-55 h3");
        const addButton2 = By.css(".post-55 a.add_to_cart_button");
        const moreButton = By.css(".post-55 .added_to_cart");
        const totalPrice = By.css(".order-total bdi");
        const promocodeInput = By.id("coupon_code");
        const promocodeButton = By.css("[name='apply_coupon']");
        const promocodeMessage = By.className("woocommerce-message");
        const amoutOfPromocode = By.css(".cart-discount .woocommerce-Price-amount");
 
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        await driver.findElement(addButton).click();
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(nameOfProduct2));
        await driver.findElement(addButton2).click();
        await driver.sleep(1000);
        await driver.findElement(moreButton).click();
        await driver.sleep(3000);
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(totalPrice));
        const totalPriceText = parseInt(await driver.findElement(totalPrice).getText());
        await driver.findElement(promocodeInput).sendKeys("sert500");
        await driver.findElement(promocodeButton).click();
        await driver.sleep(3000);
        const promocodeMessageText = await driver.findElement(promocodeMessage).getText();
        const amoutOfPromocodeText = await driver.findElement(amoutOfPromocode).getText();
        const totalPriceAfterPromocode = parseInt(await driver.findElement(totalPrice).getText());

        expect(promocodeMessageText).contain("Купон успешно добавлен.", "Wrong promocode message");
        expect(amoutOfPromocodeText).to.be.equal("500,00₽", "Wrong promocode amount");
        expect(totalPriceAfterPromocode).to.be.equal(totalPriceText - 500, "Wrong total price");
    });

    it("Use invalid promocode", async function(){
        const addButton = By.css(".post-15 a.add_to_cart_button");
        const nameOfProduct2 = By.css(".post-55 h3");
        const addButton2 = By.css(".post-55 a.add_to_cart_button");
        const moreButton = By.css(".post-55 .added_to_cart");
        const totalPrice = By.css(".order-total bdi");
        const promocodeInput = By.id("coupon_code");
        const promocodeButton = By.css("[name='apply_coupon']");
        const promocodeMessageError = By.css(".woocommerce-error li");
 
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        await driver.findElement(addButton).click();
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(nameOfProduct2));
        await driver.findElement(addButton2).click();
        await driver.sleep(1000);
        await driver.findElement(moreButton).click();
        await driver.sleep(3000);
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(totalPrice));
        const totalPriceText = parseInt(await driver.findElement(totalPrice).getText());
        await driver.findElement(promocodeInput).sendKeys("Error");
        await driver.findElement(promocodeButton).click();
        await driver.sleep(3000);
        const promocodeMessageText = await driver.findElement(promocodeMessageError).getText();
        const totalPriceAfterPromocode = parseInt(await driver.findElement(totalPrice).getText());

        expect(promocodeMessageText).contain("Неверный купон.", "Wrong promocode message");
        expect(totalPriceAfterPromocode).to.be.equal(totalPriceText, "Wrong total price");
    });

    it("Delete the promocode after using", async function(){
        const addButton = By.css(".post-15 a.add_to_cart_button");
        const nameOfProduct2 = By.css(".post-55 h3");
        const addButton2 = By.css(".post-55 a.add_to_cart_button");
        const moreButton = By.css(".post-55 .added_to_cart");
        const totalPrice = By.css(".order-total bdi");
        const promocodeInput = By.id("coupon_code");
        const promocodeButton = By.css("[name='apply_coupon']");
        const removePromocodeButton = By.className("woocommerce-remove-coupon");
        const promocodeMessage = By.className("woocommerce-message");
 
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        await driver.findElement(addButton).click();
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(nameOfProduct2));
        await driver.findElement(addButton2).click();
        await driver.sleep(1000);
        await driver.findElement(moreButton).click();
        await driver.sleep(3000);
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(totalPrice));
        const totalPriceText = parseInt(await driver.findElement(totalPrice).getText());
        await driver.findElement(promocodeInput).sendKeys("sert500");
        await driver.findElement(promocodeButton).click();
        await driver.sleep(3000);
        await driver.findElement(removePromocodeButton).click();
        await driver.sleep(3000);
        const promocodeMessageText = await driver.findElement(promocodeMessage).getText();
        const totalPriceAfterRemovingPromocode = parseInt(await driver.findElement(totalPrice).getText());

        expect(promocodeMessageText).contain("Купон удален.", "Wrong promocode message");
        expect(totalPriceAfterRemovingPromocode).to.be.equal(totalPriceText, "Wrong total price");
    });

    it("Checkout", async function(){
        const addButton = By.css(".post-15 a.add_to_cart_button");
        const nameOfProduct2 = By.css(".post-55 h3");
        const addButton2 = By.css(".post-55 a.add_to_cart_button");
        const moreButton = By.css(".post-55 .added_to_cart");
        const checkoutButton = By.className("checkout-button");
        const checkoutTitle = By.className("post-title");
 
        await driver.get("http://intershop5.skillbox.ru/product-category/catalog/");
        await driver.findElement(addButton).click();
        await driver.executeScript("arguments[0].scrollIntoView(true)", await driver.findElement(nameOfProduct2));
        await driver.findElement(addButton2).click();
        await driver.sleep(3000);
        await driver.findElement(moreButton).click();
        await driver.sleep(3000);
        await driver.findElement(checkoutButton).click();
        await driver.wait(async () => {
            return (
                (await driver.getCurrentUrl()) ===
                "http://intershop5.skillbox.ru/checkout/"
            );
        }, 5000);
        const checkoutTitleText = await driver.findElement(checkoutTitle).getText();
        expect(checkoutTitleText).to.be.equal("Оформление заказа", "Wrong title");
    });
})