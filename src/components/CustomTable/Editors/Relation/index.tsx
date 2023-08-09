import { BaseEditorComponent } from "@handsontable/react";
import React, { ReactNode, createRef } from "react";

import { RelationProps, RelationState } from "./Relation.d";
import { Relation } from "../../../TableField/Relation";

class RelationEditor extends BaseEditorComponent<
  RelationProps,
  RelationState,
  any
> {
  rootRef = createRef<HTMLDivElement>();

  containerStyle: any;

  constructor(props: any) {
    super(props);

    this.state = {
      value: [""],
      newValue: "",
      currentIndex: 0,
    };

    this.containerStyle = {
      display: "none",
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

      // this.navigateToNextDownCell();
      event.preventDefault();
      return;
    }

    if (["Tab", " "].includes(event.key)) {
      this.finishEditing();
      this.close();
      // this.navigateToNextRightCell();
    }

    if (["Escape"].includes(event.key)) {
      this.finishEditing();
      this.close();
    }
  };

  setValue(value: string): void {
    this.setState({ newValue: value, value: [value] });
  }

  getValue(): string[] {
    return [this.state.newValue];
  }

  open(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "block";
    document.addEventListener("keydown", this.onBeforeKeyDown, true);
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

    this.setState({ row, newValue: value, col });
  }

  stopMousedownPropagation(e: any): void {
    e.stopPropagation();
  }

  render(): ReactNode {
    return (
      <div ref={this.rootRef} style={this.containerStyle}>
        {this.rootRef.current! &&
        this.rootRef.current!.style.display === "block" ? (
          <Relation
            column={this.props.column}
            currentValue={this.state.value}
            row={this.state.row}
            templateId={this.props.templateId}
            field={this.props.field}
            dataProvider={this.props.dataProvider}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default RelationEditor;
