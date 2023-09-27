export function isCommandString(message: string): boolean {
  return message.startsWith("/");
}