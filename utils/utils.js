
module.exports = {date:function now_date() {
    const now = new Date();
const date = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
return date;
}};