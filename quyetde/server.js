const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

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

app.get("/random-question", (req, res) => {
    fs.readFile('data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        } else {
            const questions = JSON.parse(data);
            const questionRandom = questions[Math.floor(Math.random() * questions.length)];
            if (questionRandom) {
                res.status(201).json({
                    success: true,
                    data: questionRandom,
                });
            }
        }
    });
});

app.post('/update', (req, res) => {
    fs.readFile('data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        } else {
            const questions = JSON.parse(data);
            questions.forEach(item => {
                if (item.id == req.body.question.id) {
                    item.like = req.body.question.like;
                    item.dislike = req.body.question.dislike;
                    fs.writeFile('data.json', JSON.stringify(questions), (err) => {
                        if (err) {
                            res.status(500).json({
                                success: false,
                                message: err.message,
                            });
                        } else {
                            res.status(201).json({
                                success: true,
                                data: item,
                            });
                        }
                    });
                };
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
        like: 0,
        dislike: 0,
        id: new Date().getTime(),
    };

    //readfile
    fs.readFile('data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
            //400 loi phia nguoi dung-200 thanh cong - 500 loi phia server
        } else {
            //push newQuestion
            const questions = JSON.parse(data);
            questions.push(newQuestion);
            //writefile
            fs.writeFile('data.json', JSON.stringify(questions), (err) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        data: newQuestion,
                    });
                }
            });
        }
    })
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

    //readfile
    fs.readFile('data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        } else {
            const questions = JSON.parse(data);
            questions.forEach(item => {
                if (item.id == questionId) {
                    res.status(201).json({
                        success: true,
                        data: item,
                    });
                }
            });
        }
    });
});


app.listen(3000, eror => {
    if (eror) {
        console.log(eror);
    } else {
        console.log('Server listen on port 3000 ...');
    }
});