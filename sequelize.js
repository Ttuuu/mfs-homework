const Sequelize = require('sequelize');

async function main(){
  const sequelize = new Sequelize('info', 'root', '123456', {
    host: 'localhost',
    dialect:'mysql',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  await sequelize.authenticate()
  const Student = sequelize.define('student', {
    // attributes
    sno: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey:true
    },
    sname: {
      type: Sequelize.CHAR(8),
      allowNull:false
    },
    ssex: {
      type: Sequelize.CHAR(2),
      allowNull:false
    },
    sbirthday: {
      type: Sequelize.DATE
    },
    class: {
      type: Sequelize.CHAR(5)
    }
  }, {
    // options
  });
  await Student.sync()

  const Teacher = sequelize.define('teacher', {
    // attributes
    tno: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey:true
    },
    tname: {
      type: Sequelize.CHAR(4),
      allowNull:false
    },
    tsex: {
      type: Sequelize.CHAR(2),
      allowNull:false
    },
    tbirthday: {
      type: Sequelize.DATE
    },
    prof: {
      type: Sequelize.CHAR(6)
    },
    depart:{
      type:Sequelize.STRING(10),
      allowNull:false
    }
  }, {
    // options
  });
  await Teacher.sync()

  const Course = sequelize.define('course', {
    // attributes
    cno: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey:true
    },
    cname: {
      type: Sequelize.STRING(10),
      allowNull:false
    },
    tno: {
      type: Sequelize.INTEGER,
      allowNull:false,
    }
  }, {
    // options
  });

  await Course.sync()

  const Score = sequelize.define('score', {
    // attributes
    sno:{
      type: Sequelize.INTEGER,
      allowNull: false
    },
    cno: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    degree: {
      type: Sequelize.DECIMAL(4,1)
    }
  }, {
    // options
  });
  await Score.sync()


  
  Course.hasOne(Teacher,{foreignKey: 'tno',sourceKey: 'tno'});
  Teacher.belongsTo(Course, {foreignKey: 'tno',targetKey: 'tno'});

  Student.hasMany(Score,{foreignKey:'sno',sourceKey:'sno'})
  Score.belongsTo(Student, {foreignKey:'sno',targetKey:'sno'})

  Course.hasMany(Score,{foreignKey:'cno',sourceKey:'cno'})
  Score.belongsTo(Course, {foreignKey:'cno',targetKey:'cno'})

  let boys=await Student.findAll({
    where:{
      ssex:'男'
    }
  })
  console.log('boys')
  console.log(boys)

  let courseAndTeacher=await Course.findAll({
    include:[Teacher],
    where:{tno:Sequelize.col('Teacher.tno')}
  })
  console.log('teachers and courses')
  console.log(courseAndTeacher)


  sequelize.query("SELECT SCORES.SNO,SNAME,CLASS,AVG(SCORES.DEGREE) FROM STUDENTS,SCORES WHERE (STUDENTS.SNO=SCORES.SNO AND STUDENTS.CLASS='95033') GROUP BY SCORES.SNO ORDER BY AVG(SCORES.DEGREE) DESC LIMIT 1").then(function(user){
    console.log(user)
  })
}
main().catch(err=>console.log(err))


