'use client';

import { useMemo, useState } from 'react';
import BandCard from './BandCard';
import { Band } from '../types/band';

interface BandExplorerProps {
  bands: Band[];
}

type SortOption = 'name' | 'foundedYear';

export default function BandExplorer({ bands }: BandExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [followedBandIds, setFollowedBandIds] = useState<Set<number>>(new Set());
  const [likedBandIds, setLikedBandIds] = useState<Set<number>>(new Set());

  const visibleBands = useMemo(() => {
    const filteredBands = bands.filter((band) =>
      band.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    );

    return [...filteredBands].sort((firstBand, secondBand) => {
      if (sortBy === 'foundedYear') {
        return firstBand.foundedYear - secondBand.foundedYear;
      }

      return firstBand.name.localeCompare(secondBand.name);
    });
  }, [bands, searchTerm, sortBy]);

  function toggleFollow(bandId: number) {
    setFollowedBandIds((currentIds) => {
      const nextIds = new Set(currentIds);
      if (nextIds.has(bandId)) {
        nextIds.delete(bandId);
      } else {
        nextIds.add(bandId);
      }
      return nextIds;
    });
  }

  function toggleLike(bandId: number) {
    setLikedBandIds((currentIds) => {
      const nextIds = new Set(currentIds);
      if (nextIds.has(bandId)) {
        nextIds.delete(bandId);
      } else {
        nextIds.add(bandId);
      }
      return nextIds;
    });
  }

  function resetFilters() {
    setSearchTerm('');
    setSortBy('name');
  }

  return (
    <main className="musicPage">
      <div className="musicIntro">
        <p className="eyebrow">FAVORITE BANDS</p>
        <h1>วงดนตรีที่ชื่นชอบ</h1>
        <p>ค้นหาและติดตามวงดนตรีที่คุณชอบได้ในที่เดียว</p>
      </div>

      <section className="bandToolbar" aria-label="ตัวกรองวงดนตรี">
        <label className="searchField">
          <span>ค้นหาชื่อวงดนตรี</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="เช่น COCKTAIL"
          />
        </label>
        <label className="sortField">
          <span>เรียงตาม</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)}>
            <option value="name">ชื่อวง</option>
            <option value="foundedYear">ปีที่ก่อตั้ง</option>
          </select>
        </label>
        <button type="button" className="resetButton" onClick={resetFilters}>
          ล้างเงื่อนไข
        </button>
      </section>

      <div className="bandSummary">
        <span>พบ {visibleBands.length} วง</span>
        <strong>ติดตามอยู่ {followedBandIds.size} วง</strong>
      </div>

      {visibleBands.length > 0 ? (
        <div className="bandList">
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowing={followedBandIds.has(band.id)}
              isLiked={likedBandIds.has(band.id)}
              likeCount={likedBandIds.has(band.id) ? 1 : 0}
              onToggleFollow={() => toggleFollow(band.id)}
              onToggleLike={() => toggleLike(band.id)}
            />
          ))}
        </div>
      ) : (
        <div className="emptyState">
          <h2>ไม่พบวงดนตรี</h2>
          <p>ลองค้นหาด้วยชื่อวงอื่น หรือกดล้างเงื่อนไขเพื่อดูทั้งหมด</p>
        </div>
      )}
    </main>
  );
}