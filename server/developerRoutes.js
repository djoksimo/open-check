const { Router } = require("express");
const { StoreUtils } = require("./StoreUtils");

const router = Router();

// get all users about registered accounts
router.get("/users", async (_req, res) => {
  let users = [];
  try {
    const usersResponse = await StoreUtils.getAllUsers();

    console.log(usersResponse);

    users = Object.keys(usersResponse).map((userEmail) => {
      const userStr = usersResponse[userEmail];
      const user = JSON.parse(userStr);

      const userData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        trustScore: user.trustScore,
        idVerified: user.idVerified,
        associatedAccounts: user.associatedAccounts,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return userData;
    });
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong",
      users,
      error: error.toString(),
    });
  }

  return res.status(200).json({
    message: "Retrieved all users",
    users,
  });
});

module.exports = { developerRoutes: router };
