const { Banner } = require('../models/')

class BannerController {
  static async addBanner(req, res, next) {
    try {
      let data = {
        title: req.body.title,
        status: req.body.status,
        image_url: req.body.image_url,
        UserId: req.loggedInUser.id
      }
      const banner = await Banner.create(data)

      res.status(201).json(banner);
    } catch (error) {
      next(error)
    }
  }

  static async showBanner(req, res, next) {
    try {
      const banner = await Banner.findAll()
      res.status(200).json(banner);
    } catch (error) {
      next(error)
    }
  }

  static async updateBanner(req, res, next) {
    try {
      let id = +req.params.id
      let dataBanner = {
        title: req.body.title,
        status: req.body.status,
        image_url: req.body.image_url,
        UserId: req.loggedInUser.id
      }
      const banner = await Banner.update(dataBanner, { where: {id}, returning: true })
      res.status(200).json(banner[1][0])

    } catch (error) {
      next(error)
    }
  }

  static async deleteBanner(req,res,next){
    try{
    let id = +req.params.id
    await Banner.destroy({where:{id}})
    res.status(200).json({message:`success delete banner with id ${id}`})
    }
    catch(err){
      next(error)
    }
  }

  static async updateStatus(req,res,next){
    try {
      const id = +req.params.id
      const data = {
        status: req.body.status
      }
      const banner = await Task.banner(
        data,
        {
          where:{id},
          returning:true
        })
      res.status(200).json(banner[1][0])
    } catch (error) {
      next(error)
    }
  }

}

module.exports = BannerController