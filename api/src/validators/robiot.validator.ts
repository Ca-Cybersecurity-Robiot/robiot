const CONTENT_REGEX = /^\-?\d+\.\d$/;

/**
 * Permet de valider que le robot bouge dans un seul sens
 * @param value
 */
export const checkUniqueDirection = (value: string): boolean => {
    let result = true;

    const { x, y } = extractCoordinates(value);
    if ((x !== 0 && y !== 0) || (x === 0 && y === 0)) {
        result = false;
    }
    return result;
};

/**
 * Vérifie que le format des floats correspond bien à n chiffre et une décimale
 * Exemple: 1.5 | 10.8 | 15.0
 * @param value
 */
export const checkFloatFormat = (value: string): boolean => {
    let result = true;
    const { x, y } = extractCoordinates(value);
    if (x !== 0) {
        result = CONTENT_REGEX.test(`${x}`);
    }

    if (y !== 0) {
        result = CONTENT_REGEX.test(`${y}`);
    }
    return result;
};

/**
 * Fonction qui permet d'extraire les coordonnées x et y de l'input reçu en paramètre
 */
const extractCoordinates = (content: string) => {
    const coordinates = content.split(',');
    const x = parseFloat(coordinates[0]);
    const y = parseFloat(coordinates[1]);
    return { x, y };
};
