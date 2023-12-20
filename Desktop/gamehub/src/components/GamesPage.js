import React, { useState } from "react";
import { FilterForm } from "./FilterForm";
import { GamesList } from "./GamesList";

import GAME_DATA from '../data/games-list.json'

export function GamesPage(props) {
    const gameData = GAME_DATA;

    const [filterCriteria, setFilterCriteria] = useState({
        genre: "", players: "", platform: ""
    });

    const displayedData = gameData.filter((game) => {
        if (
            (filterCriteria.genre !== "" && !game.genre.includes(filterCriteria.genre)) ||
            (filterCriteria.players !== "" && game.players !== filterCriteria.players) ||
            (filterCriteria.platform !== "" && !game.platform.includes(filterCriteria.platform))
        ) {
            return false;
        }
        return true;
    });

    let content;
    if (displayedData.length === 0) {
        content = (
            <div className="big-margin">
                <div className="alert alert-danger text-center my-auto" role="alert">
                    <h1><strong>ERROR</strong></h1>
                    <p>No games found with the specified filter criteria. Please try again!</p>
                </div>
            </div>
        );
    } else {
        content = <GamesList games={displayedData} />;
    }

    const applyFilter = (genre, players, platform) => {
        setFilterCriteria({
            genre: genre,
            players: players,
            platform: platform
        });
    }

    return (
        <div>
            <FilterForm
                applyFilterCallback={applyFilter}
            />
            {content}
        </div>
    );
}