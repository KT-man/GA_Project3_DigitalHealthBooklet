require("dotenv").config();

const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { v4: uuid4 } = require("uuid");
const auth = require("../middleware/auth");
const router = express.Router();
const bcrypt = require("bcrypt");

const app = express();

// ---------------- Login route
router.get("/login", async (req, res) => {
  try {
    // ---------- Login ID check
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "not authorised" });
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
      expiresIn: "20m",
      jwtid: uuid4(),
    });
    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuid4(),
    });

    const response = { access, refresh };
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "error encountered" });
  }
});

// ------------------ Registration route
router.post("/registration", async (req, res) => {
  try {
    //await User.collection.drop();
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
    res.json({ status: "ok", message: "account created" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "error encountered" });
  }
});

// --------------- Add child to existing account route
router.patch("/addChild", auth, async (req, res) => {
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
});

// --------------- Add log
router.patch("/addLog", auth, async (req, res) => {
  const addLog = await User.findOneAndUpdate(
    { username: req.decoded.username, "children.name": req.body.childrenname },
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
});

// ----------------- View log route

// ----------------- Edit log on existing log route
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
  }
});

// ----------------- Add appt
router.patch("/addAppt", auth, async (req, res) => {
  const addAppt = await User.findOneAndUpdate(
    { username: req.decoded.username, "children.name": req.body.children.name },
    {
      $push: {
        "children.$.Appointments": {
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
});

// ----------------- View appt route

// ----------------- Edit appt on existing appt route
router.patch("/editAppt", auth, async (req, res) => {});

// ----------------- Was copied in from the full stack exercise that Desmond had us doing, the below two routes may not be required. Leaving it in for now
router.get("/", async (req, res) => {
  // If admin = true, show all users
  const requestUsers = await User.find({});

  return res.json(requestUsers);
});

router.patch("/user", auth, async (req, res) => {
  const requestUser = await User.findOne({ _id: req.decoded.id });

  if (requestUser.isAdmin) {
    // Allow edits on all users
    const anyUserToChange = await User.findOne({ email: req.body.email });

    const newUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          personname: req.body.personname || anyUserToChange.personname,
          company: req.body.company || anyUserToChange.company,
          contact: {
            address:
              req.body.contact?.address || anyUserToChange.contact.address,
            phone: req.body.contact?.phone || anyUserToChange.contact.phone,
          },
        },
      },
      { new: true }
    );

    return res.json(newUser);
  }

  const selfUserToChange = await User.findOne({ email: req.body.email });

  if (selfUserToChange.email != requestUser.email) {
    console.log("error occurred");
    return res.json({
      status: "error",
      message: "can only make changes to own account",
    });
  } else {
    const newUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          personname: req.body.personname || selfUserToChange.personname,
          company: req.body.company || selfUserToChange.company,
          contact: {
            address:
              req.body.contact?.address || selfUserToChange.contact.address,
            phone: req.body.contact?.phone || selfUserToChange.contact.phone,
          },
        },
      },
      { new: true }
    );
    return res.json(newUser);
  }
});

module.exports = router;
