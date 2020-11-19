const {User,Cart} = require('../models/')

async function adminAuthorization(req,res,next){
    try {
      const data = await User.findOne({where:{email:req.loggedInUser.email}})
        if(data.role !== 'admin') {
            throw { name: 'NotAuthorized' }
        } else {
            next()
        } 
    } catch (error) {
        next(error)
    }
}

module.exports = {adminAuthorization}