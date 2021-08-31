import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
router.post("/register", async (req, res) => {
  let avatarFile = req.files.avatar;
  let avatarFileType = req.files.avatar.name;
  avatarFileType = avatarFileType.slice(
    ((avatarFileType.lastIndexOf(".") - 1) >>> 0) + 2
  );
  let avatarFilename = new Date().getTime() + "." + avatarFileType;
  let avatarUploadPath = __dirname + "/uploads" + avatarFilename;

  avatarFile.mv(avatarUploadPath, function (err) {
    if (err) return res.status(500).send(err);
  });

  const name = req.body.name;
  const email = req.body.email;
  let password = req.body.password;
  const avatar = avatarFilename;

  // const decryptPassword = await bcrypt.compare(enteredPassword, password);

  const emailExist = await User.findOne({
    where: { email: email },
  });
  //console.log("emailExist", emailExist.users);
  if (emailExist) {
    return res.status(200).json({
      error: 1,
      message: "Email Already Exists!",
    });
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  try {
    const createUser = await User.create({
      name,
      email,
      password,
      avatar,
    });

    if (createUser) {
      return res.status(200).json({
        // _id: createUser._id,
        // name: createUser.name,
        // email: createUser.email,
        error: 0,
        message: "Successfully Registered!",
      });
    }
    return res.send(createUser);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: 1,
        message: err.errors[0].message,
      });
    }
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (user) {
    return res.status(200).json({
      error: 1,
      message: "User Found",
      data: user,
    });
  }

  return res.status(400).json({
    error: 1,
    message: "User not found",
    data: null,
  });
});

router.get("/", async (req, res) => {
  const users = await User.findAll();
  console.log(users.every((user) => user instanceof User)); // true
  console.log("All users:", JSON.stringify(users, null, 2));

  res.send(users);
});

router.put("/update/:id", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  let password = req.body.password;
  const avatar = req.body.avatar;

  const checkUser = await User.findOne({
    where: { id: req.params.id },
  });

  if (checkUser) {
    try {
      const updateUser = await checkUser.update(
        {
          name: name,
          email: email,
          password: password,
          avatar: avatar,
        },
        { where: { id: req.params.id } }
      );
      return res.status(200).json({
        error: 0,
        message: "Successfully Updated!",
        data: updateUser,
      });
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        //return res.status(400).send(err);
        return res.status(400).json({
          error: 1,
          message: err.errors[0].message,
        });
      }
    }
  }
  return res.status(400).json({
    error: 1,
    message: "User not found",
  });
});

router.delete("/delete/:id", async (req, res) => {
  const checkUser = await User.findOne({
    where: { id: req.params.id },
  });

  if (checkUser) {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      error: 0,
      message: "Successfully Deleted!",
    });
  }

  return res.status(404).json({
    error: 1,
    message: "User not found",
  });
});

export default router;
