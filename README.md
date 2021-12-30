## **Weather USSD App**

This is USSD app for accessing weather forecast information. Currently it's using [Open Weather](https://openweathermap.org/api) API to get weather forecast data.

### **How to run the app**

1. Clone this repo: `git clone git@github.com:avpaul/menya-ussd.git`
2. Create an account a free account on [Open Weather](https://home.openweathermap.org/users/sign_up) to get an API KEY
3. Add `.env` file with `OPEN_WEATHER_API_KEY=***COPY_PASTE_API_KEY***`
4. Run `yarn install` to install dependencies
5. Start the dev server by running `yarn dev`

### **How to deploy on Heroku**

Remember to set up environment variables on Heroku: `OPEN_WEATHER_API_KEY`

There are many guide on how to deploy a `NodeJS App` on heroku online, follow one.

At the end of the deployment you will have a `URL` of your deployed application

### **Deploy USSD app with AfricasTalking**

AfricasTalking provides a simple service to test and deploy your USSD apps

:warning: **Guide**: [https://andela.com/insights/africas-talking-node-js-express-ussd-application/](https://andela.com/insights/africas-talking-node-js-express-ussd-application/)


