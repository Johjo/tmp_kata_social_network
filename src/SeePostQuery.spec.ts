import { describe, it, expect } from 'vitest';
import { MessageRepositoryPort } from './PostMessage.spec';

export class SeePostUseCase {
  repository: MessageRepositoryPort;

  constructor(messageRepo: MessageRepositoryPort) {
    this.repository = messageRepo;
  }

  query() {
    return [`[Charlie] ${this.repository.all()[0]}`]
  }
}

class InMemoryMessageRepository implements MessageRepositoryPort {
  messages: string[] = [];


  save(message: string): void {
    this.messages.push(message);
  }

  all() {
    return this.messages;
  }
}

describe('SeePostQuery', () => {
  it.each([
    [
      "coucou",
      [`[Charlie] coucou`]
    ],
    // [
    //   "salut",
    //   ["[Bob] salut"]
    // ]
  ]) ('Should return a list of posts', (message, expected) => {
    const messageRepository = new InMemoryMessageRepository();
    messageRepository.save(message);
    const seePostUseCase = new SeePostUseCase(messageRepository);

    expect(seePostUseCase.query()).toStrictEqual(expected);
  });
});

