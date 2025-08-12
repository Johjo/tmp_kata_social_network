import { describe, expect, it } from 'vitest';

class TooManyCarriage extends Error {
}


class InMemoryMessageRepository {
  messages: string[] = [];


  save(message: string): void {
    this.messages.push(message);
  }
}

class MessagePostuseCase {

  private messageRepo: InMemoryMessageRepository;
  constructor(messageRepo: InMemoryMessageRepository) {
    this.messageRepo = messageRepo;
  }

  post(myMessage: string) {

    if (myMessage.split('\n').length > 4) {
      throw new TooManyCarriage('');
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

  it('No error with cariage return', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();

    const sut = new MessagePostuseCase(messageRepo);
    const fn = () => {
      sut.post('\n'.repeat(4));
    };

    expect(fn).toThrow();
  });

  it('should tell when message contains more than 5 carriage return', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();

    const sut = new MessagePostuseCase(messageRepo);
    const fn = () => {
      sut.post('\n \n \n \n \n ');
    };

    expect(fn).toThrow(TooManyCarriage);
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

      expect(error instanceof TooManyCarriage).toBeTruthy();




    // expect(messageRepo.messages[0]).toBe(undefined)
  });

});
