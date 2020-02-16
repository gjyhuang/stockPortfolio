import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {STOCK_API_KEY} from '../../keys';
import Navbar from './Navbar';
import StockSelected from './StockSelected';
import StockForm from './StockForm';

const Portfolio = () => {
  const [stockToBuy, setStockToBuy] = React.useState("");
  const [selectedStock, setSelectedStock] = React.useState({});
  const [amtToBuy, setAmtToBuy] = React.useState(0);

  // makes IEX API call for the selected stock and sets it to state
  // pass object down to StockSelected component
  const getStock = async (name) => {
    name = name.toUpperCase();
    try {
      const URL = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${name}&types=quote&range=1m&last=5&&token=${STOCK_API_KEY}`;
      const dataFetch = await axios.get(URL);
      const stock = dataFetch.data[name]
      if (stock) setSelectedStock(stock.quote);
    } catch (err) {
      console.error(err);
    }
  }

  console.log('selectedStock >>>>', selectedStock)

  return (
    <>
    <Navbar />
    <div id="main-wrapper">
      <div id="portfolio">
        <div className="">My Portfolio</div>
      </div>
      {/* <StockSelectForm stockToBuy={stockToBuy} setStockToBuy={setStockToBuy} getStock={getStock} /> */}
      <StockForm
        className="stock-form stock-search"
        labelText='Stock Ticker:'
        value={stockToBuy}
        onClickCallback={getStock}
        onChangeFunc={setStockToBuy}
        inputType = "submit"
        inputValue = "Search"
      />
      <div id="stock-selected" style={{visibility: selectedStock.symbol ? 'visible' : 'hidden'}}>
        <StockSelected selectedStock={selectedStock} fetchSelectedStock={setSelectedStock} />
        <div className="text-description">
          Purchase this stock by entering the desired number of shares below and clicking 'Buy'.
        </div>
        <StockForm
          className="stock-form stock-buy"
          labelText='Number of shares:'
          value={amtToBuy}
          onClickCallback={null}
          onChangeFunc={setAmtToBuy}
          inputType = "submit"
          inputValue = "Buy"
        />
      </div>
    </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const ConnectedPortfolio = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

export default ConnectedPortfolio;
