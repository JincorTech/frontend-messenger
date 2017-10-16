import Matrix from 'matrix-js-sdk';
import matrix from '../../utils/matrix';
import { removeDomain } from '../../helpers/matrix';

type Message = {
  sender: string,
  timestamp: number,
  content: string
};

class MessagesService {
  private timelineWindow;

  private isInitialized(): boolean {
    return !!this.timelineWindow;
  }

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

    return this.timelineWindow.load(undefined, 30)
  }

  public loadNextPage(): Promise<any> {
    if (!this.isInitialized()) {
      return Promise.resolve();
    }

    return this.timelineWindow.paginate(Matrix.EventTimeline.BACKWARDS, 30);
  }

  public loadNewMessage(): Promise<any> {
    if (!this.isInitialized()) {
      return Promise.resolve();
    }

    return this.timelineWindow.paginate(Matrix.EventTimeline.FORWARDS, 1, false);
  }

  public canLoadMore(): boolean {
    if (!this.isInitialized()) {
      return false;
    }

    return this.timelineWindow.canPaginate(Matrix.EventTimeline.BACKWARDS);
  }

  public getMessages(): Message[] {
    if (!this.isInitialized()) {
      return [];
    }

    const events = this.timelineWindow.getEvents();
    return this.getMessagesFromEvents(events);
  }
}

const messagesService = new MessagesService();

export { Message, messagesService };
