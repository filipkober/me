export type CardSuit = '♠' | '♥' | '♦' | '♣';
export type CardRank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export type Card = `${CardRank}_${CardSuit}`;

const removeOneOccurrence = (arr: Card[], value: Card) => {
    const index = arr.indexOf(value);
    if (index > -1) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }
    return arr;
}


/**
 * 
 * @param card - The card to convert to an image source. The card should be in the format of "rank_suit", e.g. "A_♠" or "10_♥", otherwise it will return the reverse card image.
 * @example cardToImageSrc("A_♠") // "/cards/as.png"
 * @example cardToImageSrc("10_♥") // "/cards/10h.png"
 * @example cardToImageSrc("invalid_card") // "/cards/reverse.png"
 * @returns The image source path for the card. (card dimension is 250x350)
 */
export const cardToImageSrc = (card: Card | "reverse"): string => {

    if (card === "reverse") {
        return '/cards/reverse.png';
    }

    const [rank, suit] = card.split("_") as [CardRank, CardSuit];
    const suitName = suit === '♠' ? 's' : suit === '♥' ? 'h' : suit === '♦' ? 'd' : 'c';
    return `/cards/${rank.toLowerCase()}${suitName}.png`;
}

export const getRandomCard = (usedCards: Card[] = []) => {
    const suits: CardSuit[] = ["♠", "♥", "♦", "♣"];
    const randomSuitIndex = Math.floor(Math.random() * suits.length);
    const cards: CardRank[] = [
        "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "J", "Q", "K", "A"
    ];
    let randomIndex;
    let card: Card;
    do {
        randomIndex = Math.floor(Math.random() * cards.length);
        card = `${cards[randomIndex]}_${suits[randomSuitIndex]}`;
    } while (usedCards.includes(card));
    return card;
}

export const getBlackJackValue = (card: Card, cardsInHand: Card[] = []): number => {
    const cardValue = card.split("_")[0];
    if (["J", "Q", "K"].includes(cardValue)) return 10;
    if (cardValue === "A") {
        // If there are no other cards, Ace is 11
        if (cardsInHand.length === 0) return 11;
        
        // Check if adding 11 would cause a bust with other cards
        const cardsWithoutThisCard = cardsInHand.filter(c => c !== card);
        const totalValue = cardsWithoutThisCard.reduce((acc, c) => acc + getBlackJackValue(c, []), 0);
        return (totalValue + 11 > 21) ? 1 : 11;
    }
    return parseInt(cardValue);
}

export const getBlackJackValues = (cards: Card[]) => {
    // First count all non-Ace cards
    let total = 0;
    const aceCards = [];
    
    for (const card of cards) {
        const cardValue = card.split("_")[0];
        if (cardValue === "A") {
            aceCards.push(card);
        } else {
            total += getBlackJackValue(card, removeOneOccurrence(cards, card));
        }
    }
    
    // Then handle Aces - count first Ace as 11 if possible, others as 1
    let countedOneAceAs11 = false;
    aceCards.forEach(() => {
        if (!countedOneAceAs11 && total + 11 <= 21) {
            total += 11;
            countedOneAceAs11 = true;
        } else {
            total += 1;
        }
    });
    
    return total;
}