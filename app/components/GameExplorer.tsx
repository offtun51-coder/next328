"use client";

import { useState } from "react";
import GameCard from "./GameCard";
import { gameStatuses, type Game, type GameStatus } from "../types/game";

type GameExplorerProps = {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (id: number) => void;
  onStatusChange: (game: Game) => void;
};

export default function GameExplorer({ games, onEdit, onDelete, onStatusChange }: GameExplorerProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<GameStatus | "ทั้งหมด">("ทั้งหมด");
  const visibleGames = games.filter((game) => {
    const matchesName = game.name.toLocaleLowerCase("th").includes(search.trim().toLocaleLowerCase("th"));
    return matchesName && (statusFilter === "ทั้งหมด" || game.status === statusFilter);
  });

  return (
    <section className="backlogSection" aria-labelledby="backlogTitle">
      <div className="backlogHeader">
        <div className="sectionTitleRow">
          <h2 id="backlogTitle">รายการเกม <span>{visibleGames.length.toString().padStart(2, "0")}</span></h2>
        </div>
        <div className="gameFilters">
          <label className="gameSearch">
            <span className="visuallyHidden">ค้นหาชื่อเกม</span>
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ค้นหาชื่อเกม..." />
          </label>
          <label className="statusFilter">
            <span className="visuallyHidden">กรองตามสถานะ</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as GameStatus | "ทั้งหมด")}>
              <option value="ทั้งหมด">ทุกสถานะ</option>
              {gameStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </label>
        </div>
      </div>

      {visibleGames.length > 0 ? (
        <div className="gameList">
          {visibleGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
          ))}
        </div>
      ) : (
        <p className="gameEmptyState">ไม่พบเกมที่ตรงกับการค้นหา</p>
      )}
    </section>
  );
}