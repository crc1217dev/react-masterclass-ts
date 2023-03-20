import styled from "styled-components";

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
}

interface Quotes {
  USD: Usd;
}
interface Usd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}
interface PriceProps {
  coinId: string;
  price: PriceData;
}

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  min-width: 150px;
  min-height: 150px;
`;
const Overview = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 400;
  padding: 14px;
  border-radius: 10px;
  color: aliceblue;
  background-color: rgba(0, 0, 0, 0.5);
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

function Price({ coinId, price }: PriceProps) {
  const date = new Date(price.quotes.USD.ath_date).toLocaleDateString();
  return (
    <>
      <Container>
        <Overview>
          <OverviewItem>
            <span>athPrice</span>
            <span>{price.quotes.USD.ath_price.toFixed(2)}</span>
          </OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>
            <span>percent From PriceATH</span>
            <span>{price.quotes.USD.percent_from_price_ath}</span>
          </OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>
            <span>MarketCap</span>
            <span>{price.quotes.USD.market_cap}</span>
          </OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>
            <span>volume-24hours</span>
            <span>{price.quotes.USD.volume_24h}</span>
          </OverviewItem>
        </Overview>
      </Container>
    </>
  );
}
export default Price;
