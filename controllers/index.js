/**
 * main route controller
 * */
const main = (req, res, error) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  return res.status(200).send('working!');
};

module.exports = {
  main
};
