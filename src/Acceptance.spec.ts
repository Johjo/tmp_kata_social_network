import { describe, expect, it } from 'vitest';


class Controller {
  follow(follower: string, followed: string) {

  }

  seePost(user: string) {
    return []
  }
}

describe('Should handle use cases', () => {

  it('should post a one line message', () => {
    const controller = new Controller()

    controller.follow("Alice", "Bob")

    const posts = controller.seePost("Alice")

    expect(posts).toStrictEqual([]);




  });

});
