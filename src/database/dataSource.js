import Sequelize from 'sequelize'
import { environment } from '../environment'

export const sequelize = new Sequelize(environment.database.name, environment.database.user, environment.database.password, {
  host: environment.database.host,
  port: environment.database.port,
  dialect: 'postgres',
  logging: environment.logLevel === 'silly' ? console.log : false,
})

export const dataSource = {}

Object.keys(dataSource).forEach((key) => {
  if ('associate' in dataSource[key]) {
    dataSource[key].associate(dataSource)
  }
})

// ========================================================================== //
// Utils
export const wrapTransaction = async (func) => {
  const transaction = await sequelize.transaction()
  try {
    await func(transaction)
    await transaction.commit()
    return Promise.resolve()
  } catch (error) {
    if (transaction) {
      await transaction.rollback()
    }
    return Promise.reject(error)
  }
}
