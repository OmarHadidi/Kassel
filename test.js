const {marked} = require('marked');

const htmlcotent = marked("**Hello**, guys!![It's image](https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg)")

console.log(htmlcotent);