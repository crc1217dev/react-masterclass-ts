import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";
import { useRecoilState } from "recoil";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.cardBdColor};
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  margin: 0 0 0 auto;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;
const Button = styled.button`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  margin-left: auto;
  cursor: pointer;
  display: inline-block;
  &:hover {
    svg {
      fill: ${(props) => props.theme.accentColor};
      stroke: ${(props) => props.theme.accentColor};
      path {
        fill: ${(props) => props.theme.accentColor};
      }
    }
  }
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [darkAtom, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery(["allCoins"], fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>코인 </title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <Button onClick={toggleDarkAtom}>
          {darkAtom ? (
            <svg
              fill="#ffffff"
              width="32px"
              height="32px"
              viewBox="0 0 35 35"
              data-name="Layer 2"
              id="Layer_2"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#CCCCCC"
                stroke-width="2.03"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z"></path>
              </g>
            </svg>
          ) : (
            <svg
              width="32px"
              height="32px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13 3.49792C13 2.94564 12.5523 2.49792 12 2.49792C11.4477 2.49792 11 2.94564 11 3.49792V4C11 4.55229 11.4477 5 12 5C12.5523 5 13 4.55229 13 4V3.49792ZM18.719 6.69519C19.1095 6.30466 19.1095 5.6715 18.719 5.28097C18.3285 4.89045 17.6953 4.89045 17.3048 5.28097L16.9497 5.63605C16.5592 6.02658 16.5592 6.65974 16.9497 7.05027C17.3402 7.44079 17.9734 7.44079 18.3639 7.05027L18.719 6.69519ZM6.69516 5.28103C6.30464 4.89051 5.67147 4.89051 5.28095 5.28103C4.89043 5.67156 4.89043 6.30472 5.28095 6.69525L5.63597 7.05027C6.0265 7.44079 6.65966 7.44079 7.05019 7.05027C7.44071 6.65974 7.44071 6.02658 7.05019 5.63605L6.69516 5.28103ZM3.49792 11C2.94564 11 2.49792 11.4477 2.49792 12C2.49792 12.5523 2.94564 13 3.49792 13H3.99998C4.55226 13 4.99998 12.5523 4.99998 12C4.99998 11.4477 4.55226 11 3.99998 11H3.49792ZM20 11C19.4477 11 19 11.4477 19 12C19 12.5523 19.4477 13 20 13H20.5021C21.0544 13 21.5021 12.5523 21.5021 12C21.5021 11.4477 21.0544 11 20.5021 11H20ZM7.05019 18.364C7.44071 17.9735 7.44071 17.3403 7.05019 16.9498C6.65966 16.5592 6.0265 16.5592 5.63597 16.9498L5.28097 17.3048C4.89044 17.6953 4.89044 18.3285 5.28096 18.719C5.67149 19.1095 6.30465 19.1095 6.69518 18.719L7.05019 18.364ZM18.3639 16.9498C17.9734 16.5592 17.3402 16.5592 16.9497 16.9498C16.5592 17.3403 16.5592 17.9735 16.9497 18.364L17.3047 18.719C17.6953 19.1096 18.3284 19.1096 18.719 18.719C19.1095 18.3285 19.1095 17.6954 18.719 17.3048L18.3639 16.9498ZM13 20C13 19.4477 12.5523 19 12 19C11.4477 19 11 19.4477 11 20V20.5021C11 21.0544 11.4477 21.5021 12 21.5021C12.5523 21.5021 13 21.0544 13 20.5021V20ZM8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12ZM12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z"
                  fill="#000000"
                ></path>
              </g>
            </svg>
          )}
        </Button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin: ICoin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
