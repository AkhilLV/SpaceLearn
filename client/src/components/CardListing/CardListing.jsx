import { useState, useEffect } from "react";

import axios from "axios";
import baseUrl from "../../url/baseUrl";

function CardListing() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${baseUrl}/cards`,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      setCards(res.data);
    });
  }, []);

  return (
    <div className="card-listing">
      {cards.map((card) => <div className="card-preview">{card.cardName}</div>)}
    </div>
  );
}

export default CardListing;

// a -> id // custom route
