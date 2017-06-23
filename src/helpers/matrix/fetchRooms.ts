// TODO Refactor

import matrix from '../../utils/matrix';

export const rooms = (response) => {
  const onlyDialogs = (room) => {
    const membersIds = Object.keys(room.currentState.members);
    const messages = room.timeline.map((e) => e.event.type === 'm.room.message');

    return membersIds.length === 2 && messages.includes(true);
  };

  const map = (room) => {
    const keys = Object.keys(room.currentState.members);
    const anotherGuyId = keys.filter((id) => id !== matrix.credentials.userId)[0];

    const lastMessage = room.timeline
      .filter((e) => e.event.type === 'm.room.message')
      .map((e) => ({
        timestamp: Date.parse(e._date),
        preview: e.event.content.body,
        sender: e.sender.name
      }));

    const type = 'dialog';
    const id = room.roomId;
    const title = room.currentState.members[anotherGuyId].name;
    const src = '';
    const timestamp = lastMessage[lastMessage.length - 1].timestamp;
    const unreadIn = false;
    const unreadOut = false;
    const last = lastMessage[lastMessage.length - 1].sender;
    const preview = lastMessage[lastMessage.length - 1].preview;

    return {
      type,
      id,
      title,
      src,
      timestamp,
      unreadIn,
      unreadOut,
      last,
      preview
    };
  };

  const result = response.filter(onlyDialogs).map(map);

  return result;
};
