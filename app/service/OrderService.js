const { MongoClient } = require("mongodb");
const uri = "mongodb://sophie_toussaint:caolso14vylb@localhost:27018/";
const client = new MongoClient(uri);


class OrderService {
    getOrdersByPizza(name) {
        const database = client.db('pizzas_orders_db');
        const orders = database.collection('orders');

        const query = { name: name };
        const order = orders.find(query);
        order.forEach(console.log);
    }


    getOrdersBySize(size) {
        const database = client.db('pizzas_orders_db');
        const orders = database.collection('orders');

        const query = { size: size };
        const order = orders.find(query);
        order.forEach(console.log);
    }


    getOrders() {
        const db = client.db("pizzas_orders_db");
        const coll = db.collection("orders");

        const orders = coll.find();
        orders.forEach(console.log);
    }

    async getTotalPrice() {
        const db = client.db("pizzas_orders_db");
        const coll = db.collection("orders");

        const orders = coll.find();
        let totalPrice = 0
        await orders.forEach(order => {
            totalPrice += order.quantity * order.price;
        }).then(totalPrice => { return totalPrice });
        //return totalPrice;
        console.log(totalPrice);
    }

    async getTotalOrders() {
        const db = client.db("pizzas_orders_db");
        const coll = db.collection("orders");

        const orders = coll.find();
        let totalOrders = 0;
        await orders.forEach(order => {
            totalOrders += order.quantity;
        }).then(totalOrders => { return totalOrders });
        // return totalOrders;
        console.log(totalOrders);
    }

    async getVeganPizza(vegan) {
        const db = client.db("pizzas_orders_db");
        const coll = db.collection("orders");

        const query = { name: vegan };
        const orders = coll.find(query);
        let veganOrders = 0;
        await orders.forEach(order => {
            veganOrders += order.quantity;
        }).then(veganOrders => { return veganOrders });
        //   return veganOrders;
        console.log(veganOrders)
    }

    async getLargePizza(large) {
        const db = client.db("pizzas_orders_db");
        const coll = db.collection("orders");

        const query = { size: large };
        const orders = coll.find(query);
        let largeOrders = 0;
        await orders.forEach(order => {
            largeOrders += order.quantity;
        }).then(largeOrders => { return largeOrders });
        console.log(largeOrders)
    }

    async mostPopularReceipe() {
        const db = client.db("pizzas_orders_db");
        const coll = db.collection("orders");

        const orders = coll.find();
    }
}

const order = new OrderService()
// console.log( order.getOrdersByPizza("Pepperoni") )
// console.log( order.getOrdersBySize("small") )
// console.log( order.getOrders() )
// console.log( "totalPrice: ",order.getTotalPrice() )
// console.log("totalOrders: ", order.getTotalOrders())
// console.log("Vegan orders : ", order.getVeganPizza("Vegan"))
// console.log("Large orders : ", order.getLargePizza("large"))