import { wp, hp, fontSize, scale, moderateScale } from '../responsive';
import { Dimensions } from 'react-native';

jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 })),
  },
}));

describe('Responsive Utilities', () => {
  beforeEach(() => {
    (Dimensions.get as jest.Mock).mockReturnValue({ width: 375, height: 812 });
  });

  describe('wp (width percentage)', () => {
    it('should calculate correct width percentage', () => {
      expect(wp(50)).toBe(187.5); // 50% of 375
      expect(wp(100)).toBe(375); // 100% of 375
      expect(wp(25)).toBe(93.75); // 25% of 375
    });
  });

  describe('hp (height percentage)', () => {
    it('should calculate correct height percentage', () => {
      expect(hp(50)).toBe(406); // 50% of 812
      expect(hp(100)).toBe(812); // 100% of 812
      expect(hp(25)).toBe(203); // 25% of 812
    });
  });

  describe('fontSize', () => {
    it('should scale font size based on screen width', () => {
      const size = 16;
      const expected = (375 / 375) * size;
      expect(fontSize(size)).toBe(expected);
    });

    it('should scale font size for different screen widths', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 414, height: 896 });
      const size = 16;
      const expected = (414 / 375) * size;
      expect(fontSize(size)).toBeCloseTo(expected, 2);
    });
  });

  describe('scale', () => {
    it('should scale size based on width', () => {
      const size = 20;
      const expected = (375 / 375) * size;
      expect(scale(size)).toBe(expected);
    });
  });

  describe('moderateScale', () => {
    it('should moderately scale size with default factor', () => {
      const size = 20;
      const newSize = (375 / 375) * size;
      const expected = size + (newSize - size) * 0.5;
      expect(moderateScale(size)).toBe(expected);
    });

    it('should moderately scale size with custom factor', () => {
      const size = 20;
      const factor = 0.3;
      const newSize = (375 / 375) * size;
      const expected = size + (newSize - size) * factor;
      expect(moderateScale(size, factor)).toBe(expected);
    });
  });
});