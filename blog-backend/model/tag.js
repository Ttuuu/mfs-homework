const { Sequelize, sequelize }=require('./base')
const User=require('./user')

let Tag = sequelize.define("tag",{
  name:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
  },
  desc:{
    type:Sequelize.STRING,
  }
})
//Tag.sync()

module.exports=Tag
