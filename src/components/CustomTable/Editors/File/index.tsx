/* eslint-disable import/prefer-default-export */
import React, { ReactNode, createRef } from "react";
import { BaseEditorComponent } from "@handsontable/react";
import { FileProps, FileState } from "./File.d";
import Dropzone from "../../../Dropzone";

export class FileEditor extends BaseEditorComponent<FileProps, FileState, any> {
  rootRef = createRef<HTMLDivElement>();

  containerStyle: any;

  constructor(props: any) {
    super(props);

    this.state = {
      value: [""],
      newValue: [""],
      currentIndex: 0,
      isOpen: false,
    };

    this.containerStyle = {
      display: "none",
    };
  }

  setValue(value: any): void {
    this.setState({ value });
  }

  getValue(): any {
    return this.state.value;
  }

  open(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "block";
    // document.addEventListener("keydown", this.onBeforeKeyDown, true);

    // console.log("Dentro do open", this.state.value);
  }

  close(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "none";
    // document.removeEventListener("keydown", this.onBeforeKeyDown, true);
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

    const productId = this.props.dataProvider[row][prop]
      ? this.props.dataProvider[row]?.id
      : undefined;

    this.setState({
      newValue: originalValue,
      field: prop,
      productId,
      row,
      col,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  stopMousedownPropagation(e: any): void {
    e.stopPropagation();
  }

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

  render(): ReactNode {
    return (
      <div
        ref={this.rootRef}
        style={this.containerStyle}
        id="editorElement"
        onMouseDown={this.stopMousedownPropagation}
      >
        {this.rootRef.current!?.style?.display === "block" ? (
          <Dropzone
            templateId={this.props.templateId}
            value={this.state.newValue}
            field={this.state.field}
            productId={this.state.productId}
            onCancel={() => {
              this.navigateToNextRightCell();
              this.close();
              this.finishEditing();
            }}
            onSuccess={(images: Array<string>) => {
              this.setState({ newValue: images });
              this.setValue(images);

              // console.log({ images });
            }}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}
