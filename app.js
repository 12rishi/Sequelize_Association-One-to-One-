const express = require("express");
const { users, contacts } = require("./model/index");
const app = express();
require("./model/index");
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "home fetched successfully",
  });
});
app.post("/login", async (req, res) => {
  const {
    email,
    temporaryAddress,
    permanentAddress,
    phoneNumber,
    firstName,
    lastName,
    middleName,
    age,
  } = req.body;
  const data = await users.create({
    firstName,
    middleName,
    lastName,
    age,
  });
  if (data && data.id) {
    await contacts.create({
      temporaryAddress,
      permanentAddress,
      email,
      phoneNumber,
      userId: data.id,
    });
  }

  res.status(200).json({
    message: "data postesd successfully",
  });
});
app.get("/data", async (req, res) => {
  const data = await users.findAll({
    where: {
      id: 2,
    },
    include: [
      {
        model: contacts,
        attributes: ["email", "phoneNumber"],
      },
    ],
  });

  res.status(200).json({
    message: data,
  });
});
app.listen(3000, () => {
  console.log("server has started at port no 3000");
});
