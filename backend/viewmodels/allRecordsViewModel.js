'use strict';

//returns structured collection of records
module.exports = function (data) {
    var collection = [];

    data.forEach(function (element) {
        var record = {
            articleTitle: element.Article.articleTitle,
            methodologyTitle: element.Methodology.methodName,
            variableSetId: element.VariableSet.varSetId,
            variables: []
        };

        element.VariableSet.VarSetContains.forEach(function (varSet) {
            record.datasetName = varSet.Variable.Dataset.datasetName;
            record.datasetId = varSet.Variable.Dataset.datId;
            record.variables.push(varSet.Variable.varName);
        });

        collection.push(record);
    });

    return collection;
};