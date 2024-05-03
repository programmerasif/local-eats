export const filterRestaurantsByDistance = (restaurants, selectLat, selectLong, distance) => {
  const earthRadius = 6371; 

  const filtered = restaurants.filter((restaurant) => {
    
    if (restaurant.location) {
      const { latitude, longitude } = restaurant.location;
      const dLat = toRadians(latitude - selectLat);
      const dLon = toRadians(longitude - selectLong);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(selectLat)) *
          Math.cos(toRadians(latitude)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceBetween = earthRadius * c;

      return distanceBetween <= distance;
    } else {
      // Handle the case when location property is missing
      return false;
    }
  });

  return filtered;
};

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};


