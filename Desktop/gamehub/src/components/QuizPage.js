import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function QuizPage(props) {
    const [includeMode, setIncludeMode] = useState([]);
    const [includeGenre, setIncludeGenre] = useState([]);
    const [includePlatform, setIncludePlatform] = useState([]);

    const arrayOfModes = ["single player", "multi player", "single/multi player"];

    const arrayOfGenres = ["action", "adventure", "cozy", "defense", "endless runner", "fantasy", "FPS", "indie", "party", "puzzle", "role-playing", "simulation", "social", "sports", "strategy", "survival", "tactical shooter"];

    const arrayOfPlatforms = ["console", "cross-platform", "mobile", "PC"];

    // Using UseNavigate
    const navigate = useNavigate();

    const handleClick = (event) => {
        props.setFilterCriteria({
            genre: includeGenre, players: includeMode, platform: includePlatform
        });
        navigate('/profile');
    }

    const handleIncludeModeChange = (event) => {
        const mode = event.target.id;
        const isChecked = event.target.checked;

        if (isChecked) {
            setIncludeMode([...includeMode, mode]);
        } else {
            setIncludeMode(includeMode.filter((includedMode) => includedMode !== mode));
        }
    };

    const handleIncludeGenreChange = (event) => {
        const genre = event.target.id;
        const isChecked = event.target.checked;

        if (isChecked) {
            setIncludeGenre([...includeGenre, genre]);
        } else {
            setIncludeGenre(includeGenre.filter((includedGenre) => includedGenre !== genre));
        }
    };

    const handleIncludePlatformChange = (event) => {
        const platform = event.target.id;
        const isChecked = event.target.checked;
        if (isChecked) {
            setIncludePlatform([...includePlatform, platform]);
            console.log('checked')
        } else {
            setIncludePlatform(includePlatform.filter((includedPlatform) => includedPlatform !== platform));
        }
    }

    const arrayOfModeOptions = arrayOfModes.map((mode, index) => (
        <div className="form-check" key={mode}>
            <input
                id={mode}
                type="checkbox"
                className="form-check-input"
                checked={includeMode.includes(mode)}
                onChange={handleIncludeModeChange} />
            <label htmlFor={mode} className="form-check-label">{mode}</label>
        </div>
    ))

    const arrayOfGenreOptions = arrayOfGenres.map((genre, index) => (
        <div className="form-check" key={genre}>
            <input
                id={genre}
                type="checkbox"
                className="form-check-input"
                checked={includeGenre.includes(genre)}
                onChange={handleIncludeGenreChange} />
            <label htmlFor={genre} className="form-check-label">{genre}</label>
        </div>
    ));

    const arrayOfPlatformOptions = arrayOfPlatforms.map((platform, index) => (
        <div className="form-check" key={platform}>
            <input
                id={platform}
                type="checkbox"
                className="form-check-input"
                checked={includePlatform.includes(platform)}
                onChange={handleIncludePlatformChange} />
            <label htmlFor={platform} className="form-check-label">{platform}</label>
        </div>
    ));

    return (
        <div className="quiz-container">
            <div className="quiz-box">
                <form className="form">

                    <div className="form-control border border-2 rounded border-dark">

                        <p>Single player or Multiplayer?</p>
                        <div className="player">
                            {arrayOfModeOptions}
                        </div>
                    </div>

                    <div className="form-control border border-2 rounded border-dark">
                        <p>Which themes interest you?
                        </p>
                        <div className="themes">
                            {arrayOfGenreOptions}
                        </div>
                    </div>

                    <div className="form-control border border-2 rounded border-dark">

                        <p>Which technology do you have access to?</p>

                        <div className="device">
                            {arrayOfPlatformOptions}
                        </div>
                    </div>
                    <a className="btn visit-button" onClick={handleClick}>Submit</a>
                </form>
            </div>
        </div>
    );
}
