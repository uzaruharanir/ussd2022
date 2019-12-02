const months = new Map([
  [1, 'January'],
  [2, 'February'],
  [3, 'March'],
  [4, 'April'],
  [5, 'May'],
  [6, 'June'],
  [7, 'July'],
  [8, 'August'],
  [9, 'September'],
  [10, 'October'],
  [11, 'November'],
  [12, 'December']
]);
/**
 *
 * @param {array} seasonsJSON
 */
export function* formatSeasons(seasonsJSON) {
  const seasons = seasonsJSON.map(season => season.fields, []);
  // TODO: use moment to compare dates
  const currentSeason = seasons.filter(
    season =>
      new Date(season.starts) < new Date(Date.now()) &&
      new Date(season.ends) > new Date(Date.now())
  )[0];
  yield `The current season is ${currentSeason.name.toUpperCase()} \n`;
  for (let index = 0; index < seasons.length; index++) {
    const season = seasons[index];
    const seasonStarts = new Date(season.starts).getMonth() + 1;
    const seasonEnds = new Date(season.ends).getMonth() + 1;
    yield `Season ${season.name.toUpperCase()} ${months.get(
      seasonStarts
    )}-${months.get(seasonEnds)} \n`;
  }
}
