import { Room, User } from '../../redux/modules/messenger/messenger';
import { removeDomain } from '../matrix';

export const getRoomById = (rooms: Room[], roomId: string): Room => {
  return rooms.find((room) => room.id === roomId);
};

export const getUserById = (users: User[], userId: string): User => {
  return users.find((user) => user.id === userId);
};

export const getUserByMatrixId = (users: User[], userMatrixId: string): User => {
  return users.find((user) => user.matrixId === removeDomain(userMatrixId));
};
