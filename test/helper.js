import { sequelize } from '../src/database/dataSource'

const initDb = async () => {
  await sequelize.authenticate()
  await sequelize.sync({
    force: true,
    logging: false,
  })
}

const setupDb = async (mocks) => {
  for (const mock of mocks) {
    await mock.model.bulkCreate(mock.entities)
    if (mock.sequence) {
      sequelize.query(`ALTER SEQUENCE "${mock.sequence}" RESTART WITH ${1 + mock.entities.length};`)
    }
  }
}

const clearDb = async () => {
  await sequelize.drop({ logging: false, cascade: true })
}

export { initDb, setupDb, clearDb }
