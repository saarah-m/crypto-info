import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from "./Components/CoinInfo"
import SideNav from "./Components/SideNav"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const API_KEY = import.meta.env.VITE_APP_API_KEY

function App() {
  const [list, setList] = useState(null)
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`
      )
      const json = await response.json()
      setList(json)
      setFilteredResults(Object.keys(json.Data)) // show all coins initially
    }
    fetchAllCoinData().catch(console.error)
  }, [])

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((key) => {
        const coinData = list.Data[key]
        return (
          coinData.FullName.toLowerCase().includes(searchValue.toLowerCase()) ||
          coinData.Symbol.toLowerCase().includes(searchValue.toLowerCase())
        )
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(Object.keys(list.Data))
    }
  }

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => searchItems(e.target.value)}
      />
      {!list && <p>Loading...</p>}
      <ul>
        {list &&
          filteredResults.map((coinKey) => {
            const coinData = list.Data[coinKey]
            if (
              coinData.IsTrading &&
              coinData.Algorithm !== "N/A" &&
              coinData.ProofType !== "N/A"
            ) {
              const imageUrl = coinData.ImageUrl
                ? `https://www.cryptocompare.com${coinData.ImageUrl}`
                : "https://via.placeholder.com/32"

              return (
                <CoinInfo
                  key={coinKey}
                  image={imageUrl}
                  name={coinData.FullName}
                  symbol={coinData.Symbol}
                />
              )
            }
            return null
          })}
      </ul>
    </div>
  )
}

export default App
