import { Room, User } from '../../redux/modules/messenger/messenger';

export const getRoomById = (rooms: Room[], roomId: string): Room => {
  return rooms.find((room) => room.id === roomId);
}

export const getUserById = (users: User[], userId: string): User => {
  return users.find((user) => user.id === userId);
}