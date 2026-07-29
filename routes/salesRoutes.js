const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");
const { isLoggedIn } = require("../middleware/auth");

// Protect ALL sales routes with isLoggedIn middleware
router.use(isLoggedIn);

// GET /sales — Render sales dashboard page
router.get("/", salesController.getSalesDashboard);

// GET /api/sales-data — Return JSON sales statistics
router.get("/api/sales-data", salesController.getSalesData);

module.exports = router;
