const express = require("express");
const prisma = require("../prismaClient");

const router = express.Router();

// CREATE category
router.post("/", async (req, res) => {
  const { name } = req.body;

  const category = await prisma.category.create({
    data: { name },
  });

  res.json(category);
});

// READ categories
router.get("/", async (_req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

// UPDATE category
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const category = await prisma.category.update({
    where: { id },
    data: { name },
  });

  res.json(category);
});

// DELETE category
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.category.delete({
    where: { id },
  });

  res.json({ message: "Category deleted" });
});

module.exports = router;
