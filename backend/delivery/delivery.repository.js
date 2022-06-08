import axios from 'axios';

import {
  NOVA_POSHTA_API_LINK,
  NOVA_POSHTA_API_KEY,
} from '../config';

const {
  DELIVERY_SERVICES_INITIAL_VALUES: {
    ADDRESS,
    ADDRESS_GENERAL,
    INITIAL_VALUE,
    INITIAL_PAGES,
  },
  DELIVERY_SERVICES_METHODS: {
    GET_CITIES,
    GET_STREET,
    GET_WAREHOUSES,
    GET_COUNTER_PARTY_CONTACT_PERSONS,
    GET_DOCUMENT_PRICE,
    SAVE,
    GET_COUNTER_PARTIES,
  },
  DELIVERY_SERVICE_TYPES: { WAREHOUSE_DOORS, WAREHOUSE_WAREHOUSE },
  CARGO_TYPES: { CARGO, PARCEL },
  DELIVERY_SERVICE_MODELS: { INTERNET_DOCUMENT, COUNTER_PARTY },
  COUNTER_PARTY_PROPERTIES: { SENDER },
  tovAddress, tovCityRef,
} = require('./delivery.constants');
const {
  PAYMENT_METHOD: { CASH },
} = require('../payment/payment.constants');

const getNovaPoshtaRequest = async (properties, model, method) => axios.post(NOVA_POSHTA_API_LINK, {
  modelName: model,
  calledMethod: method,
  methodProperties: properties,
  apiKey: NOVA_POSHTA_API_KEY,
});

const getNovaPoshtaCities = async (cityName) => {
  const res = await getNovaPoshtaRequest(
    {
      FindByString: cityName,
    },
    ADDRESS,
    GET_CITIES,
  );

  return res.data.data.slice(0, 10).map((city) => ({
    label: city.Description,
    ref: city.Ref,
    cityID: city.CityID,
  }));
};

const getNovaPoshtaStreets = async (cityRef, streetName) => {
  const res = await getNovaPoshtaRequest(
    {
      CityRef: cityRef,
      FindByString: streetName,
    },
    ADDRESS,
    GET_STREET,
  );

  return res.data.data.slice(0, 10).map((street) => ({
    label: street.Description,
    ref: street.Ref,
    streetsTypeRef: street.StreetsTypeRef,
    streetsType: street.StreetsType,
  }));
};

const getNovaPoshtaWarehouses = async (city) => {
  const res = await getNovaPoshtaRequest(
    {
      CityName: city,
    },
    ADDRESS_GENERAL,
    GET_WAREHOUSES,
  );

  return res.data.data.map((warehouse) => ({
    label: warehouse.Description,
    shortAddress: warehouse.ShortAddress,
    number: warehouse.Number,
    placeMaxWeightAllowed: warehouse.PlaceMaxWeightAllowed,
    totalMaxWeightAllowed: warehouse.TotalMaxWeightAllowed,
    phone: warehouse.Phone,
    ref: warehouse.Ref,
    schedule: {
      monday: warehouse.Schedule.Monday,
      tuesday: warehouse.Schedule.Tuesday,
      wednesday: warehouse.Schedule.Wednesday,
      thursday: warehouse.Schedule.Thursday,
      friday: warehouse.Schedule.Friday,
      saturday: warehouse.Schedule.Saturday,
      sunday: warehouse.Schedule.Sunday,
    },
  }));
};

const getNovaPoshtaPrices = async (data) => {
  const {
    citySender = tovCityRef,
    cityRecipient,
    weight,
    serviceType = WAREHOUSE_DOORS,
    cost,
    cargoType = CARGO,
    seatsAmount = 1,
  } = data;

  const res = await getNovaPoshtaRequest(
    {
      CitySender: citySender,
      CityRecipient: cityRecipient,
      Weight: weight,
      ServiceType: serviceType,
      Cost: cost,
      CargoType: cargoType,
      SeatsAmount: seatsAmount,
    },
    INTERNET_DOCUMENT,
    GET_DOCUMENT_PRICE,
  );

  return res.data.data.map((price) => ({
    assessedCost: price.AssessedCost,
    cost: price.Cost,
    costRedelivery: price.CostRedelivery,
    costPack: price.CostPack,
  }));
};

const createNovaPoshtaOrder = async (data) => {
  const {
    citySender = tovCityRef,
    weight,
    payerType = SENDER,
    paymentMethod = CASH,
    serviceType = WAREHOUSE_WAREHOUSE,
    cost,
    cargoType = PARCEL,
    seatsAmount = 1,
    description,
    recipientCityName,
    recipientAddressName,
    recipientName,
    recipientType,
    recipientsPhone,
    recipientArea = INITIAL_VALUE,
    recipientAreaRegions = INITIAL_VALUE,
    recipientHouse = INITIAL_VALUE,
    recipientFlat = INITIAL_VALUE,
  } = data;

  const sender = await getSenderCounterparty();

  const address = await getSenderAddress(citySender);

  const contactSender = await getSenderContact(sender.Ref);

  const res = await getNovaPoshtaRequest(
    {
      NewAddress: '1',
      CitySender: citySender,
      Weight: weight,
      ServiceType: serviceType,
      Cost: cost,
      CargoType: cargoType,
      SeatsAmount: seatsAmount,
      Description: description,
      RecipientCityName: recipientCityName,
      RecipientAddressName: recipientAddressName,
      RecipientName: recipientName,
      RecipientType: recipientType,
      RecipientsPhone: recipientsPhone,
      PayerType: payerType,
      PaymentMethod: paymentMethod,
      RecipientArea: recipientArea,
      RecipientAreaRegions: recipientAreaRegions,
      RecipientHouse: recipientHouse,
      RecipientFlat: recipientFlat,
      Sender: sender.Ref,
      SenderAddress: address.Ref,
      ContactSender: contactSender.Ref,
      SendersPhone: contactSender.Phones,
    },
    INTERNET_DOCUMENT,
    SAVE,
  );

  const document = res.data.data[0];

  if (!document) {
    throw Error();
  }

  return {
    ref: document.Ref,
    costOnSite: document.CostOnSite,
    intDocNumber: document.IntDocNumber,
    typeDocument: document.TypeDocument,
  };
};

const getSenderCounterparty = async () => {
  const res = await getNovaPoshtaRequest(
    {
      CounterpartyProperty: SENDER,
      Page: INITIAL_PAGES,
    },
    COUNTER_PARTY,
    GET_COUNTER_PARTIES,
  );

  return res.data.data[0];
};

const getSenderAddress = async (cityRef) => {
  const sender = await getSenderCounterparty();

  const street = await getNovaPoshtaStreets(
    cityRef,
    tovAddress.street,
  );

  const res = await getNovaPoshtaRequest(
    {
      CounterpartyRef: sender.Ref,
      StreetRef: street[0].ref,
      BuildingNumber: tovAddress.buidingNumber,
      Flat: tovAddress.flat,
    },
    ADDRESS,
    SAVE,
  );

  return res.data.data[0];
};

const getSenderContact = async (sender) => {
  const res = await getNovaPoshtaRequest(
    {
      Ref: sender,
      Page: INITIAL_PAGES,
    },
    COUNTER_PARTY,
    GET_COUNTER_PARTY_CONTACT_PERSONS,
  );

  return res.data.data[0];
};

module.exports = {
  getNovaPoshtaWarehouses,
  getNovaPoshtaPrices,
  getSenderCounterparty,
  getNovaPoshtaRequest,
  getNovaPoshtaCities,
  getNovaPoshtaStreets,
  getSenderContact,
  getSenderAddress,
  createNovaPoshtaOrder,
};
