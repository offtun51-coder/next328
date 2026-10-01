import Image from 'next/image';
import { Band } from '../types/band';

interface BandCardProps {
  band: Band;
  isFollowing: boolean;
  isLiked: boolean;
  likeCount: number;
  onToggleFollow: () => void;
  onToggleLike: () => void;
}

export default function BandCard({
  band,
  isFollowing,
  isLiked,
  likeCount,
  onToggleFollow,
  onToggleLike,
}: BandCardProps) {
  return (
    <article className="bandCard">
      <Image
        src={band.image}
        alt={band.name}
        width={300}
        height={280}
        style={{ objectFit: 'cover', borderRadius: '6px' }}
      />
      <h2>{band.name}</h2>
      <p>แนวเพลง: {band.genre}</p>
      <p>ก่อตั้ง: {band.foundedYear}</p>

      <div className="bandActions">
        <button type="button" onClick={onToggleFollow} className={isFollowing ? 'actionButton active' : 'actionButton'}>
          {isFollowing ? 'เลิกติดตาม' : 'ติดตาม'}
        </button>
        <button type="button" onClick={onToggleLike} className={isLiked ? 'actionButton liked' : 'actionButton'}>
          {isLiked ? 'Unlike' : 'Like'} ({likeCount})
        </button>
      </div>

      <h3>สมาชิก</h3>
      <ul>
        {band.members.map((member) => (
          <li key={member.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem',
          }}>
            <Image
              src={member.image ?? band.image}
              alt={`รูปของ ${member.nickname ?? member.name}`}
              width={56}
              height={56}
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <span>
              {member.nickname} - {member.name} - {member.role}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}