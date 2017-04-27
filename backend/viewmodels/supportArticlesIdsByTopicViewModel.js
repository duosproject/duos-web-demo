'use strict';

//returns an array of article IDs
module.exports = function (data) {
    var topicName = '';
    var ids = [];

    //setting method name
    topicName = data[0].Topic.topicName;

    //looping through each entry
    data.forEach(function (element) {
        //add unique article IDs
        if (ids.indexOf(element.articleId) === -1) {
            ids.push(element.articleId);
        }
    });

    return { topicName, ids };
};