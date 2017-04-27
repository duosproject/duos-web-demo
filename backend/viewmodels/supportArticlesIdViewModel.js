'use strict';

//returns an array of article IDs
module.exports = function (data) {
    var collection = [];

    //looping through each entry
    data.forEach(function (element) {
        //add unique article IDs
        if (collection.indexOf(element.articleId) === -1) {
            collection.push(element.articleId);
        }
    });

    return collection;
};