'use strict';

//returns structured collection of records
module.exports = function (data) {
    var collection = [];

    //looping through each entry
    data.forEach(function (element) {
        var record = {
            articleTitle: element.Article.articleTitle,
            authors: [],
            topics: [],
            methodologyTitle: element.Methodology.methodName,
            variableSetId: element.VariableSet.varSetId,
            datasets: []
        };

        //looping through authors
        element.Article.Writes.forEach(function (write) {
            record.authors.push({
                id: write.Author.authorId,
                name: write.Author.authorName
            });
        });

        //looping through topics
        element.Article.Covers.forEach(function (cover) {
            record.topics.push({
                id: cover.Topic.topicId,
                name: cover.Topic.topicName
            });
        });

        //looping through datasets and variables
        element.VariableSet.VarSetContains.forEach(function (varSet) {
            var existingDataSetIndex = getExistingDatasetIndex(record.datasets, varSet.Variable.Dataset.datId);
            if (existingDataSetIndex >= 0) {
                record.datasets[existingDataSetIndex].variables.push(varSet.Variable.varName);
            }
            else {
                var dataset = {
                    datId: varSet.Variable.Dataset.datId,
                    datasetName: varSet.Variable.Dataset.datasetName,
                    variables: [varSet.Variable.varName]
                };
                record.datasets.push(dataset);
            }
        });

        //adding formated entry to the new collection
        collection.push(record);
    });

    return collection;
};

//helper function
function getExistingDatasetIndex(datasetCollection, datasetId) {
    for (var i = 0; i < datasetCollection.length; i++) {
        if (datasetCollection[i].datId === datasetId) {
            return i;
        }
    }
    return -1;
}