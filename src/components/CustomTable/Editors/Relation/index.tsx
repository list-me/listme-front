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
    };
  }

  onBeforeKeyDown = (event: KeyboardEvent): void => {
    // const target = event.target as HTMLDivElement;
    // if (target.tagName !== "TEXTAREA") {
    //   console.log({ target });
    //   event.stopImmediatePropagation();
    //   event.preventDefault();
    // }
    // if (event.key === "Enter") {
    //   console.log("ON ENTER");
    //   this.navigateToNextDownCell();
    // }
    // if (["Tab"].includes(event.key)) {
    //   this.close();
    //   this.finishEditing();
    //   // this.navigateToNextRightCell();
    // }
    // if (["Escape"].includes(event.key)) {
    //   this.close();
    //   this.finishEditing();
    // }
  };

  setValue(value: any): void {
    this.setState({ value });
  }

  getValue(): any {
    return this.state.newValue;
  }

  open(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "block";
    // document.addEventListener("keydown", this.onBeforeKeyDown, true);

    // console.log("Dentro do open", this.state.value);
    this.setState({ isOpen: true });
  }

  close(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "none";
    // document.removeEventListener("keydown", this.onBeforeKeyDown, true);

    this.setState({ isOpen: false });
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
          : [];
    } else {
      value = [];
    }

    this.setState({ row, col, newValue: value });

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

  navigateToNextDownCell(): void {
    const { hotInstance } = this;
    if (hotInstance) {
      const { row, col } = this.state;
      hotInstance.selectCell(row + 1, col);
    }
  }

  handleChange(value: any): void {
    const { hotInstance } = this;
    if (hotInstance) {
      hotInstance.setDataAtCell(this.state.row, this.state.col, value);
      this.navigateToNextRightCell();
    }

    this.close();
    this.finishEditing();
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
            onChange={(newValue: Array<any>): void =>
              this.handleChange(newValue?.filter(Boolean))
            }
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
