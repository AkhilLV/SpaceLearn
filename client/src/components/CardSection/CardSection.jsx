import { useEffect, useState } from "react";

import { getCard } from "../../api";

function CardSection({ selectedCardId }) {
  const [cardData, setCardData] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCard(selectedCardId);
        setCardData(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [selectedCardId]);

  useEffect(() => console.log(cardData), [cardData]);

  return (
    <div>
      { selectedCardId }
    </div>
  );
}

export default CardSection;
