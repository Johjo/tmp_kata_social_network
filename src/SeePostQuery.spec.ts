import { describe, it, expect } from 'vitest';
import { MessageRepositoryPort } from './PostMessage.spec';

export class SeePostUseCase {
  repository: MessageRepositoryPort;

  constructor(messageRepo: MessageRepositoryPort) {
    this.repository = messageRepo;
  }

  query() {
    return [`[${this.repository.all()[0].userName}] ${this.repository.all()[0].message}`]
  }
}

class InMemoryMessageRepository implements MessageRepositoryPort {
  feed(userName: string, message: string) {
    this.save({ userName, message })
  }

  messages: { userName: string; message: string }[] = [];

  save(data: { userName: string; message: string }): void {
    this.messages.push(data);
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
    messageRepository.feed(userName, message);
    const seePostUseCase = new SeePostUseCase(messageRepository);

    expect(seePostUseCase.query()).toStrictEqual(expected);
  });
});

