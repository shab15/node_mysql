/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		USER_ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		FIRST_NAME: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		LAST_NAME: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		EMAIL: {
			type: DataTypes.STRING(75),
			allowNull: true
		},
		DATE_CREATED: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		DATE_UPDATED: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'user',
		timestamps: false
	});
};
