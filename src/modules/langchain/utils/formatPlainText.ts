export function formatPlainText(input: string): string {
  return input
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*/g, '')
    .replace(/\n{2,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/ ([,.!?;:])/g, '$1')
    .trim();
}
