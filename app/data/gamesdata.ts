import type { Game } from "../types/game";

export const games: Game[] = [
  { id: 1, name: "Outer Wilds", platform: "PC", hours: 18, status: "ยังไม่เริ่ม" },
  { id: 2, name: "Sekiro: Shadows Die Twice", platform: "PlayStation 5", hours: 35, status: "กำลังเล่น" },
  { id: 3, name: "Final Fantasy VII Rebirth", platform: "PlayStation 5", hours: 70, status: "ยังไม่เริ่ม" },
  { id: 4, name: "Slay the Spire", platform: "Nintendo Switch", hours: 30, status: "เล่นจบแล้ว" },
  { id: 5, name: "Control Ultimate Edition", platform: "Xbox Series X|S", hours: 22, status: "ยังไม่เริ่ม" },
];

export const platforms = ["PC", "PlayStation 5", "Xbox Series X|S", "Nintendo Switch"];