import React from "react";
import Button from "../Header/Button";
import CurrentYear from "../Header/CurrentYear";
import JumpButton from "../Header/JumpButton";
import YearsList from "../Body/yearsList";

function PickerPanel({
  selectedYear,
  isOpen,
  increaseYear,
  decreaseYear,
  jumpForward,
  jumpBackward,
  thisYear,
  choiseYear,
  top,
  left
}) {
  if (!isOpen) {
    return null;
  }

  let style = {
    top: top + "px",
    left: left + "px"
  };

  function headerWheel(e) {
    e.preventDefault();
    const delta = e.deltaY;
    if (delta < 0) {
      increaseYear();
    } else {
      decreaseYear();
    }
  }

  function panelKey(e) {
    console.log(e.altKey);
    console.log(e.key);
    console.log(e.keyCode);
    console.log(e.metaKey);
  }

  return (
    <div className="picker-panel popup-left" style={style} onKeyUp={panelKey}>
      <div className="header" onWheel={headerWheel}>
        <JumpButton onClick={jumpBackward} direction="backward" />
        <Button onClick={decreaseYear} direction="backward" />
        <CurrentYear year={selectedYear} />
        <Button onClick={increaseYear} direction="forward" />
        <JumpButton onClick={jumpForward} direction="forward" />
      </div>
      <div className="body">
        <YearsList choiseYear={choiseYear} selectedYear={selectedYear} />
      </div>
      <div className="footer">
        <span className="footer-btn">
          <a className="footer-today" onClick={thisYear}>
            Today
          </a>
        </span>
      </div>
    </div>
  );
}

export default PickerPanel;
