// testData.js

export const testZipCode = "37010";
export const updatedItemQuantity = "6";
export const updatedZipCode = "44060";
export const validCouponCode = "QT2023";

export const productDetails = {
  'MD08002812.OBS': {
    type: 'OMD Innovel HA',
    is_innovel_item: true,
    erp_type: 'omd',
    subscription_enable: false,
    is_dynamic_scheduling: true,
  },
  'MD08000230.OBS': {
    type: 'OMD Innovel HE',
    is_innovel_item: true,
    erp_type: 'omd',
    subscription_enable: false,
    is_dynamic_scheduling: true,
  },
  'MD05817250.OBS': {
    type: 'OMD Parcel HA',
    is_innovel_item: false,
    erp_type: 'omd',
    subscription_enable: false,
    is_dynamic_scheduling: false,
  },
  'MD05950636.OBS': {
    type: 'OMD Parcel HE',
    is_innovel_item: false,
    erp_type: 'omd',
    subscription_enable: false,
    is_dynamic_scheduling: false,
  },
  'MD05788849.OBS': {
    type: 'OMV Subscription',
    is_innovel_item: false,
    erp_type: 'omv',
    subscription_enable: true,
    is_dynamic_scheduling: false,
  },
  'MD05930376.OBS': {
    type: 'OMV Non Subscription',
    is_innovel_item: false,
    erp_type: 'omv',
    subscription_enable: false,
    is_dynamic_scheduling: false,
  },
};

export const getExpectedCartItemProperties = (sku) => {
  return {
    is_dynamic_scheduling: productDetails[sku].is_dynamic_scheduling,
  };
};

export const getExpectedProductProperties = (sku) => {
  return {
    is_innovel_item: productDetails[sku].is_innovel_item,
    sku: sku,
    erp_type: productDetails[sku].erp_type,
    subscription_enable: productDetails[sku].subscription_enable,
  };
};
