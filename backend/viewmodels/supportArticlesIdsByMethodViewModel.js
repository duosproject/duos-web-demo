'use strict';

//returns an array of article IDs
module.exports = function (data) {
    var methodName = '';
    var ids = [];

    //setting method name
    methodName = data[0].Methodology.methodName;

    //looping through each entry
    data.forEach(function (element) {
        //add unique article IDs
        if (ids.indexOf(element.articleId) === -1) {
            ids.push(element.articleId);
        }
    });

    return { methodName, ids };
};