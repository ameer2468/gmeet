export function shortenText(text:string) {
  return text.substring(0, 200) + `${text.length > 200 ? '...' : ''}`;
}
