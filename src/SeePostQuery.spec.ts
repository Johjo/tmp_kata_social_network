import { describe, it } from 'vitest';

export class SeePostUseCase {
  query() {
    return [];
  }
}

describe('SeePostQuery', () => {
  it('Should return a list of posts', () => {
    const seePostUseCase = new SeePostUseCase();
  });
});

