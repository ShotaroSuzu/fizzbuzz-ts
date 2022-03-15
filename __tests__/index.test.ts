import greeting from '@/src/index';

describe(`when name is given`, () => {
    it('return named greeting', () => {
        expect(greeting('suzuki')).toBe('Hello suzuki!!!');
    });
});
