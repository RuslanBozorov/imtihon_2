import pool from "../database/config.js";

const customerGetById = async (req, res) => {
  try {
    const query = `
      SELECT 
        o.id, ct.fullname, c.name as car_name,
        o.month_count, o.start_date, o.end_date, o.amount 
      FROM Orders o 
      JOIN Customers ct ON ct.id = o.customerid 
      JOIN Cars c ON o.carsid = c.id
    `;
    let orders = await pool.query(query);
    res.status(200).send(orders.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const POST = async (req, res) => {
  try {
    const monthRates = {
      1: 15,
      3: 30,
      6: 55
    };

    const { customerid, carsid, month_count, start_date, end_date, amountMax } = req.body;

    if (!customerid || !carsid || !month_count || !amountMax) {
      return res.status(400).json({
        message: "Ma'lumotlarni to'liq kiriting!",
      });
    }

    if (!monthRates[month_count]) {
      return res.status(400).json({ message: "Faqat 1, 3 yoki 6 oylik ijara mavjud!" });
    }

    const carRes = await pool.query("SELECT price FROM cars WHERE id=$1", [carsid]);
    if (carRes.rows.length === 0) {
      return res.status(404).json({ message: "Mashina topilmadi!" });
    }

    const carPrice = carRes.rows[0].price;

    let minAmount = (carPrice * 20) / 100;
    if (amountMax < minAmount) {
      return res.status(400).json({
        message: `Boshlang'ich to'lov kamida 20% bo'lishi kerak: minimal ${minAmount}`,
      });
    }

    let total_sum = (carPrice * monthRates[month_count]) / 100;

    const result = await pool.query(
      "INSERT INTO orders(customerid, carsid, month_count, start_date, end_date, amount) VALUES ($1, $2, $3, COALESCE($4, CURRENT_DATE), COALESCE($5, CURRENT_DATE), $6) RETURNING *",
      [customerid, carsid, month_count, start_date, end_date, total_sum]
    );

    res.status(201).json({
      status: 201,
      message: "✅ Buyurtma muvaffaqiyatli qo'shildi",
      data: result.rows[0],
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const PUT = async (req,res) => {
  try {
    const {id} = req.params;
    const {month_count,amount,start_date,end_date} = req.body

    const checkOrder = await pool.query("select * from orders where id = $1",[id])
    if(checkOrder.rowCount == 0){
        return res.status(404).json({ message: "Bunday buyurtma topilmadi!" });
    }

    const updateOrder = await pool.query("update orders set month_count=$1,amount=$2,start_date=$3,end_date=$4 where id=$5",[month_count,amount,start_date,end_date,id])

    res.status(200).json({
      message: "order malumotlari yangilandi",
      data: updateOrder.rows[0]
    });


  } catch (error) {
    res.status(500).json({
      message: "Server xatosi",
      error: error.message
    });
  }
}

const DELETE = async (req, res) => {
  try {
    const { id } = req.params; 

    const deleteOrder = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    
    if (deleteOrder.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "buyurtmalar topilmadi!",
      });
    }

    await pool.query("DELETE FROM orders WHERE id = $1", [id]);

    res.status(200).json({
      status: 200,
      message: "Buyurtma uchirildi!",
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

export default {
  GET: customerGetById,
  POST,
  PUT,
  DELETE
};