import { Model, INTEGER, STRING } from "sequelize";
import db from '.';

class User extends Model {
    declare id: number;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: STRING,
  },
  lastName: {
    type: STRING,
  },
  email: { type: STRING, allowNull: false },
  password: { type: STRING, allowNull: false },
}, { 
  sequelize: db,
  tableName: 'users', // Nome da Tabela
  timestamps: false,
  underscored: true,
})

export default User;