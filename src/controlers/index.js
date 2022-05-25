const users = require('./user/index.js');
const logins = require('./login/index.js');
const refresh = require('./refreshToken/index.js');
const dashboard = require('./dashboard/index.js');
const chapter = require('./chapter/index.js');
const myBook = require('./my-books/index.js')

let controllers = {};

controllers["getUser"] = users.getUser;
controllers["createUser"] = users.createUser;
controllers["getAllUsers"] = users.getAllUsers

// Login Routes
controllers["loginsGetUser"] = logins.getUser;

// Dashboard Routes
controllers["dashboardCreateBook"] = dashboard.createEbook;
controllers["dashboardGetAllBooks"] = dashboard.getAllEbooks;
controllers["dashboardUpdateBook"] = dashboard.updateBook;
controllers["dashboardGetBooksFromId"] = dashboard.getBooksFromIdUser;
controllers["dashboardDeleteBook"] = dashboard.deleteBook;

// Chapter Routes;
controllers["chapterCreateChap"] = chapter.createChap;
controllers["chapterGetAllChaps"] = chapter.getAllChapters;
controllers["chapterGetChapsById"] = chapter.getChaptersById;
controllers["dataChapters"] = chapter.dataChapters

// RefreshToken Route
controllers["refreshToken"] = refresh.refreshToken;
controllers["isCookies"] = refresh.isCookies
controllers["removeCookies"] = refresh.removeCookies
// My-Books Route
controllers['myBooksGetUserFromId'] = myBook.getUserFromId

module.exports = controllers