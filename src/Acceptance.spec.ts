import { describe, expect, it } from 'vitest';
import { MessagePostUseCase, MessageRepositoryPort } from './PostMessage.spec';

export class InMemoryMessageRepositoryForDemo implements MessageRepositoryPort {
  messages: string[] = [];


  save(message: string): void {
    this.messages.push(message);
  }
}

class FollowUseCase {
  execute() {

  }
}

class SeePostQuery {
  query() {
    return []
  }
}

class SocialNetwork {
  follow(follower: string, followed: string) {
    const follow = new FollowUseCase()
    follow.execute()
  }

  seePost(asUser: string) {
    const seePost = new SeePostQuery();
    return seePost.query()
  }

  post(bob: string, message: string) {
    const messageRepo: MessageRepositoryPort = new InMemoryMessageRepositoryForDemo();
    const postMessage = new MessagePostUseCase(messageRepo)
    postMessage.post(message);
  }
}

describe('Acceptance', () => {

  it('Alice should see a post from Bob', () => {
    const socialNetwork = new SocialNetwork()

    socialNetwork.follow("Alice", "Bob")
    socialNetwork.post("Bob", "message");

    const posts = socialNetwork.seePost("Alice")

    expect(posts).toStrictEqual(["message"]);
  });

});
