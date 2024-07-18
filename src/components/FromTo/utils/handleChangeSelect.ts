export default function handleChangeSelect(
  title: string,
  value: string,
  listType: string[],
  setValue: React.Dispatch<React.SetStateAction<any>>,
): void {
  if (listType.includes(title)) {
    setValue((prev: any) => ({
      ...prev,
      [title]: value,
    }));
  }
}
