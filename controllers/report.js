const Report = require("../models/Report");
const mongoose = require("mongoose");
const CustomErrors = require("../errors/customErrors");
const getReport = async (req, res) => {
  const report = await Report.find({});
  res.status(200).json({ msg: true, data: report[0] });
};

const createReport = async (req, res) => {
  const newReport = await Report.create({ visits: 0 });
  res.status(201).json({ msg: true, data: newReport });
};

const updateReport = async (req, res) => {
  const data = await Report.find({});
  let report = data[0];
  //
  report.visits = report.visits + 1;
  await report.save();
  res.status(200).json({ msg: true, data: report });
};

module.exports = { getReport, updateReport,createReport };
