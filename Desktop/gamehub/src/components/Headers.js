import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

function HomePageHeader() {
    return (
        <div className="welcome-box">
            <div className="welcome-msg">
                <h1 className="my-header">Welcome to Game Hub!</h1>
                <p>Game Hub is an easy way for beginner and advanced gamers to be able to find new games to play based off of your interests! You can also be matched with others who have similar interests and got recommended the same games.</p>
                <p>You can also search for games using filters or browse through our featured games below.</p>
                <p>Take the quiz to find new games and connect with other gamers!</p>
            </div>
            <a className="btn visit-button" href="/quiz" role="button" aria-label="Link to take the quiz">Take the quiz!</a>
        </div>
    );
}

function QuizPageHeader() {
    return (
        <h1 className="my-header text-center p-4 mb-0">Quiz: Find your Perfect Games</h1>
    )
}

function GamesPageHeader() {
    return (<h1 className="my-header p-4 mb-0 text-center">Games Masterlist</h1>);
}

function FriendsPageHeader() {
    return (
        <h1 className="my-header pt-4 px-4 mb-0 text-center">Friends List</h1>
    );
}

export function Headers(props) {
    return (
        <Routes>
            <Route index element= { <HomePageHeader /> } />
            <Route path="home" element={ <HomePageHeader /> } />
            <Route path="quiz" element={ <QuizPageHeader /> } />
            <Route path="games" element={ <GamesPageHeader /> } />
            <Route path="friends" element={ <FriendsPageHeader /> } />
        </Routes>
    );
}