import matrix from '../../utils/matrix';
import md5 from 'js-md5';

import { Room } from '../../redux/modules/messenger/rooms';
import { User } from '../../redux/modules/contacts/newContact';

/**
 * Add domain to matrixUserId
 * @param id string matrixUserId without domain
 * @return string matrixUserId with domain
 */

export const addDomain = (id: string): string => `${id}:${matrix.getDomain()}`;

/**
 * Remove domain from matrixUserId
 * @param id string matrixUserId with domain
 * @return string matrixUserId without domain
 */

export const removeDomain = (id: string): string => id.split(':')[0];

/**
 * create 1-1 room alias
 * @param id1 user id
 * @param id2 another guy id
 * @param domain matrix domain
 */

export const createAlias = (id1: string, id2: string, domain: string): string => {
  const ids = [removeDomain(id1), removeDomain(id2)].sort();
  const hash = md5(`${ids[0]}:${ids[1]}`);
  return `#${hash}:${domain}`;
};

/**
 * Clearing matrixId
 * @param matrixId matrix id
 * @return clear matrix id
 */

export const clearMatrixId = (matrixId: string): string => {
  return matrixId.split('.').join('+');
};

/**
 * Restoring matrixId
 * @param cMatrixId clear matrix id
 * @return matrix id
 */

export const restoreMatrixId = (cMatrixId: string): string => {
  return cMatrixId.split('+').join('.');
};

/**
 * Get matrixIds from Rooms
 * @param rooms MatrixRooms[]
 * @return matrixId string
 */

export const getIdsFromRooms = (rooms): string => {
  const result = rooms.reduce((acc, room) => {
    const membersIds = Object.keys(room.currentState.members);
    const matrixId = membersIds.filter((id) => id !== matrix.credentials.userId)[0];

    return matrixId ? acc.concat([removeDomain(matrixId)]) : acc;
  }, []);

  return result.filter((id) => id);
};

/**
 * Get matrixIds from Room without domain
 * @param room MatrixRoom
 * @return matrixIds string[]
 */

export const getMembersIdsFromRoom = (room): string[] => {
  const keys = Object.keys(room.currentState.members);

  return keys.map((key) => removeDomain(key));
};

/**
 * Store rooms
 * @param matrixRooms MatrixRoom[]
 * @param users User[]
 */

export const createRooms = (matrixRooms, users: User[]): Room[] => {
  const roomsWithMessages = matrixRooms.filter((room) => {
    const membersIds = Object.keys(room.currentState.members);
    const messages = room.timeline.map((e) => e.event.type === 'm.room.message');

    return membersIds.length === 2 && messages.includes(true);
  });

  const data = users.reduce((acc, user) => {
    const matrixRoom = roomsWithMessages.filter((room) => room.currentState.members[addDomain(user.matrixId)])[0];

    // const lastSender = (id: string): string => {
    //   if (id !== matrix.credentials.userId) {
    //     return user.name;
    //   }
    //   return '';
    // };

    if (matrixRoom) {
      const lastMessage = matrixRoom.timeline
        .filter((e) => e.event.type === 'm.room.message')
        .map((e) => ({
          timestamp: Date.parse(e._date),
          preview: e.event.content.body,
          sender: e.sender.name
        }));

      const room = {
        type: 'dialog',
        id: matrixRoom.roomId,
        userId: user.id,
        title: user.name,
        src: user.avatar,
        timestamp: lastMessage[lastMessage.length - 1].timestamp,
        unreadIn: false,
        unreadOut: false,
        // last: lastSender(lastMessage[lastMessage.length - 1].sender),
        last: '',
        preview: lastMessage[lastMessage.length - 1].preview
      };

      return acc.concat([room]);
    }

    return acc;
  }, []);

  return data.sort((a, b) => b.timestamp - a.timestamp);
};

export const membersTransformer = (members) => {
  return members.reduce((acc, member) => {
    return Object.assign(acc, { [member.matrixId]: member });
  }, {});
};

export const getMembersIds = (members) =>
  members.map((member) => removeDomain(member.userId));

export const getAnotherGuyId = (members) =>
  Object.keys(members).reduce((acc, id) =>
    id !== removeDomain(matrix.credentials.userId)
      ? id
      : acc, '');
