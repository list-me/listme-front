type DropdownProps = {
  options: string[];
};

type DropdownState = {
  value: string[];
  newValue: string[];
  dropdownRefs: Array<HTMLDivElement>;
  row: number;
  col: number;
  currentIndex: number;
};

enum NavigationAction {
  RIGHT = "right",
  DOWN = "down",
}
type NavigationFunction = () => void;

type Navigate = { [key in NavigationAction]: NavigationFunction };

export {
  DropdownProps,
  DropdownState,
  NavigationAction,
  Navigate,
  NavigationFunction,
};
