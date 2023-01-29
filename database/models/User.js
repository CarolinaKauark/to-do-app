import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Task from './Task'
class User extends Model {}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: STRING,
    allowNull: false,
    field: 'first_name',
  },
  lastName: {
    type: STRING,
    allowNull: false,
    field: 'last_name',
  },
  email: { type: STRING, allowNull: false },
  password: { type: STRING, allowNull: false },
}, {
  sequelize: db,
  tableName: 'users', // Nome da Tabela
  timestamps: false,
  underscored: true,
});

User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });

export default User;
