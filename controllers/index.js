import https from 'https';
import contentful from 'contentful';
import { formatDescription } from '../utils/formatDescription.js';
import { formatSeasons } from '../utils/formatSeasons.js';

/**
 *
 * @param {string} userInput
 */
function getLevel(userInput) {}

/**
 * main route controller
 * */
export const main = async (req, res, error) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  let menuArguments;
  let menuLevel;
  let response;

  if (text) {
    menuArguments = text.split('*');
    menuLevel = menuArguments.length;
  } else {
    menuArguments = [];
    menuLevel = 0;
  }

  if (parseInt(menuArguments[menuLevel - 1]) === 100) {
    menuArguments.splice(menuLevel - 2, 2);
    menuLevel = menuLevel - 2;
  }

  switch (menuLevel) {
    case 0:
      response = `CON Murakaza neza! Hitamo ururimi \n
                  1. Kinyarwanda \n
                  2. English \n
      `;
      break;

    case 1:
      if (parseInt(menuArguments[0], 10) === 1) {
        response = `CON Hitamo amakuru ushaka \n
                  1. Imihindagurikire y'ikirere`;
        break;
      } else {
        response = `CON Choose the information you need \n
                  1. Climate change
      `;
        break;
      }

    case 2: {
      if (parseInt(menuArguments[0], 10) === 1) {
        response = "CON Shyiramo izina ry'akarere";
        break;
      } else {
        response = 'CON Enter the name of the district';
        break;
      }
    }

    case 3: {
      const districts = [
        { district: 'Rubavu', cities: ['Rubavu', 'Gisenyi'] },
        { district: 'Ngoma', cities: ['Kibungo'] },
        { district: 'Gicumbi', cities: ['Byumba'] },
        { district: 'Huye', cities: ['Huye'] },
        { district: 'Musanze', cities: ['Musanze'] },
        { district: 'Karongi', cities: ['Kibuye'] },
        { district: 'Rusizi', cities: ['Cyangugu'] },
        { district: 'Nyaruguru', cities: ['Gikongoro'] },
        { district: 'Kicukiro', cities: ['Samuduha', 'Nyakabanda'] },
        { district: 'Muhanga', cities: ['Gitarama'] },
        { district: 'Nyamagabe', cities: ['Nzega'] },
        { district: 'Nyarugenge', cities: ['Kannyogo'] },
        { district: 'Kigali', cities: ['Kigali'] },
        { district: 'Gasabo', cities: ['Kigali'] },
      ];
      if (parseInt(menuArguments[0], 10) === 1) {
        const district = menuArguments[2];
        if (!district) {
          response = "CON Ongera ushyirimo izina ry'akarere";
          break;
        }
        if (parseInt(menuArguments[1], 10) === 1) {
          const districtData = districts.find(
            (city) => city.district.toLowerCase() === district
          );

          if (!districtData) {
            response = "CON Ongera ushyirimo izina ry'akarere";
            break;
          }
          const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${districtData.cities[0]},rw&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`;

          const weatherInfo = await new Promise((resolve, reject) => {
            https
              .get(WEATHER_API, (response) => {
                let data = '';
                response.on('data', (chunk) => (data += chunk));
                response.on('end', () => resolve(JSON.parse(data)));
              })
              .on('error', (err) => {
                return reject(err);
              });
          });

          response = `END Iteganyagihe mu karere ka ${districtData.district} \n
                      ${formatDescription(
                        weatherInfo.weather[0].description
                      )} \n
                      Igipimo cyubushuye cyohasi ni ${
                        weatherInfo.main.temp_min
                      }°C \n
                      Igipimo cyubushuye cyohejuru ni ${
                        weatherInfo.main.temp_max
                      }°C \n
                      Izuba rirarenga ${new Date(
                        weatherInfo.sys.sunset
                      ).getHours()}:${new Date(
            weatherInfo.sys.sunset
          ).getMinutes()} 
              `;
          break;
        } else {
          response = `CON Hitamo icyiciro
                  1. Igihe cyihinga
                  2. Igihingwa k'akarere
                  3. Iyuhira
                  4. Kubungabunga ibidukikije no kongera umusaruro
                  5. Imbuto zo guhinga
                  100. Subira inyuma
              `;
          break;
        }
      } else {
        const district = menuArguments[2];
        if (!district) {
          response = "CON Enter the district's name please!";
          break;
        }
        if (parseInt(menuArguments[1], 10) === 1) {
          const districtData = districts.find(
            (city) => city.district.toLowerCase() === district
          );

          if (!districtData) {
            response = "CON Enter the district's name please!";
            break;
          }
          const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${districtData.cities[0]},rw&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`;

          const weatherInfo = await new Promise((resolve, reject) => {
            https
              .get(WEATHER_API, (response) => {
                let data = '';
                response.on('data', (chunk) => (data += chunk));
                response.on('end', () => resolve(JSON.parse(data)));
              })
              .on('error', (err) => {
                return reject(err);
              });
          });

          response = `END Weather forecast in ${districtData.district} \n
                        The weather will mostly be ${
                          weatherInfo.weather[0].description
                        } \n
                        The lowest temperature will be ${
                          weatherInfo.main.temp_min
                        }°C \n
                        The highest temperature will be ${
                          weatherInfo.main.temp_max
                        }°C \n
                        The Sun will set at ${new Date(
                          weatherInfo.sys.sunset
                        ).getHours()}:${new Date(
            weatherInfo.sys.sunset
          ).getMinutes()} 
                `;
          break;
        } else {
          response = `CON Select section
                  1. Agriculture periods
                  2. Your district's crop
                  3. Irrigation
                  4. Environment conservation and increasing crop yield
                  5. Agriculture fruits
                  100. Back
              `;
          break;
        }
      }
    }

    case 4: {
      if (parseInt(menuArguments[3], 10) === 1) {
        const client = contentful.createClient({
          space: process.env.CT_SPACE_ID,
          accessToken: process.env.CT_DELIVERY_ACCESS_KEY,
        });
        const seasonsJson = await client.getEntries({
          content_type: 'agricultureSeason',
          'fields.year': '2019-2020',
        });
        const formatedSeason = formatSeasons(seasonsJson.items);
        response = `END ${formatedSeason.next().value}
              ${formatedSeason.next().value}
              ${formatedSeason.next().value}
              ${formatedSeason.next().value}
            `;
        break;
      } else if (parseInt(menuArguments[3], 10) === 2) {
        response = 'END Turacyakusanya amakuru yose!';
        break;
      } else if (parseInt(menuArguments[3], 10) === 3) {
        response = 'END Turacyakusanya amakuru yose!';
        break;
      } else if (parseInt(menuArguments[3], 10) === 4) {
        response = 'END Turacyakusanya amakuru yose!';
        break;
      } else if (parseInt(menuArguments[3], 10) === 5) {
        response = 'END Turacyakusanya amakuru yose!';
        break;
      } else if (parseInt(menuArguments[3], 10) === 6) {
        response = 'END Turacyakusanya amakuru yose!';
        break;
      } else if (parseInt(menuArguments[3], 10) === 7) {
        response = 'END Turacyakusanya amakuru yose!';
        break;
      } else {
        response = 'END Umubare muhisemo ntiwemewe!';
        break;
      }
    }

    default:
      response = 'END Wrong choice!';
      break;
  }
  return res.status(200).send(response);
};
