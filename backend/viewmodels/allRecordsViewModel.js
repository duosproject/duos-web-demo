'use strict';

//returns structured collection of records
module.exports = function (data) {
    var collection = [];

    data.forEach(function (element) {
        element.VariableSet.VarSetContains.forEach(function (varSet) {
            varSet.Variables.forEach(function (variable) {
                collection.push({
                    articleTitle: element.Article.articleTitle,
                    methodologyTitle: element.Methodology.methodName,
                    datasetName: variable.Dataset.datasetName,
                    datasetId: variable.Dataset.datId,
                    variableName: variable.varName
                });
            });
        });
    });

    return collection;
};