const { Sequelize, sequelize }=require('./base')
const User=require('./user')

let Permission = sequelize.define("permission",{
  id:{
    primaryKey:true,
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false
  },
  name:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  path:{
    type:Sequelize.STRING,
    
  },
  method:{
    type:Sequelize.STRING,
  }
})
//Tag.sync()

module.exports=Permission
