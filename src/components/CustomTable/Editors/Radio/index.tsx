/* eslint-disable @typescript-eslint/no-useless-constructor */
import React, { createRef } from "react";

import { BaseEditorComponent } from "@handsontable/react";
import { BaseEditor } from "handsontable/editors";
import { RadioProps, RadioState } from "./Radio";

class RadioEditor extends BaseEditor<RadioProps, RadioState> {
  state: RadioState = {
    value: this.props.value ?? "",
    newValue: "",
  };

  rootRef = createRef<HTMLDivElement>();

  constructor(props: any) {
    super(props);

    super.cre;
  }

  //   setValue(value: string, callback: () => {}): void {
  //     this.setState((state: any, props: any) => {
  //       return { value };
  //     }, callback);
  //   }

  //   getValue() {
  //     return this.state.value;
  //   }

  //   open() {
  //     if (this.rootRef.current) this.rootRef.current.style.display = "block";
  //   }

  //   close() {
  //     if (this.rootRef.current) this.rootRef.current.style.display = "none";
  //   }

  //   prepare(
  //     row: any,
  //     col: any,
  //     prop: any,
  //     td: any,
  //     originalValue: any,
  //     cellProperties: any,
  //   ) {
  //     // We'll need to call the `prepare` method from
  //     // the `BaseEditorComponent` class, as it provides
  //     // the component with the information needed to use the editor
  //     // (hotInstance, row, col, prop, TD, originalValue, cellProperties)
  //     super.prepare(row, col, prop, td, originalValue, cellProperties);

  //     const tdPosition = td.getBoundingClientRect();

  //     // As the `prepare` method is triggered after selecting
  //     // any cell, we're updating the styles for the editor element,
  //     // so it shows up in the correct position.

  //     if (this.rootRef.current!) {
  //       this.rootRef.current.style.left = `${
  //         tdPosition.left + window.pageXOffset
  //       }px`;
  //       this.rootRef.current.style.top = `${
  //         tdPosition.top + window.pageYOffset
  //       }px`;
  //     }
  //   }

  //   setLowerCase() {
  //     this.setState(
  //       (state, props) => {
  //         return { value: this.state.value.toString().toLowerCase() };
  //       },
  //       () => {
  //         this.finishEditing();
  //       },
  //     );
  //   }

  render() {
    return <div> Value </div>;
  }
}

export default RadioEditor;
