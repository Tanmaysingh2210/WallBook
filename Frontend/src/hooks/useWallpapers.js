import { useState, useMemo } from 'react';
import { WALLPAPERS } from '../data/wallpapers.js';
import { filterWallpapers } from '../utils/helpers.js';

export const useWallpapers = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWallpapers = useMemo(() => {
    return filterWallpapers(WALLPAPERS, filter, searchQuery);
  }, [filter, searchQuery]);

  return {
    wallpapers: filteredWallpapers,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery
  };
};