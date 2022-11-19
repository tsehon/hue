class Product {
    constructor(id, name, price, brand, link, rating) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.brand = brand;
        this.link = link;
        this.rating = rating;
    }
    toString() {
        return this.name;
    }
}

export default Product;