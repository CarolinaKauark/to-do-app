import { DATEONLY } from 'sequelize';
import { Model, INTEGER, STRING, DATE, BOOLEAN } from 'sequelize';
import db from '.';
import User from './User';

class Task extends Model {
  declare id: number;
  declare description: string;
  declare startTime: string;
  declare endTime: string;
  declare date: string;
  declare userId: number;
  declare isHighPriority: boolean;
  declare inProgress: boolean;
}

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
  date: {
    type: STRING,
    allowNull: false,
  },
  userId: {
    type: INTEGER,
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
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });


export default Task;
