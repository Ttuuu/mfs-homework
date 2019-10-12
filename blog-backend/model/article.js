const { Sequelize, sequelize }=require('./base')
const User=require('./user')
const Tag=require('./tag')
let Article = sequelize.define("article",{
  id:{
    primaryKey:true,
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false
  },
  title:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  clickTimes:{
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  content:{
    type:Sequelize.TEXT
  },
  author:{
    type:Sequelize.INTEGER,
    references:{
      model:User,
      key:'id'
    }
  }
})


module.exports=Article
