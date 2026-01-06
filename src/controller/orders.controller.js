import pool from "../database/config.js";

const customerGetById = async (req,res) => {
    let orders= await pool.query("select * from orders o join customers ct on ct.id=o.customerId join cars c on o.carsId=c.id")
    res.status(200).send(orders.rows)
}

const POST = async (req, res) => {
   try {
    const { customerid, carsid, month_count, start_date, end_date, paymentdate, amount } = req.body;

    if (!customerid || !carsid || !month_count || !start_date || !end_date || !paymentdate || !amount) {
      return res.status(400).json({
        status: 400,
        message: "Malumotlarni to'liq kiriting!",
      });
    }

    const carRes = await pool.query("SELECT price FROM cars WHERE id=$1", [carsid]);
    if (carRes.rows.length === 0) {
      return res.status(404).json({
        message: "Mashina topilmadi!",
      });
    }

    const minAmount = (carRes.rows[0].price * 20) / 100;
    if (amount < minAmount) {
      return res.status(400).json({
        message: `Mablag' eng kamida 20% bo'lishi kerak: minimal ${minAmount}`,
      });
    }

    const result = await pool.query(
      `INSERT INTO orders(customerid, carsid, month_count, start_date, end_date, paymentdate, amount)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [customerid, carsid, month_count, start_date, end_date, paymentdate, amount]
    );

    res.status(201).json({
      status: 201,
      message: "✅ Malumot qo'shildi",
      data: result.rows[0],
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export default {
  GET: customerGetById,
  POST
};



