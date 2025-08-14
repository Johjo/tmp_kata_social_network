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


  save(userName: string, message: string): void {
    this.messages.push(message);
  }

  all() {
    return this.messages;
  }
}

describe('SeePostQuery', () => {
  it.each([
    [
      "Charlie",
      "coucou",
      [`[Charlie] coucou`]
    ],
    [
      "Bob",
      "salut",
      ["[Bob] salut"]
    ]
  ]) ('Should return a list of posts', (userName, message, expected) => {
    const messageRepository = new InMemoryMessageRepository();
    messageRepository.save(userName, message);
    const seePostUseCase = new SeePostUseCase(messageRepository);

    expect(seePostUseCase.query()).toStrictEqual(expected);
  });
});

