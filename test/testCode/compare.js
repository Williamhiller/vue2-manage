
let fs = require("fs");
let location = "./static_temp/";

(async function f() {
    let list = await fs.readFileSync(location+'En.json',"utf-8");
    list = JSON.parse(list);
    let txt = '';
    list.forEach(item => {
        let home = item[0];
        let guest = item[2];
        if(parseFloat(home) > parseFloat(guest)) {
            item[0] = guest;
            item[2] = home;
        }
    });
    list.sort(function (a, b) {
        if(a[0] === b[0]) {
            if(a[1] === b[1]) {
                return parseFloat(a[2]) - parseFloat(b[2])
            }else {
                return parseFloat(a[1]) - parseFloat(b[1])
            }
        }else{
            return parseFloat(a[0]) - parseFloat(b[0])
        }
    });
    list.forEach((item) => {
        if(item[0] && Number.parseFloat(item[0]) > 2) {
            let lineString = `${parse(item[0])} ${parse(item[1])}  ${parse(item[2])} ${item[3]}\n`;
            txt += lineString;
        }
    });

    await fs.writeFileSync(location+'En.txt',txt);
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
