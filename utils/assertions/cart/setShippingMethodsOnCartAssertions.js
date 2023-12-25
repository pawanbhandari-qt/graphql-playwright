// setShippingMethodsOnCartAssertions.js
import { updatedZipCode } from '../../../config/testData';
import { commonAssertions, assertCartItemProperties } from './assertions';
import { expect } from '@playwright/test';

export const assertSetShippingMethodsOnCartAssertions = (response) => {
  commonAssertions(response);
};