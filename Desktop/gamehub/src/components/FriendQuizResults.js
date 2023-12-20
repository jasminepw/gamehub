import React, { useEffect, useState } from "react";
import { GamesList } from "./GamesList";
import GAME_DATA from '../data/games-list.json'
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, set as firebaseSet, onValue, push as firebasePush } from "firebase/database";
import { render } from "@testing-library/react";

// import { useParams } from "react-router-dom";

import { Link, useParams } from 'react-router-dom';


export function FriendQuizResults(props) {
    const matchedUsers = props.matchedUsers;

    const friendUid = useParams().friendUid;

    let matchedUsersIndex = null;
    for (var i = 0, l = matchedUsers.length; i < l; i++) {
        if (matchedUsers[i].userId === friendUid) {
            matchedUsersIndex = i;
        }
    }
    console.log(matchedUsers);
    let content = <GamesList games={matchedUsers[matchedUsersIndex].mostRecentGameArray} />

    return (
        <div>
            <h1 className="welcome-bold text-center m-3">{matchedUsers[matchedUsersIndex].displayName}'s Quiz Results</h1>
            <div className="results-box">
            <a className="btn btn-dark" href="/profile" aria-label="Link to profile page">Return to My Profile</a>
                {content}

                <div className="row m-3">

                    {/* {matchedUsersContent} */}
                </div>
            </div>
        </div>
    );
}