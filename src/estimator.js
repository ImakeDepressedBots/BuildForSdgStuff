/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const covid19ImpactEstimator = (data) => {
  const inputPayload = data;
  const totalBeds = data.totalHospitalBeds;
  const availableBeds  = Math.floor(0.35 * totalBeds);
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
  const hospitalBedsByRequestedTimeImpact = availableBeds - severeCasesByRequestedTimeImpact;
  const hospitalBedsByRequestedTimeSevereImpact = availableBeds - severeCasesByRequestedTimeSevereImpact;


  return {
    data: inputPayload,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeSevereImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevereImpact
    }

  };
};

export default covid19ImpactEstimator;
