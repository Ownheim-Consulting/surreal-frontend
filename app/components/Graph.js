const baseUrl = "https://space-app-364302.uc.r.appspot.com";

function Graph({ type, url }) {
  return type(baseUrl + url);
}

export default Graph;
