/**
 * Filter array of contacts by search query
 * [firstName, lastName, companyName, position] fields
 * @param contacts Contact[] contacts array
 * @param query string search query
 * @param keys string[]
 * @return contacts Contact[]
 */

export const filterContacts = (contacts: any[], query: string, keys: string[]): any[] => {
  if (query.length < 1) {
    return contacts;
  }

  return contacts.filter((contact) => {
    return keys.reduce((acc, key) => {
      if (acc) return acc;

      if (contact[key].toLowerCase().indexOf(query.toLowerCase()) === 0) {
        return true;
      }

      return acc;
    }, false);
  });
};
