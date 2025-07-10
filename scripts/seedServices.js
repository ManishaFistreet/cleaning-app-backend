// scripts/seedServices.js
const mongoose = require("mongoose");
const ServiceCategory = require("../models/services");
const SubService = require("../models/subServices");

const MONGO_URI = "mongodb://localhost:27017/cleaning-app";

const runSeeder = async () => {
  await mongoose.connect(MONGO_URI);

  await ServiceCategory.deleteMany();
  await SubService.deleteMany();

  const home = await ServiceCategory.create({ name: "Home Cleaning" });
  const sofa = await ServiceCategory.create({ name: "Sofa Cleaning" });

  await SubService.create([
    { name: "Bedroom Cleaning", category: home._id, price: 500 },
    { name: "Bathroom Cleaning", category: home._id, price: 300 },
    { name: "Kitchen Deep Clean", category: home._id, price: 700 },
    { name: "Single Seater Sofa", category: sofa._id, price: 250 },
    { name: "Double Seater Sofa", category: sofa._id, price: 400 },
  ]);
  mongoose.disconnect();
};

runSeeder();