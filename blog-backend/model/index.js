const User=require('./user')
const Article=require('./article')
const Tag=require('./tag')
const Tagging=require('./tagging')
const Permission=require('./permission')
const UserPermission=require('./userpermission')
const { Sequelize, sequelize }=require('./base')

User.hasMany(Article, {
  foreignKey:'author',sourceKey:'id'
})
Article.belongsTo(User, {
  foreignKey:'author',targetKey:'id'
})


Article.belongsToMany(Tag,{through:Tagging})
Tag.belongsToMany(Article,{through:Tagging})

User.belongsToMany(Permission,{through:UserPermission})
Permission.belongsToMany(User,{through:UserPermission})

User.sync()
Article.sync()
Tag.sync()
Tagging.sync()
Permission.sync()
UserPermission.sync()

module.exports={
  User,
  Article,
  Tagging,
  Tag,
  UserPermission,
  Permission,
  Sequelize,
  sequelize
}
