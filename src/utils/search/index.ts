export type SearchNewContactRequest = {
  email: string
  page?: number
  perPage?: number
};

export const request = (payload: SearchNewContactRequest): string => {
  const props = Object.keys(payload);

  return props.reduce((acc, prop, i) =>
    !payload[prop] ? acc : `${acc}${prop}=${payload[prop]}&`, '')
    .slice(0, -1);
};
