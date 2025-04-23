import { caesar, vigenere, atbash } from '../../../util/ciphers';

describe('Caesar Cipher', () => {
  test('encrypts lowercase letters correctly', () => {
    expect(caesar('abcdefg', '1')).toBe('bcdefgh');
    expect(caesar('xyz', '3')).toBe('abc');
  });

  test('encrypts uppercase letters correctly', () => {
    expect(caesar('ABCDEFG', '1')).toBe('BCDEFGH');
    expect(caesar('XYZ', '3')).toBe('ABC');
  });

  test('wraps around the alphabet correctly', () => {
    expect(caesar('xyz', '3')).toBe('abc');
    expect(caesar('XYZ', '5')).toBe('CDE');
  });

  test('preserves non-alphabetic characters', () => {
    expect(caesar('Hello, World!', '3')).toBe('Khoor, Zruog!');
    expect(caesar('123 abc', '1')).toBe('123 bcd');
  });

  test('handles negative shifts', () => {
    expect(caesar('bcdefgh', '-1')).toBe('abcdefg');
    expect(caesar('abc', '-3')).toBe('xyz');
  });

  test('handles large shifts', () => {
    expect(caesar('abc', '26')).toBe('abc'); // Full cycle
    expect(caesar('abc', '27')).toBe('bcd'); // Full cycle + 1
    expect(caesar('abc', '52')).toBe('abc'); // Two full cycles
  });

  test('handles zero shift', () => {
    expect(caesar('Hello, World!', '0')).toBe('Hello, World!');
  });
});

describe('Vigenere Cipher', () => {
  test('encrypts lowercase letters correctly', () => {
    expect(vigenere('abcdef', 'key')).toBe('keydey');
    expect(vigenere('attack', 'lemon')).toBe('lxmgcn');
  });

  test('encrypts uppercase letters correctly', () => {
    expect(vigenere('ABCDEF', 'KEY')).toBe('KEYDEY');
    expect(vigenere('ATTACK', 'LEMON')).toBe('LXMGCN');
  });

  test('preserves non-alphabetic characters', () => {
    expect(vigenere('Hello, World!', 'key')).toBe('Rijvs, Uyvjn!');
  });

  test('handles mixed case input and key', () => {
    expect(vigenere('AtTaCk', 'LeMonS')).toBe('LxMgCx');
  });

  test('repeats the key for longer texts', () => {
    expect(vigenere('defendtheeastwall', 'key')).toBe('nifyrnxliiecxuepp');
  });
});

describe('Atbash Cipher', () => {
  test('encrypts lowercase letters correctly', () => {
    expect(atbash('abc')).toBe('zyx');
    expect(atbash('hello')).toBe('svool');
  });

  test('encrypts uppercase letters correctly', () => {
    expect(atbash('ABC')).toBe('ZYX');
    expect(atbash('HELLO')).toBe('SVOOL');
  });

  test('preserves non-alphabetic characters', () => {
    expect(atbash('Hello, World!')).toBe('Svool, Dliow!');
    expect(atbash('123 abc')).toBe('123 zyx');
  });

  test('is its own inverse', () => {
    const text = 'Hello, World!';
    expect(atbash(atbash(text))).toBe(text);
  });

  test('handles mixed case input', () => {
    expect(atbash('AbCdEf')).toBe('ZyXwVu');
  });
});