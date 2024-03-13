function formatDateTime(dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);

  const day = dateTime.getDate().toString().padStart(2, "0");
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // Adicionando 1 para compensar o índice base 0
  const year = dateTime.getFullYear().toString();

  return `${day}/${month}/${year}`;
}

export default formatDateTime;
