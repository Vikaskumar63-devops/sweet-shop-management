import prisma from "../prismaClient";

// Add sweet
export const addSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  const sweet = await prisma.sweet.create({
    data: { name, category, price, quantity }
  });

  res.json(sweet);
};

// Get all sweets
export const getSweets = async (req, res) => {
  const sweets = await prisma.sweet.findMany();
  res.json(sweets);
};

// Search sweets
export const searchSweets = async (req, res) => {
  const { name, category } = req.query;

  const sweets = await prisma.sweet.findMany({
    where: {
      name: name ? { contains: name as string } : undefined,
      category: category ? { contains: category as string } : undefined
    }
  });

  res.json(sweets);
};

// Update sweet
export const updateSweet = async (req, res) => {
  const id = Number(req.params.id);

  const sweet = await prisma.sweet.update({
    where: { id },
    data: req.body
  });

  res.json(sweet);
};

// Delete sweet
export const deleteSweet = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.sweet.delete({ where: { id } });

  res.json({ message: "Sweet deleted" });
};

// Purchase sweet
export const purchaseSweet = async (req, res) => {
  const id = Number(req.params.id);

  const sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet || sweet.quantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  const updated = await prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity - 1 }
  });

  res.json(updated);
};

// Restock sweet
export const restockSweet = async (req, res) => {
  const id = Number(req.params.id);
  const { quantity } = req.body;

  const updated = await prisma.sweet.update({
    where: { id },
    data: { quantity: { increment: quantity } }
  });

  res.json(updated);
};
