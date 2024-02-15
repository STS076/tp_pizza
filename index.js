const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = " mongodb+srv://sophie_toussaint:caolso14vylb@cluster0.va1niqc.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('pizzas_orders_db');
    const orders = database.collection('orders');
  
    const order = await orders.findOne(query);

    console.log(order);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);