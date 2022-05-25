const User = require('./user/index.js');
const Consum = require('./consum/index.js');
const Ebook = require('./ebook/index.js');
const Chapter = require('./chapter/index.js');
let models = {};

models["Users"] = User;
models["Consums"] = Consum;
models["Ebooks"] = Ebook;
models["Chapters"] = Chapter;
module.exports = models