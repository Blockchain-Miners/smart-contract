export const getAppConfig = async () => {
  const PROFILE = process.env.REACT_APP_PROFILE;
  const CONFIG_URL = PROFILE === 'PRODUCTION' ? '/config/config.json' : '/config/dev-config.json';

  const configResponse = await fetch(CONFIG_URL, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const config = await configResponse.json();
  return config;
};

export const getOgBmcAbi = async () => {
  const bmcAbiResponse = await fetch('/config/abi.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const ogBmcAbi = await bmcAbiResponse.json();
  return ogBmcAbi;
};

export const getUltraMinerAbi = async () => {
  const umAbiResponse = await fetch('/config/umabi.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const umAbi = await umAbiResponse.json();
  return umAbi;
};

export const getHashPowerAbi = async () => {
  const hashPowerAbiResponse = await fetch('/config/hash-power.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const hasPowerAbi = await hashPowerAbiResponse.json();
  return hasPowerAbi;
};
