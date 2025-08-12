import { describe, expect, it } from 'vitest';

class InMemoryMessageRepository {
  messages: string[] = [];

  constructor() {
    // Nothing yet
  }

  post(message: string): void {
    this.messages.push(message);
  }
}

describe('Should post a message', () => {

  it('should post a one line message', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();
    const myMessage: string = "je suis le premier message";

    messageRepo.post(myMessage);

    expect(messageRepo).contain(myMessage);
  });
});
