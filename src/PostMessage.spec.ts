import { describe, expect, it } from 'vitest';

class TooManyParagraph extends Error {
}

export interface MessageRepositoryPort {

  all(): { userName: string; message: string }[];

  save(data: { userName: string; message: string }): void;
}

class InMemoryMessageRepository implements MessageRepositoryPort {
  messages: { userName: string; message: string }[] = [];


  save(data: { userName: string; message: string }): void {
    this.messages.push(data);
  }

  all(): string[] {
    throw new Error("Not implemented");
  }
}

function countParagraph(str: string): number {
  let count = 0;
  let previousWasNewline = false;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '\n') {
      if (!previousWasNewline) {
        count++;
        previousWasNewline = true;
      }
    } else {
      previousWasNewline = false;
    }
  }

  return count + 1;
}
export class MessagePostUseCase {

  private messageRepo: MessageRepositoryPort;
  constructor(messageRepo: MessageRepositoryPort) {
    this.messageRepo = messageRepo;
  }

  post(userName: string, myMessage: string) {

    if (countParagraph(myMessage) > 5) {
      throw new TooManyParagraph('');
    }
    this.messageRepo.save({ userName, message: myMessage });
  }
}

describe('Should post a message', () => {

  it('should post a one line message', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();
    const myMessage: string = 'je suis le premier message';

    const sut = new MessagePostUseCase(messageRepo);
    sut.post("A", myMessage);

    //

    expect(messageRepo.messages).toStrictEqual([{ userName: "A", message: myMessage }]);
  });

  it('should tell when message contains more than 5 carriage return', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();

    const sut = new MessagePostUseCase(messageRepo);
    const fn = () => {
      sut.post("B", '\n \n \n \n \n ');
    };

    expect(fn).toThrow(TooManyParagraph);
  });

  it('should not save the message when it contains more than 5 carriage return', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();

    const sut = new MessagePostUseCase(messageRepo);


    let error: unknown = undefined;
    try {
      sut.post("C", '\n \n \n \n \n ');

    } catch (e: unknown) {
      error = e;
    }

      expect(error instanceof TooManyParagraph).toBeTruthy();
  });

  it('should post message with 5 paragraphs', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();
    const myMessage: string = '1\n2\n3\n4\n5';

    const sut = new MessagePostUseCase(messageRepo);
    sut.post("D", '1\n2\n3\n4\n5');

    expect(messageRepo.messages).toStrictEqual([{ userName: "D", message: myMessage }]);
  })

  it('should post message with 5 paragraphs (double)', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();
    const myMessage: string = '1\n2\n3\n4\n\n5';

    const sut = new MessagePostUseCase(messageRepo);
    sut.post("E", myMessage);

    expect(messageRepo.messages).toStrictEqual([{ userName: "E", message: myMessage }]);
  });

  it('should save the username', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();
    const myMessage: string = 'bonjour';

    const sut = new MessagePostUseCase(messageRepo);
    sut.post("Damien", myMessage);

    expect(messageRepo.messages).toStrictEqual([{
      userName: "Damien",
      message: myMessage
    }]);
  });


});
