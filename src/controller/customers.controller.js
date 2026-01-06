import pool from "../database/config.js";

const GET = async (req, res) => {
  try {
    const cars = await pool.query("select * from Customers");
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
    const { name, age, phone, email, location, city } = req.body;

    if(phone.length !== 13){
        res.send("telefon raqami kam 13 ta raqamdan iborad bulishi kerak")
    }

    if(!email.endsWith("@gmail.com", 15)){
        res.send("@gmail.com bilan yozing")
    }

    if (!name || !age || !email || !location || !city || !phone) {
      res.status(400).json({
        status: 400,
        message: "Malumotlarni to'liq kiriting!",
      });
    } else {
      await pool.query(
        "insert into Customers(name, age, phone, email, location, city) values($1,$2,$3,$4,$5,$6)",
        [name, age, phone, email, location, city]
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
    const { name, age, phone, email, location, city } = req.body;
    const updateCar = await pool.query(
      "update Customers set name=$1,age=$2,phone=$3,email=$4,location=$5,city=$6 where id=$7",
      [name, age, phone, email, location, city, +id]
    ); 
    if (updateCar.rowCount == 0) {
      res.status(404).json({
        status: 404,
        message: "Customer not found",
      });
    }

    res.status(201).json({
        status:201,
        message:"Customer is Update"
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
        pool.query("delete from Customers where id=$1",[+id])
        res.status(200).json({
            status:200, 
            message:"the customers delete"
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
