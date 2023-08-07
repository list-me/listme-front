import React, { createRef } from "react";
import { BaseEditorComponent } from "@handsontable/react";
import { RadioProps, RadioState } from "./Radio";
import { Container } from "./style";

class RadioEditor extends BaseEditorComponent<RadioProps, RadioState, any> {
  rootRef = createRef<HTMLDivElement>();

  containerStyle: any;

  constructor(props: any) {
    super(props);

    this.state = {
      value: "",
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
      border: "1px solid #000",
      padding: "15px",
      zIndex: 999,
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
        this.finishEditing();
        this.close();
      }

      this.navigateToNextCell();
      event.preventDefault();
    }

    if (event.key === "Tab") {
      this.finishEditing();
      this.close();
      this.navigateToNextCell();
    }
  };

  navigateToNextCell(): void {
    const { hotInstance } = this;
    if (hotInstance) {
      const { row, col } = this.state;
      hotInstance.selectCell(row, col + 1);
    }
  }

  setValue(value: string): void {
    this.setState({ value });
  }

  getValue(): string {
    return this.state.value;
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

    const value =
      typeof originalValue === "object"
        ? originalValue[0]
        : originalValue ?? "";

    const currentIndex = this.props.options.indexOf(value);
    this.setState({ currentIndex, value, row, col });

    const tdPosition = td.getBoundingClientRect();
    if (this.rootRef.current!) {
      this.rootRef.current.style.left = `${tdPosition.left + window.pageXOffset
        }px`;
      this.rootRef.current.style.top = `${tdPosition.top + 57 + window.pageYOffset
        }px`;
    }
  }

  handleChange(value: string): void {
    this.setState({ value });
  }

  stopMousedownPropagation(e: any): void {
    e.stopPropagation();
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.onBeforeKeyDown, true);
  }

  render() {
    return (
      <div
        style={this.containerStyle}
        ref={this.rootRef}
        id="editorElement"
        onMouseDown={this.stopMousedownPropagation}
      >
        <Container>
          <div className="radio-group">
            {this.props.options.map((option: string, index: number) => {
              const isChecked = option === this.state.value;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    value={option}
                    checked={isChecked}
                    onChange={(e) => this.handleChange(e.target.value)}
                    ref={this.state.radioRefs[index]}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
}

export default RadioEditor;
