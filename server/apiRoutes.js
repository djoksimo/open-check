const { Router } = require("express");
const { StoreUtils } = require("./StoreUtils");

const router = Router();

// checks whether user is legit and returns
// since this is a hackathon project, simply assume the user is logged in for now.
router.post("/check", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Invalid request" });
  }

  let user = {};

  try {
    const userResponse = await StoreUtils.getUser(email);
    user = JSON.parse(userResponse);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to get user",
      code: "UserNotFound",
    });
  }

  res.status(200).json({
    message: "Retrieved open-check data about user",
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      trustScore: user.trustScore,
      idVerified: user.idVerified,
    },
  });
});

module.exports = { apiRoutes: router };
