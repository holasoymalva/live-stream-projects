function frequencySort(s) {
    const frequecyMap = new Map();

    for (let char of s) {
        frequecyMap.set(char, (frequecyMap.get(char) || 0) + 1);
    }

    const sortedChars = [...s].sort((a, b) => {
        if (frequecyMap.get(b) === frequecyMap.get(a)) {
            return s.indexOf(a) - frequecyMap.get(b);
        }
        return s.indexOf(b) - frequecyMap.get(a);
    });
    return sortedChars.join('');
}

const s = 'Aabb';

console.log(frequencySort(s)); // Output: 'bbAa' or 'bbaA'

