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

  private messageRepo: InMemoryMessageRepository;
  constructor(messageRepo: InMemoryMessageRepository) {
    this.messageRepo = messageRepo;
  }

  post(myMessage: string) {
    this.messageRepo.save(myMessage);
  }
}

describe('Should post a message', () => {

  it('should post a one line message', () => {

    const messageRepo: InMemoryMessageRepository = new InMemoryMessageRepository();
    const myMessage: string = "je suis le premier message";

    const sut = new MessagePostuseCase(messageRepo);
    sut.post(myMessage)

    //

    expect(messageRepo.messages).contain(myMessage);
  });
});
