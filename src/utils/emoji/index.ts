const groups = require('./groups.json');

/**
 * Return emojis by group name
 * @param name - group name
 * @return - emoji names
 */
export function emojiList(name: string): string[] {
  return groups[name];
}

/**
 * Return emoji's groups
 * @return - group names
 */
export function emojiGroups(): string[] {
  return Object.keys(groups);
}
