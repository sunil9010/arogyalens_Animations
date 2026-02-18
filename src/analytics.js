export const pageView = (url) => {
  if (window.gtag) {
    window.gtag('config', 'G-X9S5E4BZS5', {
      page_path: url,
    });
  }
};
