const envConfiguration = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required');
  }

  if (!process.env.WEATHER_API_KEY) {
    throw new Error('WEATHER_API_KEY is required');
  }

  if (!process.env.WEATHER_API_URL_BASE) {
    throw new Error('WEATHER_API_URL_BASE is required');
  }

  return {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    WEATHER_API_URL_BASE: process.env.WEATHER_API_URL_BASE,
  };
};

export { envConfiguration };
