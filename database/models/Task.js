import { Model, INTEGER, STRING, DATE, BOOLEAN } from 'sequelize';
import db from '.';
import User from './User';
class Task extends Model {}

Task.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  description: { type: STRING, allowNull: false },
  startTime: {
    type: STRING,
    allowNull: false,
    field: 'start_time',
  },
  endTime: {
    type: STRING,
    allowNull: false,
    field: 'end_time',
  },
  date: { type: DATE, allowNull: false },
  userId: {
    type: INTEGER,
    foreignKey: true,
    field: 'user_id'
  },
  isHighPriority: { 
    type: BOOLEAN,
    defaultValue: false,
    field: 'is_high_priority'
  },
  inProgress: { 
    type: BOOLEAN,
    defaultValue: true,
    field: 'in_progress'
  },
}, {
  sequelize: db,
  tableName: 'tasks',
  timestamps: false,
  underscored: true,
});

Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Task;
