/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable class-methods-use-this */
import React, { ReactNode, createRef } from "react";
import { BaseEditorComponent } from "@handsontable/react";
import { CheckBoxProps, CheckBoxState } from "./CheckBox";
import { Container, Input, Label, Option } from "./styles";

class CheckBoxEditor extends BaseEditorComponent<
  CheckBoxProps,
  CheckBoxState,
  any
> {
  rootRef = createRef<HTMLDivElement>();

  containerStyle: any;

  constructor(props: any) {
    super(props);
    this.state = {
      value: [],
      newValue: [],
      radioRefs: this.props.options.map(() =>
        React.createRef<HTMLInputElement>(),
      ),
      currentIndex: 0,
      options: this.props.options,
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
        this.handleChange(target.value);
        this.close();
      }

      this.navigateToNextDownCell();
      event.preventDefault();
      return;
    }

    if (["Tab", " "].includes(event.key)) {
      this.close();
      this.navigateToNextRightCell();
    }

    if (["Escape"].includes(event.key)) {
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
    return this.state.newValue;
  }

  open(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "block";
    document.addEventListener("keydown", this.onBeforeKeyDown, true);

    requestAnimationFrame(() => {
      const selectedCheckBox =
        this.state.radioRefs[this.state.currentIndex]?.current;
      if (selectedCheckBox) {
        selectedCheckBox.focus();
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

  handleChange(value: string): void {
    const currentValues =
      typeof this.state.newValue === "string"
        ? this.state.newValue.split(",")
        : this.state.newValue;

    const newValue = currentValues.filter(
      (item: string) => item.length > 0 && this.state.options.includes(item),
    );

    const valueIndex = newValue.indexOf(value);

    let updatedValue: string[];

    if (valueIndex === -1) {
      updatedValue = [...newValue, value];
    } else {
      updatedValue = newValue.filter((val: any) => val !== value);
    }

    // @ts-ignore
    this.setState({ newValue: updatedValue.length ? updatedValue : [""] });
  }

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
        <Container>
          {this.props.options.map((option: string, index: number) => {
            const isChecked =
              typeof this.state.newValue === "string"
                ? this.state.newValue.split(",")?.includes(option)
                : this.state.newValue?.includes(option);

            return (
              <Option key={index} isChecked={isChecked}>
                <Label>
                  <Input
                    type="checkbox"
                    value={option}
                    checked={isChecked}
                    onChange={(e) => this.handleChange(e.target.value)}
                    ref={this.state.radioRefs[index]}
                  />
                  {option}
                </Label>
              </Option>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default CheckBoxEditor;
