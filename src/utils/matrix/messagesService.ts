import Matrix from 'matrix-js-sdk';
import matrix from '../../utils/matrix';
import { removeDomain } from '../../helpers/matrix';

type Message = {
  sender: string,
  timestamp: number,
  content: string
};

class MessagesService {
  private loadedRoomId;
  private timelineWindow;

  private getMessagesFromEvents(events): Message[] {
    const messages = events.reduce((acc, event) => {
      if (event.getType() === 'm.room.message') {
        return acc.concat([{
          sender: removeDomain(event.getSender()),
          timestamp: event.getTs(),
          content: event.getContent().body
        }]);
      } else {
        return acc;
      }
    }, []);

    return messages;
  }

  // Interface

  public initialize(roomId: string): Promise<any> {
    const room = matrix.getRoom(roomId);
    const timelineSet = room.getUnfilteredTimelineSet();
    this.timelineWindow = new Matrix.TimelineWindow(matrix, timelineSet);

    this.loadedRoomId = roomId;

    return this.timelineWindow.load(undefined, 30);
  }

  public isInitialized(): boolean {
    return !!this.timelineWindow;
  }

  public getLoadedRoomId(): string {
    return this.loadedRoomId;
  }

  public loadPreviousPage(): Promise<any> {
    return this.timelineWindow.paginate(Matrix.EventTimeline.BACKWARDS, 30);
  }

  public loadNextMessage(): Promise<any> {
    return this.timelineWindow.paginate(Matrix.EventTimeline.FORWARDS, 1, false);
  }

  public canLoadMore(): boolean {
    return this.timelineWindow.canPaginate(Matrix.EventTimeline.BACKWARDS);
  }

  public getMessages(): Message[] {
    const events = this.timelineWindow.getEvents();
    return this.getMessagesFromEvents(events);
  }
}

const messagesService = new MessagesService();

export { Message, messagesService };
