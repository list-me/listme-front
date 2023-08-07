import React, { ReactNode, createRef } from "react";

import { BaseEditorComponent } from "@handsontable/react";
import { DropdownState, DropdownProps } from "./Dropdown.d";

class DropdownEditor extends BaseEditorComponent<
  DropdownProps,
  DropdownState,
  any
> {
  rootRef = createRef<HTMLDivElement>();

  containerStyle: any;

  constructor(props: any) {
    super(props);

    this.state = {
      value: [""],
      newValue: "",
      radioRefs: this.props.options.map(() =>
        React.createRef<HTMLInputElement>(),
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
      padding: "15px",
      zIndex: 999,
      borderRadius: "8px",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    };
  }

  onBeforeKeyDown = (event: KeyboardEvent): void => {
    const target = event.target as HTMLInputElement;
    if (target.type !== "textarea") {
      event.stopImmediatePropagation();
    }

    if (event.key === "Enter") {
      if (target) {
        // this.handleChange(target.value);
        this.finishEditing();
        this.close();
      }

      this.navigateToNextDownCell();
      event.preventDefault();
      return;
    }

    if (["Tab", " "].includes(event.key)) {
      this.finishEditing();
      this.close();
      this.navigateToNextRightCell();
    }

    if (["Escape"].includes(event.key)) {
      this.finishEditing();
      this.close();
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

  setValue(value: string): void {
    this.setState({ newValue: value, value: [value] });
  }

  getValue(): string[] {
    return [this.state.newValue];
  }

  open(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "block";
    document.addEventListener("keydown", this.onBeforeKeyDown, true);

    requestAnimationFrame(() => {
      const selectedRadio =
        this.state.radioRefs[this.state.currentIndex]?.current;
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
    this.setState({ currentIndex, row, newValue: value, col });

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

  render(): ReactNode {
    return <></>;
  }
}

export default DropdownEditor;
