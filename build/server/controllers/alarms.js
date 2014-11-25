// Generated by CoffeeScript 1.7.1
var Alarm, User, log;

log = require('printit')({
  prefix: 'alarms'
});

User = require('../models/user');

Alarm = require('../models/alarm');

module.exports.fetch = function(req, res, next, id) {
  return Alarm.find(id, function(err, alarm) {
    if (err || !alarm) {
      return res.send({
        error: true,
        msg: "Alarm not found"
      }, 404);
    } else {
      req.alarm = alarm;
      return next();
    }
  });
};

module.exports.all = function(req, res) {
  return Alarm.all(function(err, alarms) {
    if (err) {
      return res.send({
        error: 'Server error occurred while retrieving data'
      });
    } else {
      return res.send(alarms);
    }
  });
};

module.exports.read = function(req, res) {
  return res.send(req.alarm);
};

module.exports.create = function(req, res) {
  var data;
  data = req.body;
  data.created = moment().tz('UTC').toISOString();
  data.lastModification = moment().tz('UTC').toISOString();
  return Alarm.createOrGetIfImport(data, (function(_this) {
    return function(err, alarm) {
      if (err) {
        return res.send({
          error: "Server error while creating alarm."
        }, 500);
      } else {
        return res.send(alarm, 201);
      }
    };
  })(this));
};

module.exports.update = function(req, res) {
  var data;
  data = req.body;
  data.lastModification = moment().tz('UTC').toISOString();
  return req.alarm.updateAttributes(data, (function(_this) {
    return function(err, alarm) {
      if (err != null) {
        return res.send({
          error: "Server error while saving alarm"
        }, 500);
      } else {
        return res.send(alarm, 200);
      }
    };
  })(this));
};

module.exports["delete"] = function(req, res) {
  return req.alarm.destroy(function(err) {
    if (err != null) {
      return res.send({
        error: "Server error while deleting the alarm"
      }, 500);
    } else {
      return res.send({
        success: true
      }, 200);
    }
  });
};
