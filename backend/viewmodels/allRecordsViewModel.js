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
            varSet.Variables.forEach(function (variable) {
                record.datasetName = variable.Dataset.datasetName;
                record.datasetId = variable.Dataset.datId;
                record.variables.push(variable.varName);
            });
        });

        collection.push(record);
    });

    return collection;
};