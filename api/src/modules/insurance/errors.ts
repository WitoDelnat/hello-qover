import { CustomError } from "ts-custom-error";

class CarBrandUnsupportedError extends CustomError {
  constructor() {
    super("car_brand_unsupported");
  }
}

class CarValueTooLowError extends CustomError {
  constructor() {
    super("car_value_too_low");
  }
}

class DriverTooYoungError extends CustomError {
  constructor() {
    super("driver_too_young");
  }
}

class UnacceptableRiskError extends CustomError {
  constructor() {
    super("unacceptable_risk");
  }
}

export const errors = {
  CarBrandUnsupported: CarBrandUnsupportedError,
  CarValueTooLow: CarValueTooLowError,
  DriverTooYoungError: DriverTooYoungError,
  UnacceptableRiskError: UnacceptableRiskError,
};
