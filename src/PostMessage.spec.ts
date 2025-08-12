import { describe, expect, it } from 'vitest';

class InMemoryMessageRepository {
  messages: string[] = [];

  constructor() {
    // Nothing yet
  }

  save(message: string): void {
    this.messages.push(message);
  }
}

class MessagePostuseCase {
  post(myMessage: string) {

  }
}

describe('Should post a message', () => {

  it('should post a one line message', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();
    const myMessage: string = "je suis le premier message";

    const sut = new MessagePostuseCase();
    sut.post(myMessage)

    messageRepo.save(myMessage);

    expect(messageRepo.messages).contain(myMessage);
  });
});
