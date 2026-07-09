/**
 * Validates whether a string is a plausible human name (first name or surname).
 * Blocks keyboard mashing, random gibberish, numbers, symbols, and excessive consonant clusters.
 */
export function validateHumanName(name: string): { isValid: boolean; error?: string } {
  const trimmed = name.trim();

  if (!trimmed) {
    return { isValid: false, error: "Campo requerido." };
  }

  if (trimmed.length < 2) {
    return { isValid: false, error: "Mínimo 2 caracteres." };
  }

  if (trimmed.length > 40) {
    return { isValid: false, error: "Por favor ingresa un nombre o apellido válido." };
  }

  // 1. Only allow valid Spanish/Latin letters, spaces, hyphens, and apostrophes
  const validCharsRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
  if (!validCharsRegex.test(trimmed)) {
    return { isValid: false, error: "Solo se permiten letras y espacios." };
  }

  // 2. Reject 3 or more identical consecutive characters in a row (e.g. "aaaa", "zzzz")
  if (/(.)\1{2,}/i.test(trimmed)) {
    return { isValid: false, error: "Por favor ingresa un nombre o apellido válido." };
  }

  // Split into individual words
  const words = trimmed.split(/\s+/);

  for (const word of words) {
    // Single word length limit (a real single name is rarely > 20 characters)
    if (word.length > 20) {
      return { isValid: false, error: "Por favor ingresa un nombre o apellido válido." };
    }

    const lowerWord = word.toLowerCase();

    // Check if word has vowels (a, e, i, o, u, á, é, í, ó, ú, ü)
    const hasVowels = /[aeiouáéíóúü]/i.test(lowerWord);
    if (lowerWord.length >= 4 && !hasVowels) {
      return { isValid: false, error: "Por favor ingresa un nombre o apellido válido." };
    }

    // Anti-gibberish check: Check for 4 or more consecutive consonants (e.g. "smdf", "jsnd", "flkj", "dfgh")
    const consonantClusterRegex = /[^aeiouáéíóúü\s'-]{4,}/i;
    if (consonantClusterRegex.test(lowerWord)) {
      return { isValid: false, error: "Por favor ingresa un nombre o apellido válido." };
    }
  }

  return { isValid: true };
}
