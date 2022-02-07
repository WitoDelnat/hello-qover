import { round } from "lodash";

// Case note: Bit overkill for these business rules
// Normally I'd simply keep this within one function until it gets complex,
// but it showcases the direction you could go when this complexity rises.
export function createCarQuoteCalculator({
  driverAge,
  carValue,
  carBrand,
}: {
  driverAge: number;
  carValue: number;
  carBrand: string;
}) {
  switch (carBrand) {
    case "audi":
      return new AudiQuoteCalculator(driverAge, carValue);
    case "bmw":
      return new BmwQuoteCalculator(driverAge, carValue);
    case "porche":
      return new PorcheQuoteCalculator(driverAge, carValue);
    default:
      throw new Error("car_brand_unsupported");
  }
}

export abstract class CarQuoteCalculator {
  constructor(protected driverAge: number, protected carValue: number) {}

  compute() {
    this.validate();

    const yearlyGlobalOffer = this.computeYearlyGlobalOffer();
    const yearlyUniversalOffer = this.computeYearlyUniversalOffer();

    return {
      global: {
        yearly: yearlyGlobalOffer,
        monthly: round(yearlyGlobalOffer / 12, 2),
      },
      universal: {
        yearly: yearlyUniversalOffer,
        monthly: round(yearlyUniversalOffer / 12, 2),
      },
    };
  }

  protected validate(): void {
    if (this.carValue < 5000) throw new Error("car_value_too_low");
    if (this.driverAge < 18) throw new Error("driver_too_young");
  }

  protected abstract computeYearlyGlobalOffer(): number;
  protected abstract computeYearlyUniversalOffer(): number;
}

export class AudiQuoteCalculator extends CarQuoteCalculator {
  computeYearlyGlobalOffer(): number {
    return 250;
  }

  computeYearlyUniversalOffer(): number {
    return 250 + this.carValue * 0.3;
  }
}

export class BmwQuoteCalculator extends CarQuoteCalculator {
  computeYearlyGlobalOffer(): number {
    return 150;
  }

  computeYearlyUniversalOffer(): number {
    return 150 + this.carValue * 0.4;
  }
}

export class PorcheQuoteCalculator extends CarQuoteCalculator {
  protected validate(): void {
    super.validate();
    if (this.driverAge < 25) throw new Error("unacceptable_risk");
  }

  computeYearlyGlobalOffer(): number {
    return 500;
  }

  computeYearlyUniversalOffer(): number {
    return 500 + this.carValue * 0.7;
  }
}
