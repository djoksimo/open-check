const { Router } = require("express");
const { StoreUtils } = require("./StoreUtils");
const { createTransport } = require("./mailer");

const router = Router();

const mailer = createTransport();

router.post("/register", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  if (!email || !password || !firstName || !lastName || !password) {
    return res.status(400).json({ message: "Incorrect Submission" });
  }

  try {
    const existsRepsonse = await StoreUtils.userExists(email);

    if (existsRepsonse === 1) {
      return res.status(409).json({
        message: "User already exists",
        code: "UserAlreadyExists",
      });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const verificationLink = encodeURI(
      `localhost:3000/verify/?code=${verificationCode}&email=${email}`
    );

    const info = await mailer.sendMail({
      from: '"OpenCheck No-Reply 👻" <no-reply@open-check.com>', // sender address
      to: [
        {
          name: `${firstName} ${lastName}`,
          address: email,
        },
      ], // list of receivers
      subject: `Verify your OpenCheck Account 🔒, ${firstName}`, // Subject line
      text: `
        Please open this link to verify your OpenCheck account:
${verificationLink}
      `, // plain text body
      html: `
        <h3>Please open this link to verify your OpenCheck account:</h3>
        <a href=${verificationLink}>${verificationLink}</a>
      `, // html body
    });

    await StoreUtils.newUser(email, {
      email,
      firstName,
      lastName,
      password,
      verificationCode,
      isVerified: false,
    });
    //   todo bonus: salt/encrypt password
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.toString() });
  }

  //   send email with randomly generated number
  //   store email/password
  //   store verification code associated with email

  return res.status(201).json({
    message: "Temp user registered, verification email sent",
  });
});

// user verifies their open-check account when
router.post("/verify/code", async (req, res) => {
  const { email, code } = req.query;

  if (!code || !email) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const userResponse = await StoreUtils.getUser(email);
    const user = JSON.parse(userResponse);

    if (!user || (user && user.verificationCode !== code)) {
      return res.status(403).json({
        code: "NotAuthorized",
        message: "Wrong verification code",
      });
    }

    await StoreUtils.updateUser(email, true, {
      isVerified: true,
    });

    return res.status(200).json({
      message: "Received verification code matched verification code",
      code: "UserVerified",
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      code: "UnknownError",
      error: error.toString(),
    });
  }
});

// return user info
router.get("/", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Invalid request, missing email" });
  }

  let user = {};

  try {
    const userResponse = await StoreUtils.getUser(email);

    user = JSON.parse(userResponse);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching account" });
  }

  return res.status(200).json({
    message: "Retrieved user data",
    data: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isVerified: user.isVerified,
      associatedAccounts: user.associatedAccounts,
      trustScore: user.trustScore,
    },
  });
});

module.exports = { userRoutes: router };
