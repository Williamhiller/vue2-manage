
const path = require('path')
const fs = require('fs')

const mkdirsSync = function(dirname) {
    if(fs.existsSync(dirname)) {
        return true;
    }
    if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
    }
}


module.exports = (app) => {
  app.use( (req, res, next) => {

    next()
  })

}
