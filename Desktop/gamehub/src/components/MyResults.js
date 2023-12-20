import React, { useEffect, useState } from "react";
import { GamesList } from "./GamesList";
import GAME_DATA from '../data/games-list.json'
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, set as firebaseSet, onValue, push as firebasePush } from "firebase/database";
import { render } from "@testing-library/react";

import { Link, Navigate } from "react-router-dom";

import { FriendQuizResults } from "./FriendQuizResults";

import { Route, Routes } from "react-router-dom";


export function PersonalResults(props) {
    const gameData = GAME_DATA;
    const quizResults = props.filterCriteria;
    const currentUser = props.currentUser;
    const matchedUsers = props.matchedUsers;
    const setMatchedUsers = props.setMatchedUsers;

    const [renderGames, setRenderGames] = useState([]);

    const [updatedQuizResult, setUpdatedQuizResult] = useState([]);

    const [mostRecentGameArray, setMostRecentGameArray] = useState([]);

    // console.log("DEBUG: renderGames", renderGames);

    const filterData = gameData.filter((gameObject) => {
        // Looks for any matches within genre
        const genreMatches = gameObject.genre.filter(genre => quizResults.genre.includes(genre))
        // Looks for any matches within players
        const playersMatches = quizResults.players.includes(gameObject.players)
        // Looks for any matches within platform
        const platformMatches = gameObject.platform.filter(platform => quizResults.platform.includes(platform))
        // Tests if theres matches greater than 0, if so then passed into filter data
        return genreMatches.length > 0 || playersMatches || platformMatches.length > 0;
    });

    const saveFilterData = (data) => {
        const db = getDatabase();
        console.log("data ", data);
        const userQuizResultsRef = ref(db, `allUsers/${currentUser.uid}/favoriteGames`);
        firebasePush(userQuizResultsRef, data)
            .then(() => {
                console.log("Data saved successfully");
            })
            .catch((error) => {
                console.error("Error saving data:", error);
            });
    }

    useEffect(() => {
        const db = getDatabase();
        const allUsersRef = ref(db, 'allUsers');
        onValue(allUsersRef, (snapshot) => {
            const allUsersData = snapshot.val();
            const filteredUsers = Object.entries(allUsersData)
                .filter(([userId, userData]) => {
                    return userId !== currentUser.uid && userData.favoriteGames;
                })
                .map(([userId, userData]) => {

                    return {
                        userId,
                        displayName: Object.values(userData)[0],
                        quizResults: userData.favoriteGames,
                    };
                });
            console.log("filteredUsers: ", filteredUsers);

            const matchingUsers = filteredUsers.filter((user) => {
                const quizResults = user.quizResults;
                // grabs the latest quiz result from the users
                const latestQuizResult = quizResults[Object.keys(quizResults)[Object.keys(quizResults).length - 1]]

                setUpdatedQuizResult(latestQuizResult);

                const matchedGames = latestQuizResult.filter(games => {
                    const renderingGames = renderGames.filter(mygames => {
                        return JSON.stringify(mygames) === JSON.stringify(games)
                    })
                    return renderingGames.length > 0
                })
                // ("matchedGames: ", matchedGames);
                return matchedGames.length > 0
            });

            // console.log("quizResults: ", quizResults);
            console.log("matchingUsers: ", matchingUsers);

            setMatchedUsers(matchingUsers);

            for (var i = 0, l = filteredUsers.length; i < l; i++) {
                const userResults = filteredUsers[i].quizResults;
                const mostRecentGameArray = Object.values(userResults)[Object.keys(userResults).length - 1];
                filteredUsers[i].mostRecentGameArray = mostRecentGameArray;
            }


        })
    }, [currentUser.uid, renderGames]);

    // console.log("matchedUsers: ", matchedUsers)

    useEffect(() => {
        saveFilterData(filterData);

        const db = getDatabase();
        const userQuizResultsRef = ref(db, `allUsers/${currentUser.uid}/favoriteGames`);
        onValue(userQuizResultsRef, function (snapshot) {
            const gamesData = snapshot.val();
            // console.log("gamesData: ", gamesData);
            const objKeys = Object.keys(gamesData);
            const objArray = objKeys.map((keyString) => {
                return gamesData[keyString];
            })
            // console.log(objArray[objArray.length - 1], "finalized game data");
            setRenderGames(objArray[objArray.length - 1]);
        })
    }, [])



    // console.log("RENDER: ", renderGames);

    let content = null;
    if (renderGames !== null) {
        content = <GamesList games={renderGames} />;
    }

    const handleSignOut = (event) => {
        signOut(getAuth());
    }

    let matchedUsersContent = null;
    if (matchedUsers.length > 0) {
        matchedUsersContent = (
            <div className="row m-3">
                <h3 className="h4">Matched gamers:</h3>
                {matchedUsers.map((user) => (
                    <div className="d-flex col-auto">
                        <div className="card mb-4 color-card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-auto col-xl-12">
                                        <img
                                            className="prof-pic img-fluid"
                                            src="../img/profile-pic.png"
                                            alt="gamer profile icon"
                                        />
                                    </div>
                                    <div className="col-sm">
                                        <h2 className="card-title">{user.displayName+""}</h2>
                                        <Link
                                            to={"/quiz-results/"+user.userId}
                                            className="btn friend-actions m-1"
                                            aria-label={user.displayName+"'s quiz results"}
                                            element={ <FriendQuizResults matchedUsers={matchedUsers}/> }
                                        >
                                            Quiz Results
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <h1 className="welcome-bold text-center m-3">Your Quiz Results</h1>
            <div className="results-box">
                <button className="btn btn-dark text-right" aria-label="sign out" onClick={handleSignOut}>Sign Out</button>
                {content}
                <div className="row m-3">
                    {matchedUsersContent}
                </div>
            </div>

        </div>
    );
}