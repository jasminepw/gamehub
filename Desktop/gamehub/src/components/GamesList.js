import React from 'react';

//a component that represents a singular course card
function GameCard(props) {
    const gameName = props.gamesData.name;
    const gameGenre = props.gamesData.genre;
    const gamePlayers = props.gamesData.players;
    const gamePlatform = props.gamesData.platform;
    const gameDescription = props.gamesData.description;
    const gameImg = props.gamesData.img;
    const gameWebsite = props.gamesData.website;


    const genreBadge = gameGenre.map((genre, index) => (
        <span key={genre} className="badge genre m-1">{genre}</span>
    ));

    const platformBadge = gamePlatform.map((platform, index) => (
        <span key={platform} className="badge platform m-1">{platform}</span>
    ));


    return (
        <div className="col-md-6 col-xl-3 d-flex">
            <div className="card mb-4">
                <div className="card-body d-flex flex-column">
                    <div className="row">
                        <div className="col-sm-auto col-xl-12">
                            <img src={gameImg} alt={gameName + " game poster"} className="pb-3 img-fluid d-none d-md-block"></img>
                        </div>
                        <div className="col-sm">
                            <h2 className="card-title">{gameName}</h2>
                            {genreBadge}
                            <div>
                                <span className="badge player m-1">{gamePlayers}</span>
                            </div>
                            <div>
                                {platformBadge}
                            </div>
                        </div>
                    </div>
                    <p className="card-text mt-2">{gameDescription}</p>
                    <a href={gameWebsite} className="btn visit-button mt-auto">Visit Website</a>
                </div>
            </div>
        </div>
    )
}

export function GamesList(props) {
    const games = props.games;

    const gameCardArray = games.map((gameObj) => (
        <GameCard key={gameObj.name} gamesData={gameObj} />
    ));

    return (
        <div className="row m-3">
            {gameCardArray}
        </div>
    )
}