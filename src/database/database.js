const Sequelize = require('sequelize')
const sequelize = new Sequelize('shuar', 'postgres', 'c1997', {
  host: 'localhost',
  dialect: 'postgres',
})
sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })

  module.exports=sequelize;