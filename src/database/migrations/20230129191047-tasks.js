'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      description: { type: Sequelize.STRING },
      start_time: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      end_time: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        }
      },
      is_high_priority: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('tasks'); 
  }
};
