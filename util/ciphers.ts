export const caesar = (text: string, key: string) => {
    const shift = parseInt(key);
    return text.split("").map((char) => {
        if (/[a-zA-Z]/.test(char)) {
            const charCode = char.charCodeAt(0);
            const offset = charCode >= 97 ? 97 : 65;
            return String.fromCharCode(((charCode - offset + shift) % 26) + offset);
        } else {
            return char;
        }
    }).join("");
}

export const vigenere = (text: string, key: string) => {
    return text.split("").map((char, index) => {
        if (/[a-zA-Z]/.test(char)) {
            const charCode = char.charCodeAt(0);
            const offset = charCode >= 97 ? 97 : 65;
            const shift = key.charCodeAt(index % key.length) - (charCode >= 97 ? 97 : 65);
            return String.fromCharCode(((charCode - offset + shift) % 26) + offset);
        } else {
            return char;
        }
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