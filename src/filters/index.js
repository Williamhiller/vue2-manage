import Vue from 'vue'

const moment = require('moment');
Vue.filter('dateFormat', function (value) {
    let date = '';
    if(value) {
        date = moment(new Date(value)).format("YYYY-MM-DD")
    }
    return date
})
