CREATE DATABASE friendflix;


CREATE TABLE users (
    userid VARCHAR     PRIMARY KEY     NOT NULL,
    userEmail varchar(255),
    userName varchar(255),
    photoUrl varchar
);
CREATE TABLE movies (

    mid VARCHAR     PRIMARY KEY     NOT NULL,
    moviename varchar(255),
    year varchar,
    posterurl varchar
);
CREATE TABLE friends (
    userid varchar(255) NOT NULL ,
    frienduid varchar(255)
);
CREATE TABLE user_movies (
    userid VARCHAR NOT NULL,
    mid VARCHAR
);

INSERT INTO users (userid, userEmail, userName, photoUrl) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING;

INSERT INTO movies (mid,moviename,year) VALUES ('ABC','SOMEA',NULL);

Select * from users;


INSERT INTO movies
            (mid, moviename) VALUES ('XYZ','chinmay@gmail.com') ON CONFLICT DO NOTHING;