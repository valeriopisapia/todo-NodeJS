var configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
        //adding the connection string by mongodb
        return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds011860.mlab.com:11860/mongo-valerio-test';
    }
}