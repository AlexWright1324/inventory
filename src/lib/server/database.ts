import { Sequelize } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';
import { Asset } from "./models/asset";

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: 'store/db.sqlite',
  models: [Asset],
});

try {
  await sequelize.authenticate();
  console.log('Database Connected');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

try {
  await sequelize.sync();
} catch (error) {
  console.error('Unable to sync database:', error);
}
export default sequelize

