import pool from "../database/config.js";

const GET = async (req, res) => {
  try {
    const cars = await pool.query("select * from Cars");
    res.status(200).json({
      status: 200,
      data: cars.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

const POST = async (req, res) => {
  try {
    const { name, model, price, color, year } = req.body;

    if (!name || !model || !price || !color || !year) {
      res.status(400).json({
        status: 400,
        message: "Malumotlarni to'liq kiriting!",
      });
    } else {
      await pool.query(
        "insert into Cars(name,model,price,color,year) values($1,$2,$3,$4,$5)",
        [name, model, price, color, year]
      );

      res.status(201).json({
        status: 201,
        message: "✅Malumot qo'shildi",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const PUT = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, model, price, color, year } = req.body;
    const updateCar = await pool.query(
      "update Cars set name=$1,model=$2,price=$3,color=$4,year=$5 where id=$6",
      [name, model, price, color, year, +id]
    );
    if (updateCar.rowCount == 0) {
      res.status(404).json({
        status: 404,
        message: "Cars not found",
      });
    }

    res.status(201).json({
        status:201,
        message:"Car Update"
    })
  } catch (error) {
   res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const DELETE = async (req,res) => {
    try {
        const {id} = req.params
        pool.query("delete from Cars where id=$1",[+id])
        res.status(200).json({
            status:200,
            message:"the car is delete"
        })
    } catch (error) {
         res.status(500).json({
      message: "Server error",
      error: error.message,
    });
    }
}

export default {
  GET,
  POST,
  PUT,
  DELETE
};
