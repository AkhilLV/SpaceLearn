import { useContext } from "react";
import getSiblingElements from "../../helpers/getSiblingElements";

import CardContext from "../../contexts/CardContext";

import "./ColorSelector.css";

function ColorSelector() {
  const { setSelectedColor } = useContext(CardContext);
  const colors = ["72FF66", "FFB5EF", "F0A93E", "FBE46D"];

  const setAsSelected = (e) => {
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");
      setSelectedColor("ffffff");
      return;
    }

    getSiblingElements(e.target).forEach((element) =>
      element.classList.remove("active")
    );
    e.target.classList.add("active");
    setSelectedColor(e.target.dataset.value);
  };

  return (
    <div className="color-selector">
      {colors.map((color) => (
        <div
          style={{ background: `#${color}` }}
          data-value={color}
          onClick={setAsSelected}
        />
      ))}
    </div>
  );
}

export default ColorSelector;
