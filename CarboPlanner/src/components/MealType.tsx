export function getCategory() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return 'Breakfast';
    } else if (currentHour >= 12 && currentHour < 17) {
        return 'Lunch';
    } else {
        return 'Dinner';
    }
}

export function getCategoryIcon() {
    const breakfastIcon = require("../../assets/flat-icons/morning_breakfast.png");
    const lunchIcon = require("../../assets/flat-icons/lunch_bag.png");
    const dinnerIcon = require("../../assets/flat-icons/dinner_turkey.png");

    if (getCategory() == "Breakfast") {
        return breakfastIcon;
    } else if (getCategory() == "Lunch") {
        return lunchIcon;
    } else {
        return dinnerIcon;
    }

}