"use strict";
const sequelize = require("sequelize");
const DB = require("../DB");
const Reminder = DB.default.define("Reminder", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: sequelize.BIGINT,
    time: sequelize.DATE,
    sequenceStep: sequelize.INTEGER
}, {
    tableName: "Reminders",
    timestamps: false
});
exports.default = Reminder;
