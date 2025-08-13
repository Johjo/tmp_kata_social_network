import { describe, expect, it } from 'vitest';


class Controller {
  follow(follower: string, followed: string) {

  }

  seePost(asUser: string) {
  }

  post(bob: string, message: string) {
    return
  }
}

describe('Acceptance', () => {

  it('Alice should see a post from Bob', () => {
    const controller = new Controller()

    controller.follow("Alice", "Bob")
    controller.post("Bob", "message");

    const posts = controller.seePost("Alice")

    expect(posts).toStrictEqual(["message"]);
  });

});
