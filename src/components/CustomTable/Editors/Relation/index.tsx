import React, { ReactNode, createRef } from "react";
import { BaseEditorComponent } from "@handsontable/react";

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
      value: "",
      currentIndex: 0,
      isOpen: false,
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

      // this.navigateToNextDownCell();
      event.preventDefault();
      return;
    }

    if (["Tab"].includes(event.key)) {
      this.close();
      this.finishEditing();
      // this.navigateToNextRightCell();
    }

    if (["Escape"].includes(event.key)) {
      this.close();
      this.finishEditing();
    }
  };

  setValue(value: any): void {
    console.log("On set", { value });
    // // const parsedValue = typeof value === "string" ? [{}] : value;
    this.setState({ value, newValue: value });
  }

  getValue(): any {
    return this.state.newValue;
  }

  open(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "block";
    document.addEventListener("keydown", this.onBeforeKeyDown, true);

    console.log("Dentro do open", this.state.value);
    this.setState({ isOpen: true });
  }

  close(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "none";
    document.removeEventListener("keydown", this.onBeforeKeyDown, true);

    this.setState({ isOpen: false });

    console.log("On close");
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
    let value: any[];
    if (originalValue) {
      value =
        typeof originalValue === "object" && originalValue?.length
          ? originalValue
          : [{}];
    } else {
      value = [{}];
    }

    console.log({ value });
    this.setState({ row, col, newValue: originalValue });

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

  navigateToNextRightCell(): void {
    const { hotInstance } = this;
    if (hotInstance) {
      const { row, col } = this.state;
      hotInstance.selectCell(row, col + 1);
    }
  }

  handleChange(value: any): void {
    this.finishEditing();

    const { hotInstance } = this;
    if (hotInstance) {
      hotInstance.setDataAtCell(this.state.row, this.state.col, value);
    }
    this.navigateToNextRightCell();
  }

  handleCancel(): void {
    this.close();
    this.finishEditing();
  }

  stopMousedownPropagation(e: any): void {
    e.stopPropagation();
  }

  render(): ReactNode {
    return (
      <div
        ref={this.rootRef}
        style={this.containerStyle}
        onClick={() => console.log()}
        id="editorElement"
        onMouseDown={this.stopMousedownPropagation}
      >
        {this.state.isOpen === true ? (
          <Relation
            column={this.props.column}
            currentValue={this.state.newValue}
            row={this.state.row}
            templateId={this.props.templateId}
            field={this.props.field}
            dataProvider={this.props.dataProvider}
            onChange={(newValue: Array<any>): void => {
              this.handleChange(newValue?.filter(Boolean));
              // this.setValue(newValue);

              // this.setState({ newValue: newValue?.filter(Boolean) });
              // this.finishEditing();
            }}
            onCancel={() => this.handleCancel()}
          />
        ) : (
          <></>
        )}
        {/* <button
          onClick={() => {
            this.handleChange([
              { id: "asd", value: "11" },
              { id: "sss", value: "snake" },
            ]);
          }}
        >
          CLICK
        </button> */}
      </div>
    );
  }
}

export default RelationEditor;
