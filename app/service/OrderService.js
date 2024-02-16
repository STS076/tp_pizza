const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = "mongodb://LaMouettas:root@localhost:27018/";
const client = new MongoClient(uri);

class OrderService {
  getOrdersByPizza(name) {
    const database = client.db("pizzas_orders_db");
    const orders = database.collection("orders");

    const query = { name: name };
    const order = orders.find(query);
    order.forEach(console.log);
  }

  getOrdersBySize(size) {
    const database = client.db("pizzas_orders_db");
    const orders = database.collection("orders");

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
    let totalPrice = 0;
    await orders
      .forEach((order) => {
        totalPrice += order.quantity * order.price;
      })
      .then((totalPrice) => {
        return totalPrice;
      });
    //return totalPrice;
    console.log(totalPrice);
  }

  async getTotalOrders() {
    const db = client.db("pizzas_orders_db");
    const coll = db.collection("orders");

    const orders = coll.find();
    let totalOrders = 0;
    await orders
      .forEach((order) => {
        totalOrders += order.quantity;
      })
      .then((totalOrders) => {
        return totalOrders;
      });
    // return totalOrders;
    console.log(totalOrders);
  }

  async getVeganPizza(vegan) {
    const db = client.db("pizzas_orders_db");
    const coll = db.collection("orders");

    const query = { name: vegan };
    const orders = coll.find(query);
    let veganOrders = 0;
    await orders
      .forEach((order) => {
        veganOrders += order.quantity;
      })
      .then((veganOrders) => {
        return veganOrders;
      });
    //   return veganOrders;
    console.log(veganOrders);
  }

  async getLargePizza(large) {
    const db = client.db("pizzas_orders_db");
    const coll = db.collection("orders");

    const query = { size: large };
    const orders = coll.find(query);
    let largeOrders = 0;
    await orders
      .forEach((order) => {
        largeOrders += order.quantity;
      })
      .then((largeOrders) => {
        return largeOrders;
      });
    console.log(largeOrders);
  }

  async getMostPopularPizzaSize() {
    const db = client.db("pizzas_orders_db");
    const coll = db.collection("orders");
  
    // Convertir le cursor en tableau pour pouvoir utiliser await
    const orders = await coll.find().toArray();
    let salesCount = {
      small: { quantity: 0 },
      medium: { quantity: 0 },
      large: { quantity: 0 },
    };
  
    // Calculer le total des quantités vendues pour chaque taille de pizza
    orders.forEach((order) => {
      if (salesCount[order.size]) {
        salesCount[order.size].quantity += order.quantity;
      }
    });
  
    // Afficher les résultats de salesCount pour débogage
    console.log(salesCount);
  
    // Trouver la taille de pizza la plus vendue
    return Object.keys(salesCount).reduce((a, b) =>
      salesCount[a].quantity > salesCount[b].quantity ? a : b
    );
  }

  async getMostProfitablePizza() {
    const db = client.db("pizzas_orders_db");
    const coll = db.collection("orders");

    const orders = coll.find();
    let mostProfitable = 0;
    let mostProfitablePizza = {};
    await orders
      .forEach((order) => {
        const total = order.quantity * order.price;
        if (total > mostProfitable) {
          mostProfitable = total;
          mostProfitablePizza = order;
        }
      })
      .then(() => {
        return mostProfitablePizza;
      });
    console.log(mostProfitablePizza);
  }
}

const order = new OrderService();
// console.log( order.getOrdersByPizza("Pepperoni") )
// console.log( order.getOrdersBySize("small") )
// console.log( order.getOrders() )
// console.log( "totalPrice: ",order.getTotalPrice() )
// console.log("totalOrders: ", order.getTotalOrders())
// console.log("Vegan orders : ", order.getVeganPizza("Vegan"))
// console.log("Large orders : ", order.getLargePizza("large"))
// console.log("Recette : ", order.getMostProfitablePizza());
order.getMostPopularPizzaSize()
  .then(mostPopularSize => {
    console.log(`La taille de pizza la plus populaire est : ${mostPopularSize}`);
  })
  .catch(error => {
    console.error(error);
  });
