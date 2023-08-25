enum NavigationAction {
  RIGHT = "right",
  DOWN = "down",
  UP = "up",
  LEFT = "left",
}

type NavigationFunction = () => void;

type Navigate = { [key in NavigationAction]: NavigationFunction };

export { NavigationAction, NavigationFunction, Navigate };
