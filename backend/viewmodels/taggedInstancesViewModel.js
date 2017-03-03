'use strict';

//viewmodel of the TaggedInstances objects which will be returned to the client
module.exports = function (data) {
    var collection = [];

    data.forEach(function (element) {
        collection.push({
            instanceId: element.instanceId,
            articleId: element.articleId,
            parentObjectId: element.parentObjectId,
            objectId: element.objectId,
            tag: element.tag,
            value: element.value,
            context: element.context
        });
    });

    return collection;
};