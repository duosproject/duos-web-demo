'use strict';

//returns structured collection of records
module.exports = function (data) {
    var collection = [];

    data.forEach(function (element) {
        var record = {
            articleTitle: element.Article.articleTitle,
            methodologyTitle: element.Methodology.methodName,
            variableSetId: element.VariableSet.varSetId,
            datasets: []
        };

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

        collection.push(record);
    });

    return collection;
};

function getExistingDatasetIndex(datasetCollection, datasetId) {
    for (var i = 0; i < datasetCollection.length; i++) {
        if (datasetCollection[i].datId === datasetId) {
            return i;
        }
    }
    return -1;
}