const express = require('express');
const app = express();
const cors = require('cors'); 
const FootballData = require('./football');
require('./db');

// Rest of the server code goes here
app.use(express.json());
app.use(cors());

app.post('/add-data', async (req, res) => {
  try {

    const { Team, GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year } = req.body;
    const newData = new FootballData({
      Team,
      GamesPlayed,
      Win,
      Draw,
      Loss,
      GoalsFor,
      GoalsAgainst,
      Points,
      Year
    });
    await newData.save();
    console.log(newData)
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err.message )
  }
});

app.post('/update-data', async (req, res) => {
  try {
    const { Team, GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year } = req.body;
    const updatedData = await FootballData.findOneAndUpdate(
      { Team: { $regex: new RegExp(Team, 'i') } },
      { Team, GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year },
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({ message: 'Team not found!' });
    }
    res.json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  
});


app.post('/delete-data', async (req, res) => {
  try {
    const { Team } = req.body;
    const deletedData = await FootballData.findOneAndDelete({ Team: { $regex: new RegExp(Team, 'i') } });
    if (!deletedData) {
      return res.status(404).json({ message: 'Team not found!' });
    }
    res.json(deletedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get('/teamstats/:team', async (req, res) => {
  try {
    const Team = req.params.team;
    const stats = await FootballData.aggregate([
      { $match: { Team: { $regex: new RegExp(Team, 'i') } } },
      {
        $group: {
          _id: '$Year', // Group by Year
          totalGamesPlayed: { $sum: '$GamesPlayed' },
          totalDrawn: { $sum: '$Draw' },
          totalWon: { $sum: '$Win' }
        }
      },
      { $sort: { _id: 1 } } // Sort by Year
    ]);
    res.json(stats);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get('/get-stats-by-year/:year', async (req, res) => {
  try {
    const  Year = req.params.year
    const stats = await FootballData.aggregate([
      { $match: { Year: parseInt(Year) } },
      {
        $group: {
          _id: Year,
          totalGamesPlayed: { $sum: '$GamesPlayed' },
          totalDrawn: { $sum: '$Draw' },
          totalWon: { $sum: '$Win' },
        }
      }
    ]);
    res.json(stats[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/get-top-teams/:wins', async (req, res) => {
  try {
      const minWins = parseInt(req.params.wins);

      // Validate input
      if (isNaN(minWins)) {
          return res.status(400).json({ message: 'Invalid number of wins provided.' });
      }

      // Query to get the top 10 teams with Wins > minWins
      const teams = await FootballData.find({ Win: { $gt: minWins } })
          .limit(10) // Limit to 10 records
          .select('Team GamesPlayed Win Draw Loss GoalsFor GoalsAgainst Points Year') // Include all nine columns
          .sort({ Win: -1 }); // Optional: Sort by Wins in descending order

      // Check if any data is found
      if (!teams.length) {
          return res.status(404).json({ message: 'No teams found with Wins greater than the specified value.' });
      }

      // Respond with the data
      res.json(teams);
  } catch (err) {
      // Handle errors
      res.status(400).json({ message: err.message });
  }
});



app.get('/get-teams-by-avg-goals/:year', async (req, res) => {
  try {
    const year = parseInt(req.params.year);

    const avgGoalsResult = await FootballData.aggregate([
      { $match: { Year: year } },
      {
        $group: {
          _id: null,
          avgGoalsFor: { $avg: '$GoalsFor' },
        },
      },
    ]);

    if (!avgGoalsResult.length) {
      return res.status(404).json({ message: 'No data found for the given year.' });
    }

    const avgGoalsFor = avgGoalsResult[0].avgGoalsFor;

    const teams = await FootballData.find({
      Year: year,
      GoalsFor: { $gte: avgGoalsFor },
    }).select('Team GamesPlayed Win Draw Loss GoalsFor GoalsAgainst Points Year');

    if (!teams.length) {
      return res.status(404).json({ message: 'No teams found meeting the criteria.' });
    }

    res.json({ avgGoalsFor, teams });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




  app.listen(5000, function () {
    console.log("server is running on port 5000");
  });