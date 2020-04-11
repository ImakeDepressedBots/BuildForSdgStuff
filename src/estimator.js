/* eslint-disable linebreak-style */
const covid19ImpactEstimator = (data) => {
  const inputPayload = data;
  let period;

  if (inputPayload.periodType === 'days') {
    period = data.timeToElapse;
  } else if (inputPayload.periodType === 'weeks') {
    period = data.timeToElapse * 7;
  } else if (inputPayload.periodType === 'months') {
    period = data.timeToElapse * 30.4167;
  }
  const { reportedCases } = data;
  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevereImpact = reportedCases * 50;
  const infectionsByRequestedTimeImpact = currentlyInfectedImpact * (2 ** period / 3);
  const infectionsByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** period / 3);

  return {
    data: inputPayload,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeSevereImpact
    }

  };
};

export default covid19ImpactEstimator;
