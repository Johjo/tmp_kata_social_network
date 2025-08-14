import { describe, it, expect } from 'vitest';
import { MessageRepositoryPort } from './PostMessage.spec';

export class SeePostUseCase {
  query() {
    return ["[Charlie] coucou"];
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
  it('Should return a list of posts', () => {
    const messageRepository = new InMemoryMessageRepository();
    messageRepository.save("coucou");
    const seePostUseCase = new SeePostUseCase();

    expect(seePostUseCase.query()).toStrictEqual([`[Charlie] coucou`]);
  });
});

