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