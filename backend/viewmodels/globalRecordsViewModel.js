'use strict';

//returns structured collection of records
module.exports = function (data) {
    var collection = [];

    //looping through each entry
    data.forEach(function (element) {

        var article;

        //add new article or find existing
        var existingArticleIndex = getExistingArticleIndex(collection, element.Article.articleId);
        if (existingArticleIndex >= 0) {
            article = collection[existingArticleIndex];
        }
        else {
            article = {
                articleId: element.Article.articleId,
                articleTitle: element.Article.articleTitle.trim(),
                authors: [],
                topics: [],
                methodologies: []
            };
            collection.push(article);

            //looping through authors
            element.Article.Writes.forEach(function (write) {
                article.authors.push({
                    authorId: write.Author.authorId,
                    authorName: write.Author.authorName.trim()
                });
            });

            //looping through topics
            element.Article.Covers.forEach(function (cover) {
                article.topics.push({
                    topicId: cover.Topic.topicId,
                    topicName: cover.Topic.topicName.trim()
                });
            });
        }

        var methodology;

        //add new methodology to the article or find existing
        var existingMethodologyIndex = getExistingMethodologyIndex(article.methodologies, element.Methodology.methodId);
        if (existingMethodologyIndex >= 0) {
            methodology = article.methodologies[existingMethodologyIndex];
        }
        else {
            methodology = {
                methodId: element.Methodology.methodId,
                methodName: element.Methodology.methodName.trim(),
                datasets: []
            };
            article.methodologies.push(methodology);
        }

        //looping through datasets and variables
        element.VariableSet.VarSetContains.forEach(function (varSet) {
            //add new dataset to the methodology or find existing
            var existingDataSetIndex = getExistingDatasetIndex(methodology.datasets, varSet.Variable.Dataset.datId);
            if (existingDataSetIndex === -1) {
                methodology.datasets.push({
                    datasetId: varSet.Variable.Dataset.datId,
                    datasetName: varSet.Variable.Dataset.datasetName.trim()
                });
            }
        });
    });

    return collection;
};

//helper functions
function getExistingArticleIndex(articleCollection, articleId) {
    for (var i = 0; i < articleCollection.length; i++) {
        if (articleCollection[i].articleId === articleId) {
            return i;
        }
    }
    return -1;
}

function getExistingMethodologyIndex(methodologiesCollection, methodId) {
    for (var i = 0; i < methodologiesCollection.length; i++) {
        if (methodologiesCollection[i].methodId === methodId) {
            return i;
        }
    }
    return -1;
}

function getExistingDatasetIndex(datasetCollection, datasetId) {
    for (var i = 0; i < datasetCollection.length; i++) {
        if (datasetCollection[i].datasetId === datasetId) {
            return i;
        }
    }
    return -1;
}