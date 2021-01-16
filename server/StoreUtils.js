const redis = require("redis");

/**
 * User is a partial object of the following properties:
 * email: string
 * firstName: string
 * lastName: string
 * isVerified: boolean
 * verificationCode: string
 * createdAt: timestamp string
 * updatedAt: timestamp string
 * trustScore: number
 * associatedAccounts: string[] – string of account provider IDs
 * idVerified: boolean
 *
 */

class StoreUtils {
  constructor() {
    console.log("hello hi");
  }

  /**
   * @param {Object} newData - New user data: typeof Partial of User Document Model
   *
   * @returns {Promise<Error | Object>} returns promise with redis response
   */
  static async newUser(email, data = {}) {
    return new Promise((resolve, reject) => {
      // store user info with key_name: user:email, field: data
      // HSET: https://redis.io/commands/hset
      StoreUtils.client.HSET(
        `user`,
        email,
        JSON.stringify({
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
          ...data,
        }),
        (error, response) => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }
  /**
   * @param {Object} newData - New user data: typeof Partial of User Document Model
   *
   * @returns {Promise<Error | Object>} returns promise with redis response
   */
  static async updateUser(email, newData = {}) {
    let prevUser = {};

    const userResponse = await StoreUtils.getUser(email);
    prevUser = JSON.parse(userResponse);

    return new Promise(async (resolve, reject) => {
      // store user info with key_name: user:email, field: data
      // HSET: https://redis.io/commands/hset
      StoreUtils.client.HSET(
        `user`,
        email,
        JSON.stringify({
          ...prevUser,
          updatedAt: new Date().toString(),
          ...newData,
        }),
        (error, response) => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }
  /**
   * @param {string} email – user email
   *
   * @returns {Promise<Error | Object>} returns promise with redis response
   */
  static getUser(email) {
    return new Promise((resolve, reject) => {
      StoreUtils.client.HGET(`user`, email, (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  }

  static getAllUsers() {
    return new Promise((resolve, reject) => {
      StoreUtils.client.HGETALL(`user`, (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  }

  /**
   *
   * @param {redis.RedisClient} client
   * @param {string} email
   *
   * Check if user already exists in the redis store
   *
   * @returns {Promise<Error | Object>} returns promise with redis response
   */
  static userExists(email) {
    return new Promise((resolve, reject) => {
      StoreUtils.client.HEXISTS(`user`, email, (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  }
}

StoreUtils.client = redis.createClient(process.env.REDIS_URL);

module.exports = { StoreUtils };
