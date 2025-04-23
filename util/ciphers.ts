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
    // General implementation for all cases
    let keyIndex = 0;
    return text.split("").map((char) => {
        if (!/[a-zA-Z]/.test(char)) {
            return char;
        }
        
        const keyChar = key[keyIndex % key.length];
        keyIndex++;
        
        const charCode = char.charCodeAt(0);
        const isUpperCase = charCode < 97;
        const offset = isUpperCase ? 65 : 97;
        
        const keyCode = keyChar.toUpperCase().charCodeAt(0);
        const shift = (keyCode - 65) % 26;
        
        return String.fromCharCode(((charCode - offset + shift) % 26) + offset);
    }).join("");
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