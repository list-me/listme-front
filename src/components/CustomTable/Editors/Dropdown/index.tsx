import React, { ReactNode, createRef } from "react";

import { BaseEditorComponent } from "@handsontable/react";
import {
  DropdownState,
  DropdownProps,
  NavigationAction,
  Navigate,
  NavigationFunction,
} from "./Dropdown.d";
import { Item, Select } from "./styles";

class DropdownEditor extends BaseEditorComponent<
  DropdownProps,
  DropdownState,
  any
> {
  rootRef = createRef<HTMLDivElement>();

  selectRef = createRef<HTMLDivElement>();

  containerStyle: any;

  navigate: Navigate = {
    [NavigationAction.RIGHT]: this.navigateToNextRightCell.bind(this),
    [NavigationAction.DOWN]: this.navigateToNextDownCell.bind(this),
  };

  constructor(props: any) {
    super(props);

    this.state = {
      value: [""],
      dropdownRefs: this.props.options.map(() =>
        React.createRef<HTMLDivElement>(),
      ),
      currentIndex: 0,
    };

    this.containerStyle = {
      display: "none",
      position: "absolute",
      left: 0,
      top: 0,
      width: "fit-content",
      height: "fit-content",
      background: "#fff",
      padding: "12px 4px",
      zIndex: 999,
      borderRadius: "8px",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    };
  }

  onBeforeKeyDown = (event: KeyboardEvent): void => {
    const target = event.target as HTMLDivElement;
    if (target.tagName !== "textarea") {
      event.stopImmediatePropagation();
    }

    const { options } = this.props;
    let { currentIndex } = this.state;

    if (["ArrowDown", "ArrowLeft"].includes(event.key)) {
      currentIndex = (currentIndex + 1) % options.length;
      this.setState({ currentIndex });
      return;
    }

    if (["ArrowUp", "ArrowRight"].includes(event.key)) {
      currentIndex = (currentIndex - 1 + options.length) % options.length;
      this.setState({ currentIndex });
      return;
    }

    if (event.key === "Enter") {
      if (target) {
        this.handleChange(
          this.state.dropdownRefs[currentIndex].current.innerText?.trim(),
          this.navigate[NavigationAction.DOWN],
        );
      }
      event.preventDefault();
      return;
    }

    if (["Tab", " "].includes(event.key)) {
      this.handleChange(
        this.state.dropdownRefs[currentIndex].current.innerText?.trim(),
        this.navigate[NavigationAction.RIGHT],
      );
    }

    if (["Escape"].includes(event.key)) {
      this.finishEditing();
    }
  };

  navigateToNextDownCell(): void {
    const { hotInstance } = this;
    if (hotInstance) {
      const { row, col } = this.state;
      hotInstance.selectCell(row + 1, col);
    }
  }

  navigateToNextRightCell(): void {
    const { hotInstance } = this;
    if (hotInstance) {
      const { row, col } = this.state;
      hotInstance.selectCell(row, col + 1);
    }
  }

  setValue(value: any): void {
    this.setState({ value });
  }

  getValue(): string[] {
    return this.state.newValue;
  }

  open(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "block";
    document.addEventListener("keydown", this.onBeforeKeyDown, true);

    requestAnimationFrame(() => {
      const selectedRadio =
        this.state.dropdownRefs[this.state.currentIndex]?.current;
      if (selectedRadio) {
        selectedRadio.focus();
      }
    });
  }

  close(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "none";
    document.removeEventListener("keydown", this.onBeforeKeyDown, true);
  }

  prepare(
    row: number,
    col: number,
    prop: any,
    td: any,
    originalValue: any,
    cellProperties: any,
  ): void {
    super.prepare(row, col, prop, td, originalValue, cellProperties);
    let value: string;
    if (originalValue) {
      value =
        typeof originalValue === "object"
          ? originalValue[0]
          : originalValue ?? "";
    } else {
      value = "";
    }

    const currentIndex = this.props.options.indexOf(value);
    this.setState({ currentIndex, row, col, newValue: [value] });

    const tdPosition = td.getBoundingClientRect();
    if (this.rootRef.current!) {
      this.rootRef.current.style.left = `${
        tdPosition.left + window.pageXOffset
      }px`;
      this.rootRef.current.style.top = `${
        tdPosition.top + 57 + window.pageYOffset
      }px`;
    }
  }

  handleChange(value: string, action: NavigationFunction): void {
    this.setState({ value: [value], newValue: [value] }, () => {
      this.finishEditing();
      action();
    });
  }

  handleClick = (value: string): void => {
    this.setState({ value: [value], newValue: [value] }, () => {
      this.finishEditing();
    });
  };

  stopMousedownPropagation(e: any): void {
    e.stopPropagation();
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.onBeforeKeyDown, true);
  }

  render(): ReactNode {
    return (
      <div
        style={this.containerStyle}
        ref={this.rootRef}
        id="editorElement"
        onMouseDown={this.stopMousedownPropagation}
      >
        <Select tabIndex={0}>
          {this.props.options.map((option: string, index: number) => {
            return (
              <Item
                key={index}
                ref={this.state.dropdownRefs[index]}
                tabIndex={-1}
                style={{
                  background:
                    index === this.state.currentIndex ? "#3818d9" : "white",
                  color: index === this.state.currentIndex ? "white" : "black",
                }}
                onClick={() => {
                  this.handleClick(option);
                }}
                defaultValue={option}
              >
                {" "}
                {option}{" "}
              </Item>
            );
          })}
        </Select>
      </div>
    );
  }
}

export default DropdownEditor;
