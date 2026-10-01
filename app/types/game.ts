export const gameStatuses = ["ยังไม่เริ่ม", "กำลังเล่น", "เล่นจบแล้ว"] as const;

export type GameStatus = (typeof gameStatuses)[number];

export type Game = {
  id: number;
  name: string;
  platform: string;
  hours: number;
  status: GameStatus;
};