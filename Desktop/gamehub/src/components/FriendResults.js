import React from "react";
import { GamesList } from "./GamesList";
import SAMPLE_DATA from '../data/four-games-list.json'


export function FriendResults(props) {
    return (
        <div>
            <h1 className="welcome-bold text-center pt-4">Friend's Quiz Results</h1>
            <div className="d-flex justify-content-center">
                <GamesList games={SAMPLE_DATA} />
            </div>
        </div>
    );
}