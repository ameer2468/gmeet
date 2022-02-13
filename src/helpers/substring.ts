export function shortenText(text:string, length: number) {
  return text.substring(0, length) + `${text.length > length ? '...' : ''}`;
}
