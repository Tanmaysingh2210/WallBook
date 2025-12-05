export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
};

export const filterWallpapers = (wallpapers, filter, searchQuery) => {
  let filtered = [...wallpapers];

  // Apply filter
  if (filter === 'trending') {
    filtered = filtered.filter(w => w.trending);
  }

  // Apply search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(w => 
      w.title.toLowerCase().includes(query) ||
      w.tags.some(tag => tag.toLowerCase().includes(query)) ||
      w.category.toLowerCase().includes(query)
    );
  }

  return filtered;
};