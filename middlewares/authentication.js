const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models/")

async function adminAuthentication(req, res, next) {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      throw { name: "AuthenticationFailed" }
    } else {
      data = verifyToken(access_token)
      const user = await User.findOne({ where: { email: data.email } })
      if (!user) {
        throw { name: "AuthenticationFailed" }
      } else if(user.dataValues.role !== 'admin'){
        throw { name: "AuthenticationFailed" }
      }
      else {
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

async function customerAuthentication(req,res,next){
  try {
    const { access_token } = req.headers
    if (!access_token) {
      throw { name: "AuthenticationFailed" }
    } else {
      data = verifyToken(access_token)
      const user = await User.findOne({ where: { email: data.email } })
      if (!user) {
        throw { name: "AuthenticationFailed" }
      } else if(user.dataValues.role !== 'customer'){
        throw { name: "AuthenticationFailed" }
      }else {
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

module.exports = {adminAuthentication,customerAuthentication}