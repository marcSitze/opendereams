const configu =  require( '@xelgrp/configu');

const mongoose = require('mongoose');

const config = configu.loadConfig('app.ini', {});

const ConnectDB = () => {
  try {
    mongoose.connect(config.mongodb.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      user: config.mongodb.user,
      pass: config.mongodb.pass,
      dbName: config.mongodb.dbName,
    })
      .then(() => console.log('Mongodb connected...'))
      .catch(err => console.log(err));
  } catch (err) {
    console.error(err);
  }
};

module.exports = ConnectDB
