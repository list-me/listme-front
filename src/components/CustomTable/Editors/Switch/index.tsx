/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable class-methods-use-this */
import React, { ReactNode, createRef } from "react";
import { Switch } from "antd";
import { BaseEditorComponent } from "@handsontable/react";

class SwitchEditor extends BaseEditorComponent<any, any, any> {
  rootRef = createRef<HTMLDivElement>();

  constructor(props: any) {
    super(props);
    this.state = {
      value: false,
    };
  }

  handleChange = (checked: boolean): void => {
    this.setState({ value: checked });
    this.hotInstance.setDataAtCell(this.props.row, this.props.col, [
      checked.toString(),
    ]);
    this.navigateToNextRow();
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    console.log("oioioi");
    if (event.key === "Enter") {
      console.log("veio");
      this.handleChange(!this.state.value);
      // event.preventDefault();
      // event.stopPropagation();
    }
  };

  getValue(): string[] {
    const { value } = this.state;
    return [value.toString()];
  }

  setValue(value: string): void {
    const parsedValue = value === "true";
    this.setState({ value: parsedValue });
  }

  open(): void {
    this.rootRef.current?.focus();
  }

  close(): void {}

  prepare(
    row: number,
    col: number,
    prop: any,
    td: any,
    originalValue: any,
    cellProperties: any,
  ): void {
    super.prepare(row, col, prop, td, originalValue, cellProperties);
    const value = originalValue ? originalValue[0] === "true" : false;
    this.setState({ value });
  }

  navigateToNextRow(): void {
    const { hotInstance, row, col } = this;
    if (hotInstance) {
      hotInstance.selectCell(row + 1, col);
    }
  }

  render(): ReactNode {
    const { value } = this.state;
    return (
      <div
        ref={this.rootRef}
        onKeyDown={this.handleKeyDown}
        style={{ position: "absolute", opacity: 0, top: 0 }}
      >
        <Switch checked={value} onChange={this.handleChange} />
      </div>
    );
  }
}

export default SwitchEditor;
