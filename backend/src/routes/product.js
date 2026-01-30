const express = require("express");
const prisma = require("../prismaClient");

const router = express.Router();

// CREATE product
router.post("/", async (req, res) => {
  const { name, categoryId } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      categoryId: Number(categoryId),
    },
  });

  res.json(product);
});

// READ products with SERVER-SIDE pagination
router.get("/", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await prisma.product.findMany({
    skip,
    take: limit,
    include: {
      category: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const response = products.map((p) => ({
    productId: p.id,
    productName: p.name,
    categoryId: p.category.id,
    categoryName: p.category.name,
  }));

  res.json(response);
});

// DELETE product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  res.json({ message: "Product deleted" });
});

module.exports = router;
