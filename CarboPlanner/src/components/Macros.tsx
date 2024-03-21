const foodDb = [
    {
        name: "White Rice",
        calories: 100,
        fat: 100,
        protein: 100,
        carb: 100,
    },
    {
        name: "carrot",
        calories: 100,
        fat: 100,
        protein: 100,
        carb: 100,
    },
    {
        name: "Chicken",
        calories: 100,
        fat: 100,
        protein: 100,
        carb: 100,
    },
]

export function getMacros() {
    let totalCalories = 0;
    let totalFat = 0;
    let totalProtein = 0;
    let totalCarb = 0;

    foodDb.forEach(item => {
        totalCalories += item.calories;
        totalFat += item.fat;
        totalProtein += item.protein;
        totalCarb += item.carb;
    });

    return {
        totalCalories,
        totalFat,
        totalProtein,
        totalCarb
    };
}