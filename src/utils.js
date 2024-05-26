export const getMainDomain = (url) => {
  const urlObj = new URL(url);
  const hostname = urlObj.hostname;

  const domainParts = hostname.split(".");
  if (domainParts.length > 2) {
    return domainParts.slice(-2).join(".");
  }
  return hostname;
};
