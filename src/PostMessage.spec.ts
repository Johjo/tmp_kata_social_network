import { describe, expect, it } from 'vitest';

describe('Should post a message', () => {

  it('should post a one line message', () => {

    let messageRepo: MessageRepository = new InMemoryMessageRepository() ;
    expect(messageRepo).contain("je suis le premier message");
  });
});
