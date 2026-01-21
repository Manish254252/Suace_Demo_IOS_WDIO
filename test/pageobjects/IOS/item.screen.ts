export class ItemScreen {
    get addToCart() {
        return $(`~AddToCart`);
    }
    async addItemToCart() {
        await this.addToCart.click();
    }
}