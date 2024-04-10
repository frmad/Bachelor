export function getCategory() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return 'morning';
    } else if (currentHour >= 12 && currentHour < 17) {
        return 'lunch';
    } else {
        return 'dinner';
    }
}