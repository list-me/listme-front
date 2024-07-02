/* eslint-disable no-plusplus */
function generateColorArray(size: number): string[] {
  const colors = [
    "#CC5DE8",
    "#1CC2D8",
    "#AE423D",
    "#88C13D",
    "#E17A38",
    "#DE3948",
    "#CC9833",
    "#69155F",
    "#3D8A9C",
    "#7E8A84",
    "#371B22",
    "#34344C",
  ];
  const repeatedArray = [];

  for (let i = 0; i < size; i++) {
    repeatedArray.push(colors[i % colors.length]);
  }

  return repeatedArray;
}

export default generateColorArray;
