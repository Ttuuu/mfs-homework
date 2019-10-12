const { Sequelize, sequelize }=require('./base')
const User=require('./user')

let Tagging = sequelize.define("tagging",{
  articleId:{
    type:Sequelize.NUMBER,
    allowNull:false
  },
  tagId:{
    type:Sequelize.NUMBER,
    allowNull:false
  }

})
//Tagging.sync()

module.exports=Tagging
