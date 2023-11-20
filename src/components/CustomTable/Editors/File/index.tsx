/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/prefer-default-export */
import React, { ReactNode, createRef } from "react";
import { BaseEditorComponent } from "@handsontable/react";
import { FileProps, FileState } from "./File.d";
import Dropzone from "../../../Dropzone";
import { productContext } from "../../../../context/products";

export class FileEditor extends BaseEditorComponent<FileProps, FileState, any> {
  rootRef = createRef<HTMLDivElement>();

  loadingRef = createRef<HTMLDivElement>();

  containerStyle: any;

  loadingStyle: any;

  static contextType = productContext;

  context!: React.ContextType<typeof productContext>;

  constructor(props: any) {
    super(props);

    this.state = {
      value: [""],
      newValue: [""],
      currentIndex: 0,
      isOpen: false,
      isLoading: false,
    };

    this.containerStyle = {
      display: "none",
    };
  }

  setValue(value: any): void {
    this.setState({ value });
  }

  getValue(): any {
    return this.state.newValue;
  }

  onBeforeKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Tab") {
      this.finishEditing();
    }
  };

  open(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "block";
    document.addEventListener("keydown", this.onBeforeKeyDown, true);
  }

  close(): void {
    if (this.rootRef.current) this.rootRef.current.style.display = "none";
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

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.onBeforeKeyDown, true);
  }

  render(): ReactNode {
    return (
      <>
        <input type="file" multiple style={{ display: "none" }} />
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
                this.finishEditing();
                this.navigateToNextRightCell();
              }}
              onSuccess={(images: Array<string>) => {
                this.setState({ newValue: images });
                this.setValue(images);

                this.TD.setAttribute("data-new-value", JSON.stringify(images));
              }}
              instance={this.hotInstance}
              companyId={this.props.companyId}
              row={this.row}
            />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}
