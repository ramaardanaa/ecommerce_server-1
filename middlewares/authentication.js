const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models/")

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      throw { name: "AuthenticationFailed" }
    } else {
      data = verifyToken(access_token)
      const user = await User.findOne({ where: { email: data.email } })
      if (!user) {
        throw { name: "AuthenticationFailed" }
      } else {
        req.loggedInUser = {
          id: data.id,
          email: data.email,
          role: data.role
        }
        next()
      }

    }
  } catch (error) {
    next(error)
  }

}

module.exports = authentication