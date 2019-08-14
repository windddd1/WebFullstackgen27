const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const QuestionModel = require('./model');


mongoose.connect('mongodb://localhost:27017/quyetde', { useNewUrlParser: true }, (e) => {
    if (e) {
        console.log(e);
        process.exit();
    } else {
        console.log('connect to mongoDB success...');
        const app = express();
        //public folder 
        app.use(express.static('public'));
        app.use(bodyParser.json());  //middleware
        //method+address

        //get,post,put,delete
        app.get("/", (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/question.html'));

        });
        app.get("/question", (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/question.html'));
        });

        app.get("/search", (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/search.html'));
        });

        app.get("/search-question", (req, res) => {
            QuestionModel.find({ content: { $regex: req.query.searchContent, $options: 'i' } }, (error, data) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        data: data,
                    })
                }
            });
        });

        app.get("/random-question", (req, res) => {
            QuestionModel.findOneRandom(function(error, data) {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                }else {
                    res.status(201).json({
                        success : true,
                        data: {
                            ...data._doc,
                            id:data._doc._id,
                        },
                    })
                }
              });
            // QuestionModel.aggregate().sample(1).excec((error, data) => {
            //    aggregate.sample(3)
            //     if (error) {
            //         res.status(500).json({
            //             success: false,
            //             message: error.message,
            //         });
            //     } else {
            //         res.status(201).json({
            //             success: true,
            //             data: {
            //                 ...data._doc,
            //                 id: data._doc._id,
            //             },
            //         })
            //     }
            // });
        });

        app.post('/update', (req, res) => {
            QuestionModel.findByIdAndUpdate(req.body.question.id, {$set : { like: `${req.body.question.like}`, dislike: `${req.body.question.dislike}` }}, (error, data) => {
                if (error) {
                    console.log('ahaha');
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        data: {
                            ...data._doc,
                            id: data._doc._id,
                        }
                    });
                }
            });
        });

        //dirname : current working folder
        app.get('/ask', (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/ask.html'));
        });

        app.post('/create-question', (req, res) => {
            //  content
            //like && dislike
            //id

            const newQuestion = {
                content: req.body.questionContent,
            };

            QuestionModel.create(newQuestion, (error, data) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        data: {
                            ...data._doc,
                            id: data._doc._id,
                        },
                    });
                }
            });
        });

        app.get('/question/:questionId', (req, res) => {
            //params
            //res.params.questionId
            res.sendFile(path.resolve(__dirname, './public/question-detail.html'));
        });

        app.get('/get-question-by-id', (req, res) => {
            //query
            //req.query
            const questionId = req.query.questionId;
            QuestionModel.findById(questionId, (err, item) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        data: item,
                    });
                }
            })

        });


        app.listen(3000, eror => {
            if (eror) {
                console.log(eror);
            } else {
                console.log('Server listen on port 3000 ...');
            }
        });
    }
});

