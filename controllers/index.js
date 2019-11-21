const https = require('https');
/**
 *
 * @param {string} userInput
 */
function getLevel(userInput) {}

/**
 * main route controller
 * */
const main = async (req, res, error) => {
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
                  1. Imihindagurikire y'ikirere
                  2. Ubuhinzi
      `;
        break;
      } else {
        response = `CON Choose the information you need \n
                  1. Climate change
                  2. Agriculture
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
      if (parseInt(menuArguments[0], 10) === 1) {
        const district = menuArguments[2];
        if (!district) {
          response = "CON Ongera ushyirimo izina ry'akarere";
          break;
        }
        if (parseInt(menuArguments[1], 10) === 1) {
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
            { district: 'Gasabo', cities: ['Kigali'] }
          ];

          const districtData = districts.find(
            city => city.district.toLowerCase() === district
          );

          if (!districtData) {
            response = "CON Ongera ushyirimo izina ry'akarere";
            break;
          }
          const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${districtData.cities[0]},rw&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`;

          const weatherInfo = await new Promise((resolve, reject) => {
            https
              .get(WEATHER_API, response => {
                let data = '';
                response.on('data', chunk => (data += chunk));
                response.on('end', () => resolve(JSON.parse(data)));
              })
              .on('error', err => {
                return reject(err);
              });
          });

          response = `END Iteganyagihe mu karere ka ${districtData.district} \n
                      ${weatherInfo.weather[0].description} \n
                      ${weatherInfo.main.temp} \n
                      ${weatherInfo.main.temp_min} \n
                      ${weatherInfo.main.temp_max} \n
                      Izuba rirarenga ${new Date(
                        weatherInfo.sys.sunset
                      ).getHours()}:${new Date(
            weatherInfo.sys.sunset
          ).getMinutes()} ${new Date(weatherInfo.sys.sunset).getSeconds()}
              `;
          break;
        } else {
          response = `CON Hitamo icyiciro
                  1. Igihe cyihinga
                  2. Igihingwa k'akarere
                  3. Iyuhira
                  4. Kubungabunga ubutaka no kongera umusaruro
                  5. Imbuto zo guhinga
                  6. Kubungabunga ibidukikije mubuhinzi
                  7. Kugurisha umusaruro
                  100. Subira inyuma
              `;
          break;
        }
      } else {
        if (parseInt(menuArguments[1], 10) === 1) {
        } else {
          response = `CON Select section
                  1. Agriculture periods
                  2. Your district's crop
                  3. Irrigation
                  4. Land conservation and increasing crop yield
                  5. Agriculture fruits
                  6. Environment conservation in Agriculture
                  7. Sell agriculture production
                  100. Back
              `;
          break;
        }
      }
    }

    case 4: {
      if (parseInt(menuArguments[3], 10) === 1) {
        response = `END Turi mugihebwe cy'ihinga A \n
                    Igihe cy'ihinga A gitangira mu KUBOZA – GASHYANTARE (umwaka ukurikira)\n
                    Igihe cy’ihinga B gitangira muri GICURASI – KAMENA \n
                    Igihe cy’ihinga C gitangira muri KANAMA – NZELI 
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
        response = 'END Umubare muhisemo ntubaho!';
        break;
      }
    }

    default:
      response = 'END Wrong choice!';
      break;
  }
  return res.status(200).send(response);
};

module.exports = {
  main
};
