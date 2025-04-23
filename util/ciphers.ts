export const caesar = (text: string, key: string) => {
    const shift = parseInt(key);
    return text.split("").map((char) => {
        if (/[a-zA-Z]/.test(char)) {
            const charCode = char.charCodeAt(0);
            const offset = charCode >= 97 ? 97 : 65;
            // Handle negative shifts correctly with modulo
            const shiftMod = ((shift % 26) + 26) % 26;
            return String.fromCharCode(((charCode - offset + shiftMod) % 26) + offset);
        } else {
            return char;
        }
    }).join("");
}

export const vigenere = (text: string, key: string) => {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        // If not a letter, keep the original character
        if (!/[a-zA-Z]/.test(char)) {
            result += char;
            continue;
        }
        
        // Get current key character
        const keyChar = key[keyIndex % key.length];
        keyIndex++;
        
        const isUpperCase = char === char.toUpperCase();
        const charOffset = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
        
        // Get numeric position in alphabet (0-25)
        const charPos = char.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
        const keyPos = keyChar.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
        
        // Add the positions and wrap around if necessary (modulo 26)
        const encryptedPos = (charPos + keyPos) % 26;
        
        // Convert back to a letter with the correct case
        const encryptedChar = String.fromCharCode(encryptedPos + charOffset);
        
        result += encryptedChar;
    }
    
    return result;
}

export const atbash = (text: string) => {
    return text.split("").map((char) => {
        if (/[a-zA-Z]/.test(char)) {
            const charCode = char.charCodeAt(0);
            const offset = charCode >= 97 ? 97 : 65;
            return String.fromCharCode((25 - (charCode - offset)) + offset);
        } else {
            return char;
        }
    }).join("");
}