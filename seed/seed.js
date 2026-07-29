require("dotenv").config();

const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const mongoose = require("mongoose");
const Product = require("../models/Product");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is missing from the .env file");
    process.exit(1);
}

const categories = ["Polo", "Casual", "Festive"];

const seedProducts = [];

for (let i = 1; i <= 30; i++) {
    const category = categories[i % categories.length];

    let name = "";

    if (category === "Polo") {
        name = `Signature Polo ${i}`;
    }

    if (category === "Casual") {
        name = `Heritage Casual Shirt ${i}`;
    }

    if (category === "Festive") {
        name = `Prestige Shalwar Kameez ${i}`;
    }

    seedProducts.push({
        name: name,
        price: Math.floor(Math.random() * 5000) + 3000,
        category: category,
        rating: Number(
            (Math.random() * 1 + 4).toFixed(1)
        ),
        stock: Math.floor(Math.random() * 8) + 1
    });
}

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("Connected to MongoDB Atlas");

        await Product.deleteMany({});

        await Product.insertMany(seedProducts);

        console.log(
            "Database seeded successfully with 30 products!"
        );
    } catch (error) {
        console.error("Seeding error:", error);
    } finally {
        await mongoose.connection.close();

        console.log("Database connection closed");
    }
};

seedDB();