const deviceBreakpoints = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export function mediaQueries(key) {
  return `@media (max-width: ${deviceBreakpoints[key]})`;
}

export function mediaPx(key) {
  return Number(deviceBreakpoints[`${key}`].split("px").at(0));
}

export const device = {
  mobileS: "@media (max-width: 320px)",
  mobileM: "@media (max-width: 375px)",
  mobileL: "@media (max-width: 425px)",
  tablet: "@media (max-width: 768px)",
  laptop: "@media (max-width: 1024px)",
  laptopL: "@media (max-width: 1440px)",
  desktop: "@media (max-width: 2560px)",
};
