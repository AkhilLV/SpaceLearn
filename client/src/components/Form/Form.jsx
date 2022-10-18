import { useState } from "react";

import "./Form.css";
import { motion } from "framer-motion";
import close from "../../assets/icons/close.svg";
import ColorSelector from "../ColorSelector/ColorSelector";

function Form({
  headerText = "",
  inputItems = [],
  submitBtnText = "Submit",
  onSubmit = () => {},
  setShowForm,
}) {
  const customInputTypes = ["ColorSelector"];

  // set default inputValues
  const [inputValues, setInputValues] = useState(
    inputItems.reduce((acc, inputItem) => {
      acc[inputItem.id] = inputItem.inputValue || "";
      return acc;
    }, {})
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(e, inputValues);
  };

  const onChange = (itemId) => (e) => {
    setInputValues({ ...inputValues, [itemId]: e.target.value });
  };

  const variants = {
    hidden: { scale: 0.9, x: "-50%", y: "-50%" },
    visible: { scale: 1 },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overlay overlay-dark"
        onClick={() => setShowForm(false)}
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="input-modal"
      >
        <div className="header">
          <h3>{headerText}</h3>
          <button type="button" onClick={() => setShowForm(false)}>
            <img src={close} alt="close" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {inputItems.map((item) => (
            <>
              <label>{item.labelText}</label>

              {!customInputTypes.includes(item.inputType) ? (
                <input
                  key={item.id}
                  className="input"
                  type={item.inputType}
                  value={inputValues[item.id]}
                  onChange={onChange(item.id)}
                />
              ) : (
                <ColorSelector />
              )}
            </>
          ))}

          <button className="btn btn-small" type="submit">
            {submitBtnText}
          </button>
        </form>
      </motion.div>
    </>
  );
}

export default Form;

// a loader for button
