const { request, response } = require('express');
const db = require('./config');

// generate timestamp for current time
// const getTimestamp = () => {
//     return Math.floor(Date.now() / 1000).toString()
// };

// user queries
const addUser = (request,response) => {
    let {userid, userEmail,userName,photoUrl} = request.body;
    // currently keeping time_updated same as time_created as there is no update method
    db.query('INSERT INTO users (userid, userEmail, userName, photoUrl) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING',[userid, userEmail, userName, photoUrl], (error, results) => {
        if (error) {
            response.status(400).send('ERROR 400: Bad Request!')
            throw error
        }
        response.status(201).send('SUCCESS 201: User added')
    })

};

const deleteUser = (request,response) => {
    let userid = (request.params.id);
    console.log("Delete: "+userid);
    db.query('DELETE FROM users WHERE userid=$1',[userid], (error, results) => {
        if (error) {
            response.status(400).send('ERROR 400: Bad Request!')
            throw error
        }
        response.status(200).send('SUCCESS 200: User deleted')
    })
};

// movie queries
const addMovie = (request,response) => {
    let {mid,moviename,year,posterurl} = request.body;
    db.query('INSERT INTO movies (mid,moviename,year,posterurl) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING',[mid,moviename,year,posterurl], (error, results) => {
        if (error) {
            response.status(400).send('ERROR 400: Bad Request!');
            // console.log(error);
            throw error;
        }
        response.status(201).send('SUCCESS 201: Movie added')
    })

};

const deleteMovie = (request,response) => {
    let mid = (request.params.id);
    db.query('DELETE FROM movies WHERE mid=$1',[mid], (error, results) => {
        if (error) {
            response.status(400).send('ERROR 400: Bad Request!')
            throw error
        }
        response.status(200).send('SUCCESS 200: Movie deleted')
    })
};

const addMovieToUser = (request,response) => {
    let mid = (request.params.mid);
    let userid = (request.params.userid);
    db.query('INSERT INTO user_movies (userid,mid) VALUES ($1,$2)',[userid,mid], (error, results) => {
        if (error) {
            response.status(400).send('ERROR 400: Bad Request!')
            throw error
        }
        response.status(200).send('SUCCESS 200: Movie addded to bookmark')
    })
};

const removeMovieFromUser = (request,response) => {
    let mid = (request.params.mid);
    let userid = (request.params.userid);
    db.query('DELETE FROM user_movies WHERE userid = $1 AND mid = $2',[userid,mid], (error, results) => {
        if (error) {
            response.status(400).send('ERROR 400: Bad Request!')
            throw error
        }
        response.status(200).send('SUCCESS 200: Movie removed from bookmark')
    })
};

// friends queries

const addFriendToUser = (request,response) => {
    let userid1 = (request.params.userid1);
    let userid2 = (request.params.userid2);
    db.query('INSERT INTO friends (userid,frienduid) VALUES ($1,$2)',[userid1,userid2], (error, results) => {
        if (error) {
            response.status(400).send('ERROR 400: Bad Request!')
            throw error
        }
        response.status(200).send('SUCCESS 200: Movie addded to bookmark')
    })
};

const removeFriendFromUser = (request,response) => {
    let userid1 = (request.params.userid1);
    let userid2 = (request.params.userid2);
    db.query('DELETE FROM friends WHERE userid = $1 AND frienduid = $2',[userid1,userid2], (error, results) => {
        if (error) {
            response.status(400).send('ERROR 400: Bad Request!')
            throw error
        }
        response.status(200).send('SUCCESS 200: Movie addded to bookmark')
    })
};

// display queries

const getUsers = (request, response) => {
    db.query('SELECT * FROM users ORDER BY userid ASC', (error, results) => {
      if (error) {
        response.status(400).send('ERROR 400: BAD Request!')
        throw error
      }
      response.status(200).json(results.rows)
    })
  };

const getUserMovies = (request,response) => {
    let userid = (request.params.userid);
    db.query('SELECT mid FROM user_movies WHERE userid = $1',[userid], (error,results) => {
        if (error) {
            response.status(400).send('ERROR 400: BAD Request!')
            throw error
          }
          response.status(200).json(results.rows)
    })
};

const getUserFriends = (request,response) => {
    let userid = (request.params.userid);
    db.query('SELECT frienduid FROM friends WHERE userid = $1',[userid], (error,results) => {
        if (error) {
            response.status(400).send('ERROR 400: BAD Request!')
            throw error
          }
          response.status(200).json(results.rows)
    })
};

const getMovies = (request, response) => {
    db.query('SELECT * FROM movies ORDER BY mid', (error, results) => {
        if (error) {
            response.status(400).send('ERROR 400: BAD Request!')
            throw error
        }
        response.status(200).json(results.rows)
    })
};




module.exports = {
    getUsers,
    getUserMovies,
    getMovies,
    addUser,
    deleteUser,
    addMovie,
    deleteMovie,
    addMovieToUser,
    removeMovieFromUser,
    addFriendToUser,
    removeFriendFromUser,
    getUserFriends
}