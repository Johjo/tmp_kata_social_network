import { describe, expect, it } from 'vitest';

import { MessagePostUseCase, MessageRepositoryPort } from './PostMessage.spec';
import { SeePostUseCase } from './SeePostQuery.spec';

export class InMemoryMessageRepositoryForDemo implements MessageRepositoryPort {
  all(): string[] {
    return this.messages;
  }

  messages: string[] = [];

  save(message: string): void {
    this.messages.push(message);
  }
}

class FollowUseCase {
  execute() {}
}

class SocialNetwork {
  messageRepo: MessageRepositoryPort;

  constructor() {
    this.messageRepo = new InMemoryMessageRepositoryForDemo();
  }

  follow(follower: string, followed: string) {
    const follow = new FollowUseCase();
    follow.execute();
  }

  seePost(asUser: string) {
    const seePost = new SeePostUseCase(this.messageRepo);
    return seePost.query();
  }

  post(bob: string, message: string) {
    const postMessage = new MessagePostUseCase(this.messageRepo);
    postMessage.post(message);
  }
}

describe('Acceptance', () => {
  it('Alice should see a post from Bob', () => {
    const socialNetwork = new SocialNetwork();

    socialNetwork.follow('Alice', 'Bob');
    socialNetwork.post('Bob', 'message');

    const posts = socialNetwork.seePost('Alice');

    expect(posts).toStrictEqual(['[Bob] message']);
  });
});
