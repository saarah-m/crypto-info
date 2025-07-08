import { useEffect, useState } from "react"

const API_KEY = import.meta.env.VITE_APP_API_KEY

function CryptoNews() {
  const [newsList, setNewsList] = useState(null)

  useEffect(() => {
    const getNewsArticles = async () => {
      try {
        if (!API_KEY) {
          console.error("Missing API key")
          return
        }

        const response = await fetch(
          `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}`
        )
        const json = await response.json()
        if (json && json.Data) {
          setNewsList(json.Data)
        } else {
          console.warn("Unexpected response structure:", json)
        }
      } catch (err) {
        console.error("Error fetching news:", err)
      }
    }

    getNewsArticles()
  }, [])

  return (
    <div>
      <h3>Crypto News</h3>
      <ul className="side-list">
        {!newsList && <li>Loading news...</li>}
        {newsList &&
          newsList.map((article) => (
            <li className="news-article" key={article.title}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default CryptoNews
