import "babel-polyfill";
import "element-closest";
import React, { Component } from "react";
import YearInput from "./components/YearInput";
import PickerPanel from "./components/PickerPanel/index";

class YearPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: "",
      yearIsSelected: false,
      selectedYear: new Date().getFullYear(),
      panelIsOpen: false
    };
  }

  position = () => {
    const picker = document.querySelector(".year-picker");
    const X = picker.getBoundingClientRect().left; // расстояние от левой стороны окна до левой стороны элемента
    const horizontalCenter = X + picker.getBoundingClientRect().width / 2; //расстояние от левой стороны окна до центра элемента по горизонтали

    const Y = picker.getBoundingClientRect().bottom; //расстояние от верхней стороны окна до нижней стороны элемента
    const verticalCenter = Y + picker.getBoundingClientRect().height / 2; //расстояние от верхней стороны окна до центра элемента по вертикали

    const elementHeight = picker.getBoundingClientRect().height; // Высота элемента
    const elementWidth = picker.getBoundingClientRect().width; // Ширина элемента

    const windowHeight = window.innerHeight; //высота окна браузера
    const windowWidth = window.innerWidth; // ширина окна браузера

    if (windowHeight - Y > 240) {
      const top = Y + 20;
      console.log(top);
    } else {
      const top = Y - 20 - windowHeight;
      console.log(top);
    }
  };

  componentDidMount() {
    document.addEventListener("scroll", E => this.position());
    document.addEventListener(
      "click",
      function(event) {
        if (!event.target.closest(".year-picker")) {
          this.closePanel();
        }
      }.bind(this)
    );
  }

  openPanel = event => {
    this.setState({ panelIsOpen: true });
  };

  closePanel = event => {
    this.setState({ panelIsOpen: false });
  };

  choiseYear = year => {
    this.setState({
      selectedYear: year,
      currentYear: year,
      yearIsSelected: true
    });
    this.closePanel();
  };

  clearYear = () => {
    this.setState({
      selectedYear: new Date().getFullYear(),
      currentYear: "",
      yearIsSelected: false
    });
  };

  increaseYear = event => {
    this.setState({ selectedYear: this.state.selectedYear + 1 });
  };

  decreaseYear = event => {
    this.setState({ selectedYear: this.state.selectedYear - 1 });
  };

  jumpForward = event => {
    this.setState({ selectedYear: this.state.selectedYear + 5 });
  };

  jumpBackward = event => {
    this.setState({ selectedYear: this.state.selectedYear - 5 });
  };

  thisYear = event => {
    const year = new Date().getFullYear();
    this.setState({
      currentYear: year,
      selectedYear: year,
      yearIsSelected: true
    });
    this.closePanel();
  };

  render() {
    return (
      <div className="year-picker">
        <YearInput
          value={this.state.currentYear}
          openPanel={this.openPanel}
          selected={this.state.yearIsSelected}
          clear={this.clearYear}
        />
        <PickerPanel
          isOpen={this.state.panelIsOpen}
          selectedYear={this.state.selectedYear}
          currentYear={this.state.currentYear}
          increaseYear={this.increaseYear}
          decreaseYear={this.decreaseYear}
          jumpForward={this.jumpForward}
          jumpBackward={this.jumpBackward}
          thisYear={this.thisYear}
          choiseYear={this.choiseYear}
        />
      </div>
    );
  }
}

export default YearPicker;
