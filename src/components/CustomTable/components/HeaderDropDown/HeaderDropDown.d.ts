interface IDropDownStatus {
  type: "cell" | "new" | "none";
  coordX: number;
  coordY: number;
  col: number;
}

// eslint-disable-next-line import/prefer-default-export
export { IDropDownStatus };
