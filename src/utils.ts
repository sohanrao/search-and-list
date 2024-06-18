type Size = "S" | "L" | "M";
export function getCoverPath(id: number, size: Size = "M"): string {
  return `https://covers.openlibrary.org/b/id/${id}-${size}.jpg`;
}

export function buildURLPath(
  type?: string,
  value?: string,
  query?: string,
): string {
  let path = "";
  let url = "";
  const types = ["genre", "search", "authors", "author"];
  if (!type || !types.includes(type)) {
    throw Error("Route not found!");
  }
  switch (type) {
    case "genre":
      return `/subjects/${value}.json?limit=50`;

    case "search":
      path = "/search.json";
      url = query ? path + query + "&limit=50" : path;
      return url;

    case "authors":
      path = "/search/authors.json";
      url = query ? path + query : path;
      return url;

    case "author":
      return `/authors/${value}`;

    default:
      return "";
  }
}
