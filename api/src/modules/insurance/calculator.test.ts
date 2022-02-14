import { createCarQuoteCalculator } from "./calculator";
import { errors } from "./errors";

it("should throw when the car brand is unsupported", () => {
  expect(() => {
    createCarQuoteCalculator({
      carBrand: "toyota",
      carValue: 5050,
      driverAge: 50,
    });
  }).toThrow();
});

it("should throw when the car value is too low", () => {
  const calculator = createCarQuoteCalculator({
    carBrand: "bmw",
    carValue: 2000,
    driverAge: 50,
  });

  expect(() => calculator.compute()).toThrow(errors.CarValueTooLow);
});

it("should throw when the driver is too young", () => {
  const calculator = createCarQuoteCalculator({
    carBrand: "bmw",
    carValue: 5050,
    driverAge: 16,
  });

  expect(() => calculator.compute()).toThrow(errors.DriverTooYoungError);
});

it("should calculate the correct price for an Audi", () => {
  const calculator = createCarQuoteCalculator({
    carBrand: "audi",
    carValue: 5050,
    driverAge: 50,
  });

  const result = calculator.compute();

  expect(result).toEqual({
    global: {
      monthly: 20.83,
      yearly: 250,
    },
    universal: {
      monthly: 147.08,
      yearly: 1765,
    },
  });
});

it("should calculate the correct price for an BMW", () => {
  const calculator = createCarQuoteCalculator({
    carBrand: "bmw",
    carValue: 5050,
    driverAge: 50,
  });

  const result = calculator.compute();

  expect(result).toEqual({
    global: {
      monthly: 12.5,
      yearly: 150,
    },
    universal: {
      monthly: 180.83,
      yearly: 2170,
    },
  });
});

it("should throw when the driver is too young for a Porche", () => {
  const calculator = createCarQuoteCalculator({
    carBrand: "porche",
    carValue: 5050,
    driverAge: 24,
  });

  expect(() => calculator.compute()).toThrow(errors.UnacceptableRiskError);
});

it("should calculate the correct price for an Porche", () => {
  const calculator = createCarQuoteCalculator({
    carBrand: "bmw",
    carValue: 5050,
    driverAge: 50,
  });

  const result = calculator.compute();

  expect(result).toEqual({
    global: {
      monthly: 12.5,
      yearly: 150,
    },
    universal: {
      monthly: 180.83,
      yearly: 2170,
    },
  });
});
