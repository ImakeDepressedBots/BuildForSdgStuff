/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const covid19ImpactEstimator = (data) => {
  const inputPayload = data;
  const totalBeds = data.totalHospitalBeds;
  const availableBeds = Math.ceil(0.35 * totalBeds);
  const dailyIncome = data.avgDailyIncomeInUSD;
  const incomePopulation = data.avgDailyIncomePopulation;
  let period;

  if (inputPayload.periodType === 'days') {
    period = data.timeToElapse;
  } else if (inputPayload.periodType === 'weeks') {
    period = data.timeToElapse * 7;
  } else if (inputPayload.periodType === 'months') {
    period = data.timeToElapse * 30;
  }

  const { reportedCases } = data;
  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevereImpact = reportedCases * 50;
  const infectionsByRequestedTimeImpact = currentlyInfectedImpact * (2 ** (Math.floor((period / 3))));
  const infectionsByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** (Math.floor((period / 3))));
  const severeCasesByRequestedTimeImpact = 0.15 * infectionsByRequestedTimeImpact;
  const severeCasesByRequestedTimeSevereImpact = 0.15 * infectionsByRequestedTimeSevereImpact;
  const hospitalBedsByRequestedTimeImpact = Math.floor(availableBeds - severeCasesByRequestedTimeImpact);
  const hospitalBedsByRequestedTimeSevereImpact = Math.floor(availableBeds - severeCasesByRequestedTimeSevereImpact);
  const casesForICUByRequestedTimeImpact = 0.05 * Math.floor(infectionsByRequestedTimeImpact);
  const casesForICUByRequestedTimeSevereImpact = 0.05 * Math.floor(infectionsByRequestedTimeSevereImpact);
  const casesForVentilatorsByRequestedTimeImpact = 0.02 * Math.floor(infectionsByRequestedTimeImpact);
  const casesForVentilatorsByRequestedTimeSevereIpact = 0.02 * Math.floor(infectionsByRequestedTimeSevereImpact);
  const dollarsInFlightImpact = Math.floor((infectionsByRequestedTimeImpact * incomePopulation) * dailyIncome * Math.floor(period));
  const dollarsInFlightSevere = Math.floor((infectionsByRequestedTimeSevereImpact * incomePopulation) * dailyIncome * Math.floor(period));


  return {
    data: inputPayload,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeImpact,
      casesForICUByRequestedTime: casesForICUByRequestedTimeImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeImpact,
      dollarsInFlight: dollarsInFlightImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeSevereImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevereImpact,
      casesForICUByRequestedTime: casesForICUByRequestedTimeSevereImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeSevereIpact,
      dollarsInFlight: dollarsInFlightSevere
    }

  };
};

export default covid19ImpactEstimator;
