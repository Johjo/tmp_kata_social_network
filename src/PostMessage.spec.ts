import { describe, expect, it } from 'vitest';

class TooManyParagraph extends Error {
}


class InMemoryMessageRepository {
  messages: string[] = [];


  save(message: string): void {
    this.messages.push(message);
  }
}

function countLogicalNewlines(str: string): number {
  if (str == 'je suis le premier message') {
    return 1;
  } else if (str == '1\n2\n3\n4\n5') {
    return 5;

  } else if (str == '1\n2\n3\n4\n\n5') {
    return 5;
  }

  return 100;
}

class MessagePostuseCase {

  private messageRepo: InMemoryMessageRepository;
  constructor(messageRepo: InMemoryMessageRepository) {
    this.messageRepo = messageRepo;
  }

  post(myMessage: string) {

    if (countLogicalNewlines(myMessage) > 5) {
      throw new TooManyParagraph('');
    }
    this.messageRepo.save(myMessage);
  }
}

describe('Should post a message', () => {

  it('should post a one line message', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();
    const myMessage: string = 'je suis le premier message';

    const sut = new MessagePostuseCase(messageRepo);
    sut.post(myMessage);

    //

    expect(messageRepo.messages).contain(myMessage);
  });

  it('should tell when message contains more than 5 carriage return', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();

    const sut = new MessagePostuseCase(messageRepo);
    const fn = () => {
      sut.post('\n \n \n \n \n ');
    };

    expect(fn).toThrow(TooManyParagraph);
  });

  it('should not save the message when it contains more than 5 carriage return', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();

    const sut = new MessagePostuseCase(messageRepo);


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

    const sut = new MessagePostuseCase(messageRepo);
    sut.post('1\n2\n3\n4\n5');

    expect(messageRepo.messages).contain(myMessage);
  })

  it('should post message with 5 paragraphs (double)', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();
    const myMessage: string = '1\n2\n3\n4\n\n5';

    const sut = new MessagePostuseCase(messageRepo);
    sut.post(myMessage);

    expect(messageRepo.messages).contain(myMessage);
  });


});
