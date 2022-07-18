require("dotenv").config();

const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { v4: uuid4 } = require("uuid");
const auth = require("../middleware/auth");
const router = express.Router();
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

const app = express();
const { body, validationResult } = require("express-validator");
// ---------------- Seeding Data
router.get("/seed", async (req, res) => {
  await User.deleteMany();

  await User.create(
    [
      {
        username: "Batman",
        password: await bcrypt.hash("123456abcdef", 12),
        name: "Parent1",
        postcode: "123456",
        children: [
          {
            name: "Robin",
            isMale: true,
            DOB: "1995-01-01",
            logs: [
              { height: "55", weight: "23", headCirc: "90" },
              {
                date: "2022-12-12",
                weight: "33",
                height: "505",
                headCirc: "500",
              },
            ],
            appointments: [
              {
                date: "2022-01-01",
                location: "MarinaBay",
                doctorName: "Doom",
                futureAppt: true,
                reason: "vaccination",
              },
              {
                date: "2023-01-01",
                location: "Bedok",
                doctorName: "Bless",
                futureAppt: true,
                reason: "checkup",
              },
            ],
          },
        ],
      },
      {
        username: "Spongebob",
        password: await bcrypt.hash("123456abcdef", 12),
        name: "Parent2",
        postcode: "654321",
        children: [
          {
            name: "Patrick",
            isMale: true,
            DOB: "1990-01-01",
            logs: [
              { height: "55", weight: "23", headCirc: "90" },
              {
                date: "2022-12-12",
                weight: "33",
                height: "505",
                headCirc: "500",
              },
            ],
          },
          {
            name: "Squidward",
            isMale: true,
            DOB: "1991-01-01",
            appointments: [
              {
                date: "1950-01-01",
                location: "Pasirris",
                doctorName: "Dr",
                futureAppt: false,
                reason: "money",
              },
              {
                date: "1234-01-01",
                location: "Lomo",
                doctorName: "lawyer",
                futureAppt: false,
                reason: "maker",
              },
            ],
          },
        ],
      },
      {
        username: "LousyParent",
        password: await bcrypt.hash("123456abcdef", 12),
        name: "Parent3",
        postcode: "654",
      },
    ],
    (err, data) => {
      if (err) {
        console.log("GET /seed error: " + err.message);
        res
          .status(400)
          .json({ status: "error", message: "seeding error occurred" });
      } else {
        res.json({ status: "ok", message: "seeding successful" });
      }
    }
  );
});

router.get("/", async (req, res) => {
  try {
    const viewAllData = await User.find({});
    return res.json(viewAllData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// ---------------- Login route
router.post("/login", async (req, res) => {
  try {
    // ---------- Login ID check, checking if user exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      console.log("No such user");
      return res
        .status(400)
        .json({ status: "error", message: "username or password error" });
    }

    // ---------- Password check
    const result = await bcrypt.compare(req.body.password, user.password);

    if (!result) {
      console.log("Password error!");
      return res
        .status(401)
        .json({ status: "error", message: "username or password error" });
    }

    // ----------- Sending in payload for JWT sign
    const payload = {
      id: user._id,
      username: user.username,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      // To change back to 20m
      expiresIn: "30d",
      jwtid: uuid4(),
    });
    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuid4(),
    });

    res.cookie("jwt", access, {
      secure: false,
      httpOnly: true,
      expires: dayjs().add(30, "days").toDate(),
    });

    const response = { access, refresh };
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "error encountered" });
  }
});

// ------------------ Registration route
router.put(
  "/registration",
  body("password").isStrongPassword({
    minLength: 12,
    minUppercase: 0,
    minSymbols: 0,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message:
          "Please ensure password is at least 12 characters long, with one number and one lower case character",
      });
    }

    try {
      // await User.collection.drop();
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        return res
          .status(400)
          .json({ status: "error", message: "user account already exists" });
      }
      console.log(req.body);
      const hash = await bcrypt.hash(req.body.password, 12);

      const createdUser = await User.create({
        username: req.body.username,
        password: hash,
        name: req.body.name,
        postcode: req.body.postcode,
      });
      console.log(`user created : ${createdUser} `);
      res.json({
        status: "ok",
        message: `account ${createdUser.username} created`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: "error", message: "error encountered" });
    }
  }
);

// --------------- Add child to existing account route
router.patch("/addChild", auth, async (req, res) => {
  // Check if child already exists
  try {
    const child = await User.findOne({ "children.name": req.body.name });
    if (child) {
      return res
        .status(400)
        .json({ status: "error!", message: "child already exists" });
    }

    const parent = await User.findOneAndUpdate(
      { username: req.decoded.username },
      {
        $push: {
          children: {
            name: req.body.name,
            isMale: req.body.isMale,
            DOB: req.body.DOB,
          },
        },
      },
      { new: true }
    );
    return res.json(parent);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// --------------- View all children
router.get("/children", auth, async (req, res) => {
  // Check if there are any children first
  try {
    console.log(req.decoded.username);

    const childExists = await User.find({
      username: req.decoded.username,
      "children.0": { $exists: true },
      // MongoDB dot notation. This checks for whether the zero-th (first) element in array children exists
      // https://www.mongodb.com/docs/manual/core/document/#dot-notation
    });

    if (childExists.length === 0) {
      return res
        .status(400)
        .json({ status: "error!", message: "no children found!" });
    }

    const children = await User.find(
      { username: req.decoded.username },
      { children: 1 }
    );
    return res.json(children);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// --------------- Add log
router.patch("/addLog", auth, async (req, res) => {
  try {
    const addLog = await User.findOneAndUpdate(
      {
        username: req.decoded.username,
        "children.name": req.body.childrenname,
      },
      {
        $push: {
          "children.$.logs": {
            date: req.body.date,
            height: req.body.height,
            weight: req.body.weight,
            headCirc: req.body.headCirc,
          },
        },
      },
      { new: true }
    );
    return res.json(addLog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// ----------------- View all logs route
// -------- Returns only the logs belonging to the child queried for
router.post("/viewLog", auth, async (req, res) => {
  try {
    const viewLog = await User.findOne(
      {
        username: req.decoded.username,
        children: { $elemMatch: { _id: req.body.childId } },
      },
      {
        "children.logs.$": 1,
      }
    );
    return res.json(viewLog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// ----------------- Edit log on existing log route
// -----------// For reading pleasure: Stack overflow on how to update nested nested arrays https://stackoverflow.com/questions/54055702/how-can-i-update-a-multi-level-nested-array-in-mongodb
router.patch("/editLog", auth, async (req, res) => {
  try {
    const editLog = await User.findOneAndUpdate(
      {
        username: req.decoded.username,
        "children.logs": { $elemMatch: { _id: req.body.childLogId } },
      },
      {
        $set: {
          "children.$[].logs.$[j].date": req.body.date,
          "children.$[].logs.$[j].height": req.body.height,
          "children.$[].logs.$[j].weight": req.body.weight,
          "children.$[].logs.$[j].headCirc": req.body.headCirc,
        },
      },
      { arrayFilters: [{ "j._id": req.body.childLogId }] }
    );
    return res.json(editLog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// ----------------- Delete Log
router.delete("/deleteLog", auth, async (req, res) => {
  try {
    const userLog = await User.findOne({
      username: req.decoded.username,
      "children.logs": { $elemMatch: { _id: req.body.childLogId } },
    });

    console.log(userLog);

    if (!userLog) {
      return res.status(400).json({
        status: "Error!",
        message: "Please ensure there are existing logs to delete",
      });
    }

    const deleteLog = await User.findOneAndUpdate(
      {
        username: req.decoded.username,
        "children.logs": { $elemMatch: { _id: req.body.childLogId } },
      },
      {
        $pull: {
          "children.$.logs": { _id: req.body.childLogId },
        },
      }
    );
    res.json(deleteLog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// ----------------- Add appt
router.patch("/addAppt", auth, async (req, res) => {
  try {
    const addAppt = await User.findOneAndUpdate(
      {
        username: req.decoded.username,
        "children.name": req.body.childrenname,
      },
      {
        $push: {
          "children.$.appointments": {
            date: req.body.date,
            location: req.body.location,
            doctorName: req.body.doctorName,
            futureAppt: req.body.futureAppt,
            reason: req.body.reason,
          },
        },
      },
      { new: true }
    );
    return res.json(addAppt);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// ----------------- View appt route
router.post("/viewAppt", auth, async (req, res) => {
  try {
    const viewAppt = await User.findOne(
      {
        username: req.decoded.username,
        children: { $elemMatch: { _id: req.body.childId } },
      },
      {
        "children.appointments.$": 1,
      }
    );
    return res.json(viewAppt);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// ----------------- Edit appt on existing appt route

router.patch("/editAppt", auth, async (req, res) => {
  try {
    const editAppt = await User.findOneAndUpdate(
      {
        username: req.decoded.username,
        "children.appointments": { $elemMatch: { _id: req.body.childApptId } },
      },
      {
        $set: {
          "children.$[].appointments.$[j].date": req.body.date,
          "children.$[].appointments.$[j].location": req.body.location,
          "children.$[].appointments.$[j].doctorName": req.body.doctorName,
          "children.$[].appointments.$[j].futureAppt": req.body.futureAppt,
          "children.$[].appointments.$[j].reason": req.body.reason,
        },
      },
      { arrayFilters: [{ "j._id": req.body.childApptId }] }
    );
    return res.json(editAppt);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// ----------------- Delete Appt route
router.delete("/deleteAppt", auth, async (req, res) => {
  try {
    const userAppt = await User.findOne({
      username: req.decoded.username,
      "children.appointments": { $elemMatch: { _id: req.body.childApptId } },
    });

    if (!userAppt) {
      return res.status(400).json({
        status: "Error!",
        message: "Please ensure there are existing appts to delete",
      });
    }

    const deleteAppt = await User.findOneAndUpdate(
      {
        username: req.decoded.username,
        "children.appointments": { $elemMatch: { _id: req.body.childApptId } },
      },
      {
        $pull: {
          "children.$.appointments": { _id: req.body.childApptId },
        },
      }
    );
    res.json(deleteAppt);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// ----------------- May not need below
// ----------------
// ----------------
// ----------------
// ----------------
// ----------------
// ----------------- Was copied in from the full stack exercise that Desmond had us doing, the below two routes may not be required. Leaving it in for now
// router.get("/users", auth, async (req, res) => {
//   // If admin = true, show all users
//   const requestUser = await User.findOne({ _id: req.decoded.id });

//   if (requestUser.isAdmin) {
//     const users = await User.find();
//     return res.json(users);
//   } else {
//     // If admin = false, show only users from same company
//     const companyUsers = await User.find({ company: requestUser.company });
//     return res.json(companyUsers);
//   }
// });

// router.patch("/user", auth, async (req, res) => {
//   const requestUser = await User.findOne({ _id: req.decoded.id });

//   if (requestUser.isAdmin) {
//     // Allow edits on all users
//     const anyUserToChange = await User.findOne({ email: req.body.email });

//     const newUser = await User.findOneAndUpdate(
//       { email: req.body.email },
//       {
//         $set: {
//           personname: req.body.personname || anyUserToChange.personname,
//           company: req.body.company || anyUserToChange.company,
//           contact: {
//             address:
//               req.body.contact?.address || anyUserToChange.contact.address,
//             phone: req.body.contact?.phone || anyUserToChange.contact.phone,
//           },
//         },
//       },
//       { new: true }
//     );

//     return res.json(newUser);
//   }

//   const selfUserToChange = await User.findOne({ email: req.body.email });

//   if (selfUserToChange.email != requestUser.email) {
//     console.log("error occurred");
//     return res.json({
//       status: "error",
//       message: "can only make changes to own account",
//     });
//   } else {
//     const newUser = await User.findOneAndUpdate(
//       { email: req.body.email },
//       {
//         $set: {
//           personname: req.body.personname || selfUserToChange.personname,
//           company: req.body.company || selfUserToChange.company,
//           contact: {
//             address:
//               req.body.contact?.address || selfUserToChange.contact.address,
//             phone: req.body.contact?.phone || selfUserToChange.contact.phone,
//           },
//         },
//       },
//       { new: true }
//     );
//     return res.json(newUser);
//   }
// });

module.exports = router;
