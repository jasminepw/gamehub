import React, { useState } from 'react';

export function FilterForm(props) {
    const arrayOfGenres = ["action", "adventure", "cozy", "defense", "endless runner", "fantasy", "FPS", "indie", "party", "puzzle", "role-playing", "simulation", "social", "sports", "strategy", "survival", "tactical shooter"];

    const arrayOfPlatforms = ["console", "cross-platform", "mobile", "PC"];

    const [genreFilter, setGenreFilter] = useState("");
    const [playerFilter, setPlayerFilter] = useState("");
    const [platformFilter, setPlatformFilter] = useState("");

    const handleClick = (event) => {
        props.applyFilterCallback(genreFilter, playerFilter, platformFilter);
    }


    const genreDropdownItemList = arrayOfGenres.map((genre, index) => (
        <option value={genre} key={genre}>{genre}</option>
    ));

    const platformDropdownItemList = arrayOfPlatforms.map((platform, index) => (
        <option value={platform} key={platform}>{platform}</option>
    ))

    return (
        <section className="game-filter ms-4">
            <p>Filter by: </p>
            <div className="row align-items-center">
                <div className="col-auto">
                    <select id="genreSelect" className="form-select mb-2 mx-1 w-20 genre" onChange={(e) => setGenreFilter(e.target.value)} value={genreFilter} >
                        <option value="">Show all genres</option>
                        {genreDropdownItemList}
                    </select>
                </div>
                <div className="col-auto">
                    <select id="playersSelect" className="form-select mb-2 mx-1 w-20 player" onChange={(e) => setPlayerFilter(e.target.value)} value={playerFilter}>
                        <option value="">Show all modes</option>
                        <option value="single player">single player</option>
                        <option value="multi player">multi player</option>
                        <option value="single/multi player">single/multi player</option>
                    </select>
                </div>
                <div className="col-auto">
                    <select id="platformSelect" className="form-select mb-2 mx-1 w-20 platform" onChange={(e) => setPlatformFilter(e.target.value)} value={platformFilter}>
                        <option value="">Show all platforms</option>
                        {platformDropdownItemList}
                    </select>
                </div>
                <div className="col-auto">
                    <button id="submitButton" type="submit" className="mb-2 mx-1 w-20 btn btn-dark" onClick={handleClick}>Apply Filter</button>
                </div>
            </div>
        </section>
    );
}