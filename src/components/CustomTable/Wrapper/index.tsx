/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable class-methods-use-this */
import React from "react";
import { BaseEditorComponent } from "@handsontable/react";
import { TableField } from "../../TableField";

type WrapperState = {
  value: any;
  options: string[];
};

class Wrapper extends BaseEditorComponent<any, WrapperState> {
  private mainElementRef = React.createRef<HTMLDivElement>();

  private containerStyle: React.CSSProperties = {
    display: "none",
    position: "absolute",
    left: 0,
    top: 0,
    background: "#fff",
    border: "1px solid #000",
    padding: "15px",
    zIndex: 999,
  };

  constructor(props: any) {
    console.log({ props });
    super(props);
    this.state = { value: "", ...props };

    console.log("Rendered");
  }

  setValue(value: any) {
    this.setState((state, props) => {
      return { value };
    });
  }

  setOptions(options: any) {
    this.setState((state: any, prop: any) => {
      return { options, ...state };
    });
  }

  prepare(
    row: any,
    col: any,
    prop: any,
    td: any,
    originalValue: any,
    cellProperties: any,
  ) {
    super.prepare(row, col, prop, td, originalValue, cellProperties);
    this.setValue(originalValue);
    this.setOptions(cellProperties.options);
    this.cellProperties;

    const tdPosition = td.getBoundingClientRect();

    if (this.mainElementRef.current) {
      this.mainElementRef.current.style.left = `${
        tdPosition.left + window.pageXOffset
      }px`;
      this.mainElementRef.current.style.top = `${
        tdPosition.top + window.pageYOffset
      }px`;
    }
  }

  getValue() {
    return this.state.value;
  }

  open() {
    if (this.mainElementRef.current) {
      this.mainElementRef.current.style.display = "block";
    }
  }

  close() {
    if (this.mainElementRef.current) {
      this.mainElementRef.current.style.display = "none";
    }
  }

  stopMousedownPropagation(e: React.MouseEvent) {
    e.stopPropagation();
  }

  render() {
    return (
      <TableField
        className="ok"
        column={this.state.column}
        instance={this.state.instance}
        prop={this.state.instance}
        value={["s"]}
        type="radio"
        options={this.state.options}
        // handleSetNewValue={handleSetNewValue}
        dataProvider={this.state.dataProvider}
        templateId={this.state.templateId}
      />
    );
  }
}

export default Wrapper;
