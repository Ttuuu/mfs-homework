const { Sequelize, sequelize }=require('./base')
const User=require('./user')

let UserPermission = sequelize.define("userpermission",{
  userId:{
    type:Sequelize.NUMBER,
    allowNull:false
  },
  permissionId:{
    type:Sequelize.NUMBER,
    allowNull:false
  }

})
//Tagging.sync()

module.exports=UserPermission
