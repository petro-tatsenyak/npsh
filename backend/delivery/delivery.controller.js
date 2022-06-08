import deliveryRepository from './delivery.repository';

const getNovaPoshtaCities = async (req, res, next) => {
  const { city } = req.query;

  try {
    const cities = await deliveryRepository.getNovaPoshtaCities(city);

    return res.json(cities);
  } catch (error) {
    return next(error);
  }
};

const getNovaPoshtaStreets = async (req, res, next) => {
  const { city, street } = req.query;

  try {
    const streets = await deliveryRepository.getNovaPoshtaStreets(
      city,
      street,
    );

    return res.json(streets);
  } catch (error) {
    return next(error);
  }
};

const getNovaPoshtaWarehouses = async (req, res, next) => {
  const { city } = req.query;

  try {
    const warehouses = await deliveryRepository.getNovaPoshtaWarehouses(city);

    return res.json(warehouses);
  } catch (error) {
    return next(error);
  }
};

const getNovaPoshtaPrices = async (req, res, next) => {
  const { query: data } = req;

  try {
    const prices = await deliveryRepository.getNovaPoshtaPrices(data);

    return res.json(prices);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getNovaPoshtaCities,
  getNovaPoshtaStreets,
  getNovaPoshtaWarehouses,
  getNovaPoshtaPrices,
};
