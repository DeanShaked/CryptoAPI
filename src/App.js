import './App.css';
import React,{ useState, useEffect} from 'react'
import Axios from 'axios';
import Coin from './components/Coin'

function App() {

  const [coins,setCoins] = useState([]);
  const [search,setSearch] = useState('');

  useEffect(() => {
    Axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data)

    }).catch(error => alert('wrong one'))
    
  })
  const handleChange = e => {
    setSearch(e.targer.value)
  }
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image}
          symbol={coin.symbol} 
          volume={coin.market_cup}
          price={coin.current_price} />
        )
      })}
    </div>
  );
}

export default App;
