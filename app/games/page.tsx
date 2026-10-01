"use client";

import { useState, type FormEvent } from "react";
import GameExplorer from "../components/GameExplorer";
import GameForm, { type GameFormErrors, type GameFormValues } from "../components/GameForm";
import { games as initialGames } from "../data/gamesdata";
import { gameStatuses, type Game, type GameStatus } from "../types/game";

const emptyForm: GameFormValues = { name: "", platform: "", hours: 1, status: "ยังไม่เริ่ม" };

const nextStatus = (status: GameStatus): GameStatus => {
  const index = gameStatuses.indexOf(status);
  return gameStatuses[(index + 1) % gameStatuses.length];
};

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [form, setForm] = useState<GameFormValues>(emptyForm);
  const [errors, setErrors] = useState<GameFormErrors>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const unstartedHours = games
    .filter((game) => game.status === "ยังไม่เริ่ม")
    .reduce((total, game) => total + game.hours, 0);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: GameFormErrors = {};
    if (!form.name.trim()) nextErrors.name = "กรุณากรอกชื่อเกม";
    if (!Number.isInteger(form.hours) || form.hours <= 0) nextErrors.hours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
    if (!form.platform) nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (editingId === null) {
      const newGame: Game = { ...form, name: form.name.trim(), id: Math.max(0, ...games.map((game) => game.id)) + 1 };
      setGames((current) => [newGame, ...current]);
    } else {
      setGames((current) => current.map((game) => game.id === editingId ? { ...form, name: form.name.trim(), id: game.id } : game));
    }
    resetForm();
  }

  function resetForm() {
    setForm(emptyForm);
    setErrors({});
    setEditingId(null);
  }

  function startEditing(game: Game) {
    setEditingId(game.id);
    setForm({ name: game.name, platform: game.platform, hours: game.hours, status: game.status });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateForm(field: keyof GameFormValues, value: GameFormValues[keyof GameFormValues]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function confirmDelete() {
    if (pendingDeleteId === null) return;
    setGames((current) => current.filter((game) => game.id !== pendingDeleteId));
    setPendingDeleteId(null);
    if (editingId === pendingDeleteId) resetForm();
  }

  function changeStatus(game: Game) {
    setGames((current) => current.map((item) => item.id === game.id ? { ...item, status: nextStatus(item.status) } : item));
  }

  return (
    <main className="gamesPage">
      <header className="gamesHeading">
        <div>
          <p className="gamesEyebrow">PERSONAL LIBRARY / 01</p>
          <h1>Game Backlog</h1>
          <p>เกมที่รอเวลาเหมาะ ๆ ให้ได้เริ่มเล่น</p>
        </div>
        <div className="hoursSummary" aria-live="polite">
          <span>ชั่วโมงที่รอเล่น</span>
          <strong>{unstartedHours}<small> ชม.</small></strong>
        </div>
      </header>

      <GameForm
        form={form}
        errors={errors}
        isEditing={editingId !== null}
        onChange={updateForm}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />
      <GameExplorer games={games} onEdit={startEditing} onDelete={setPendingDeleteId} onStatusChange={changeStatus} />

      {pendingDeleteId !== null && (
        <div className="confirmBackdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPendingDeleteId(null); }}>
          <section className="confirmDialog" role="alertdialog" aria-modal="true" aria-labelledby="confirmTitle" aria-describedby="confirmDescription">
            <p className="gamesEyebrow">REMOVE FROM LIST</p>
            <h2 id="confirmTitle">ลบเกมนี้ออกจากรายการ?</h2>
            <p id="confirmDescription">การลบจะมีผลทันทีและไม่สามารถย้อนกลับได้</p>
            <div className="confirmActions">
              <button className="secondaryGameButton" type="button" onClick={() => setPendingDeleteId(null)}>ยกเลิก</button>
              <button className="dangerGameButton" type="button" onClick={confirmDelete}>ยืนยันการลบ</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}