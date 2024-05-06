// ISO-7810 standard for a ID-1, length of card.
const ISO_width = 8.56;

export enum Density {
    Rice = 0.87,
    Pasta = 0.51,
    Spinach = 0.13,
    Chicken_Breast = 1.04,
    Peas = 0.68
}

// Gets the size of the known reference point, by having a set ISO standard and diving it 
// by the amount of pixels. retrieving px/cm.
export function getReferencePoint(width: number, height: number){
    return width > height ? width / ISO_width : height / ISO_width;
}

// Gets grams from density and the volume
export function getWeight(volume: number, food_item: Density){
    return volume * food_item;
}

// Gets size in cm by taking the size of the pixel per cm and divding them by the size of the objects pixels px/cm
export function getSizeInCm(a: number, ref: number){
    return a / ref;
}


export function getVolume(height: number, width: number, length: number, ref: number){
    return getSizeInCm(height, ref) * getSizeInCm(width, ref) * getSizeInCm(length, ref);
}

