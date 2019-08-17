const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const GameModel = require('./model');

mongoose.connect('mongodb://localhost:27017/broadgame', { useNewUrlParser: true }, (e) => {
	if (e) {
		console.log(e);
		process.exit();
	} else {
		console.log('Connect to mongodb sucess ...');

		// start app
		const app = express();

		// public folder
		app.use(express.static('public'));
		app.use(bodyParser.json());

		// method + address
		// get/post/put/delete
		app.get('/', (req, res) => {
			// index.html
			res.sendFile(path.resolve(__dirname, './public/index.html'));
		});


		app.post('/create-broad', (req, res) => {
			// content
			// like
			// dislike
			// id
			const newGame = {
				//content: req.body.questionContent,
				player1: {
					name: req.body.namePlayer1,
				},
				player2: {
					name: req.body.namePlayer2,
				},
				player3: {
					name: req.body.namePlayer3,
				},
				player4: {
					name: req.body.namePlayer4,
				},
			};

			GameModel.create(newGame, (error, data) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message
					});
				} else {
					res.status(201).json({
						success: true,
						data: {
							...data._doc,
						},
					});
				}
			});


		});
		app.put('/update', (req, res) => {
			GameModel.findByIdAndUpdate(req.body.game.id, { $set: { 'player1.score': `${req.body.game.player1.score}`, 'player1.score': `${req.body.game.player2.score}`, 'player1.score': `${req.body.game.player3.score}`, 'player1.score': `${req.body.game.player4.score}` } },(error,data)=>{
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
                        }
                    });
                }
			});
		});

		app.get('/questions/:gameId', (req, res) => {
			res.sendFile(path.resolve(__dirname, './public/broad.html'));
		});

		app.get('/get-broad-by-id', (req, res) => {
			QuestionModel.findById(req.query.gameId, (error, data) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else {
					if (!data) {
						res.status(404).json({
							success: false,
							message: 'Question not found',
						});
					} else {
						res.status(200).json({
							success: true,
							data: data,
						});
					}
				}
			});


		});






		

		app.listen(3000, error => {
			if (error) {
				console.log(error);
			} else {
				console.log('Server listen on port 3000 ...');
			}
		});
	}
});