import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import CoinChart from "./CoinChart"

const API_KEY = import.meta.env.VITE_APP_API_KEY

function CoinDetails() {
  const { symbol } = useParams()
  const upperSymbol = symbol?.toUpperCase?.() || ""

  const [fullDetails, setFullDetails] = useState(null)

  useEffect(() => {
    const getCoinDetail = async () => {
      try {
        const details = await fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${upperSymbol}&tsyms=USD&api_key=${API_KEY}`
        )
        const description = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`
        )

        const detailsJson = await details.json()
        const descripJson = await description.json()

        setFullDetails({
          numbers: detailsJson.DISPLAY,
          textData: descripJson.Data,
        })
      } catch (err) {
        console.error("Error fetching coin details:", err)
      }
    }

    if (upperSymbol) {
      getCoinDetail()
    }
  }, [upperSymbol])

  if (!fullDetails) return <p>Loading...</p>

  const coinInfo = fullDetails.textData[upperSymbol]
  const displayInfo = fullDetails.numbers[upperSymbol]?.USD

  if (!coinInfo || !displayInfo) return <p>Coin not found.</p>

  return (
    <>
      <h1>{coinInfo.FullName}</h1>
      <img
        className="images"
        src={
          displayInfo.IMAGEURL
            ? `https://www.cryptocompare.com${displayInfo.IMAGEURL}`
            : "https://via.placeholder.com/64"
        }
        alt={`Icon for ${symbol}`}
      />

      <CoinChart
        symbol={upperSymbol}
        market={displayInfo.MARKET || "N/A"}
      />

      <div>{coinInfo.Description || "No description available."}</div>
      <br />
      <div>This coin was built with the algorithm {coinInfo.Algorithm}</div>

      {/* ... rest of your table ... */}
    </>
  )
}

export default CoinDetails
