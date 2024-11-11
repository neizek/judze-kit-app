<script lang="ts">
    function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

function calculateSolarAzimuth(latitude, longitude, date) {
    // Constants
    const solarNoonOffset = 12; // Solar noon in hours
    const daysInYear = 365;

    // Calculate the day of the year
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Calculate the declination of the sun
    const declination = 23.44 * Math.sin(toRadians((360 / daysInYear) * (dayOfYear - 81)));

    // Calculate local solar time
    const timeOffset = (date.getHours() + (date.getMinutes() / 60) + (date.getSeconds() / 3600)) + 
                        (4 * (longitude - 15) / 60); // Adjusting for longitude
                        
    // Calculate the hour angle
    const hourAngle = (timeOffset - solarNoonOffset) * 15; // Degrees per hour

    // Latitude in radians
    const latRad = toRadians(latitude);

    // Calculate solar altitude
    const altitude = Math.asin(Math.sin(latRad) * Math.sin(toRadians(declination)) +
                                Math.cos(latRad) * Math.cos(toRadians(declination)) * Math.cos(toRadians(hourAngle)));

    // Calculate solar azimuth
    let azimuth;
    if (altitude > 0) { // Sun is above the horizon
        azimuth = Math.acos((Math.sin(toRadians(declination)) - Math.sin(latRad) * Math.sin(altitude)) /
                             (Math.cos(latRad) * Math.cos(altitude)));
        if (hourAngle > 0) {
            azimuth = toDegrees(azimuth); // In the afternoon
        } else {
            azimuth = 360 - toDegrees(azimuth); // In the morning
        }
    } else {
        azimuth = null; // Sun is below the horizon
    }

    return azimuth;
}

// Example usage with provided data
const latitude = 57; // Latitude: 57N
const longitude = 24; // Longitude: 24E
const date = new Date(Date.UTC(2024, 9, 25, 13, 22, 34)); // October is month index 9

const azimuth = calculateSolarAzimuth(latitude, longitude, date);
if (azimuth !== null) {
    console.log(`Solar Azimuth: ${azimuth.toFixed(2)}°`);
} else {
    console.log("The sun is below the horizon.", azimuth);
}

</script>