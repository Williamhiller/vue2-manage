
let fs = require("fs");
let location = "../../static_temp/";

(async function f() {
    let list = await fs.readFileSync(location+'oddset.json',"utf-8");
    list = JSON.parse(list);
    let txt = '';
    list.forEach(item => {
        let home = item.home;
        let guest = item.guest;
        if(parseFloat(home) > parseFloat(guest)) {
            item.home = guest;
            item.guest = home;
        }
    });
    list.sort(function (a, b) {
        return parseFloat(a.home) - parseFloat(b.home)
    });
    list.forEach((item) => {
        if(item.home) {
            let lineString = `${parse(item.home)} ${parse(item.draw)}  ${parse(item.guest)} \n`;
            txt += lineString;
        }
    });

    await fs.writeFileSync(location+'oddset.txt',txt);
})();
function parse(s) {
    let sArr = s.split('.');
    let last = sArr[1];
    let first = sArr[0];
    if(parseInt(first) < 10) {
        first = "  "+first;
    }
    if(!sArr[1]) {
        last = '00';
    }else {
        if(last.length === 1) {
            last += '0';
        }
    }
    return first + '.' + last;
}
