export const fetchRepositories = async (query, page) => {
  try {
    // Add a cache-buster timestamp to avoid cached responses
    console.log(query, page);

    const timestamp = new Date().getTime();
    const encodedQuery = encodeURIComponent(query);

    const response = await fetch(
      // `https://api.github.com/search/repositories?q=${encodedQuery}&page=${page}&per_page=10&_=${timestamp}`,
      {
        headers: {
          Authorization: `your-secret-key`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (response.status === 403) {
      throw new Error("API rate limit exceeded. Try again later.");
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Unable to fetch data`);
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
