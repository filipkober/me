import * as cardModule from "../../../util/cards";

// Extract the functions for testing using type casting since they are not exported
const { getRandomCard, getBlackJackValues, getBlackJackValue } = cardModule;
type Card = cardModule.Card;

describe("Blackjack Utility Functions", () => {
  describe("getRandomCard", () => {
    test("returns a string with valid card format", () => {
      const card = getRandomCard();
      expect(card).toMatch(/^([2-9]|10|[JQKA])_(♠|♥|♦|♣)$/);
    });

    test("doesn't return a card from usedCards array", () => {
      const usedCards: Card[] = ["A_♠", "K_♥", "Q_♦", "J_♣", "10_♠", "9_♥", "8_♦", "7_♣", "6_♠", "5_♥", "4_♦", "3_♣", "2_♠"];
      const card = getRandomCard(usedCards);
      expect(usedCards).not.toContain(card);
    });

    test("returns different cards on multiple calls", () => {
      const cards = new Set();
      for (let i = 0; i < 10; i++) {
        cards.add(getRandomCard());
      }
      // It's statistically unlikely to get the same card multiple times in 10 draws
      expect(cards.size).toBeGreaterThan(5);
    });
  });

  describe("getBlackJackValue", () => {
    test("returns correct value for number cards", () => {
      expect(getBlackJackValue("2_♠")).toBe(2);
      expect(getBlackJackValue("5_♥")).toBe(5);
      expect(getBlackJackValue("10_♦")).toBe(10);
    });

    test("returns 10 for face cards", () => {
      expect(getBlackJackValue("J_♠")).toBe(10);
      expect(getBlackJackValue("Q_♥")).toBe(10);
      expect(getBlackJackValue("K_♦")).toBe(10);
    });

    test("returns 11 for Ace when total would be ≤ 21", () => {
      // When no other cards are provided, Ace should be 11
      expect(getBlackJackValue("A_♠")).toBe(11);
      
      // When other cards don't make the total exceed 21, Ace should be 11
      const hand: Card[] = ["10_♦"];
      expect(getBlackJackValue("A_♥", hand)).toBe(11);
    });

    test("returns 1 for Ace when total would exceed 21", () => {
      const hand: Card[] = ["K_♥", "J_♦"];
      expect(getBlackJackValue("A_♠", hand)).toBe(1);
    });
  });

  describe("getBlackJackValues", () => {
    test("returns sum of card values for simple hand", () => {
      expect(getBlackJackValues(["5_♠", "7_♥"] as Card[])).toBe(12);
      expect(getBlackJackValues(["10_♦", "K_♣"] as Card[])).toBe(20);
      expect(getBlackJackValues(["2_♠", "3_♥", "4_♦"] as Card[])).toBe(9);
    });

    test("correctly handles a single Ace", () => {
      expect(getBlackJackValues(["A_♠"] as Card[])).toBe(11);
      expect(getBlackJackValues(["A_♥", "10_♦"] as Card[])).toBe(21);
      expect(getBlackJackValues(["A_♠", "K_♥", "Q_♦"] as Card[])).toBe(21); // Ace counted as 1
    });

    test("correctly handles multiple Aces", () => {
      expect(getBlackJackValues(["A_♠", "A_♥"] as Card[])).toBe(12); // One as 11, one as 1
      expect(getBlackJackValues(["A_♦", "A_♣", "A_♠"] as Card[])).toBe(13); // One as 11, two as 1
      expect(getBlackJackValues(["A_♥", "A_♦", "9_♠"] as Card[])).toBe(21); // Both Aces as 1
    });

    test("correctly calculates blackjack hand", () => {
      expect(getBlackJackValues(["A_♠", "J_♥"] as Card[])).toBe(21);
    });

    test("correctly calculates bust hands", () => {
      expect(getBlackJackValues(["K_♠", "Q_♥", "J_♦"] as Card[])).toBe(30);
    });
  });
});