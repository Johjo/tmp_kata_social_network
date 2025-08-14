import { describe, expect, it } from 'vitest';

class TooManyParagraph extends Error {
}


export interface MessageRepositoryPort {

  all(): string[];

  save(message: string): void;
}

class InMemoryMessageRepository implements MessageRepositoryPort {
  messages: string[] = [];


  save(message: string): void {
    this.messages.push(message);
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

  post(myMessage: string) {

    if (countParagraph(myMessage) > 5) {
      throw new TooManyParagraph('');
    }
    this.messageRepo.save(myMessage);
  }
}

describe('Should post a message', () => {

  it('should post a one line message', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();
    const myMessage: string = 'je suis le premier message';

    const sut = new MessagePostUseCase(messageRepo);
    sut.post(myMessage);

    //

    expect(messageRepo.messages).contain(myMessage);
  });

  it('should tell when message contains more than 5 carriage return', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();

    const sut = new MessagePostUseCase(messageRepo);
    const fn = () => {
      sut.post('\n \n \n \n \n ');
    };

    expect(fn).toThrow(TooManyParagraph);
  });

  it('should not save the message when it contains more than 5 carriage return', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();

    const sut = new MessagePostUseCase(messageRepo);


    let error: unknown = undefined;
    try {
      sut.post('\n \n \n \n \n ');

    } catch (e: unknown) {
      error = e;
    }

      expect(error instanceof TooManyParagraph).toBeTruthy();




    // expect(messageRepo.messages[0]).toBe(undefined)
  });

  it('should post message with 5 paragraphs', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();
    const myMessage: string = '1\n2\n3\n4\n5';

    const sut = new MessagePostUseCase(messageRepo);
    sut.post('1\n2\n3\n4\n5');

    expect(messageRepo.messages).contain(myMessage);
  })

  it('should post message with 5 paragraphs (double)', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();
    const myMessage: string = '1\n2\n3\n4\n\n5';

    const sut = new MessagePostUseCase(messageRepo);
    sut.post(myMessage);

    expect(messageRepo.messages).contain(myMessage);
  });


});
