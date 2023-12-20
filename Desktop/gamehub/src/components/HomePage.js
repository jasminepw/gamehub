import React from "react";
import { GamesList } from "./GamesList";
import FEATURED_GAMES from "../data/featured-games.json";

export function HomePage(props) {
  return (
    <div>
      <h2 className="text-center">Featured Games</h2>
      <div className="d-flex justify-content-center">
        <GamesList games={FEATURED_GAMES} />
      </div>
    </div>
  );
}