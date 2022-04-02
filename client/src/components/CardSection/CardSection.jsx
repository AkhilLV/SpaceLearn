import { useEffect } from "react";
import axios from "axios";
import baseUrl from "../../url/baseUrl";

function CardSection({ selectedCardId }) {
  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: `${baseUrl}/card/${selectedCardId}`,
  //     withCredentials: true,
  //   }).then((res) => {
  //     console.log(res.data);
  //   });
  // }, [selectedCardId]);

  return (
    <div>
      { selectedCardId }
    </div>
  );
}

export default CardSection;
