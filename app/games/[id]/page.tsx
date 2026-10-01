import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games } from "../../data/gamesdata";

type GameDetailPageProps = {
  params: Promise<{ id: string }>;
};

async function getGame(id: string) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) return undefined;
  return games.find((game) => game.id === numericId);
}

export async function generateMetadata({ params }: GameDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const game = await getGame(id);
  return { title: game ? `${game.name} | Game Backlog` : "ไม่พบเกม | Game Backlog" };
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { id } = await params;
  const game = await getGame(id);
  if (!game) notFound();

  return (
    <main className="gameDetailPage">
      <Link className="backLink" href="/games">← กลับสู่รายการเกม</Link>
      <p className="gamesEyebrow">GAME DETAILS / {game.id.toString().padStart(2, "0")}</p>
      <h1>{game.name}</h1>
      <div className="detailRule" />
      <dl className="gameDetails">
        <div><dt>แพลตฟอร์ม</dt><dd>{game.platform}</dd></div>
        <div><dt>ชั่วโมงโดยประมาณ</dt><dd>{game.hours} ชั่วโมง</dd></div>
        <div><dt>สถานะ</dt><dd>{game.status}</dd></div>
      </dl>
    </main>
  );
}