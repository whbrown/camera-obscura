import sample from './sample';

test('sample fn exists', () => {
  expect(typeof sample).toBe('function');
});

test('add fn returns proper value', () => {
  expect(sample('test')).toBe('test');
});
