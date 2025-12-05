export const loadAdSense = () => {
  const script = document.createElement('script');
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.REACT_APP_ADSENSE_CLIENT}`;
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
};

export const displayAd = (adSlot) => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (error) {
    console.error('Error displaying ad:', error);
  }
};