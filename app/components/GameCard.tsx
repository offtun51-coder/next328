import Link from "next/link";
import type { Game } from "../types/game";

type GameCardProps = {
  game: Game;
  index: number;
  onEdit: (game: Game) => void;
  onDelete: (id: number) => void;
  onStatusChange: (game: Game) => void;
};

export default function GameCard({ game, index, onEdit, onDelete, onStatusChange }: GameCardProps) {
  const statusClass = game.status === "ยังไม่เริ่ม" ? "queued" : game.status === "กำลังเล่น" ? "playing" : "done";

  return (
    <article className="gameRow">
      <span className="gameIndex">{(index + 1).toString().padStart(2, "0")}</span>
      <div className="gameInfo">
        <h3><Link href={`/games/${game.id}`}>{game.name}</Link></h3>
        <p>{game.platform}<span aria-hidden="true"> / </span>{game.hours} ชั่วโมง</p>
      </div>
      <button className={`statusPill status-${statusClass}`} type="button" onClick={() => onStatusChange(game)} title="คลิกเพื่อเปลี่ยนสถานะ">{game.status}<span aria-hidden="true"> ↻</span></button>
      <div className="gameActions">
        <button className="iconAction" type="button" onClick={() => onEdit(game)} aria-label={`แก้ไข ${game.name}`} title="แก้ไข">✎</button>
        <button className="iconAction deleteAction" type="button" onClick={() => onDelete(game.id)} aria-label={`ลบ ${game.name}`} title="ลบ">×</button>
      </div>
    </article>
  );
}