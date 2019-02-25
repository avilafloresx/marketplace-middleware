import axios from 'axios';

let cookies = [];

function addCookies(cookiesHeader) {
  if (!cookiesHeader)
    return;

  for (let i = 0; i < cookiesHeader.length; i++) {
    let cookieTmp = cookiesHeader[i].split(';')[0];
    let cookieKeyTmp = cookieTmp.split('=')[0];
    let found = false;
    for (let j = 0; j < cookies.length; j++) {
      let cookieKey = cookies[j].split('=')[0];
      if (cookieKey == cookieKeyTmp) {
        found = true;
        cookies[j] = cookieTmp;
        break;
      }
    }

    if (!found) {
      cookies.push(cookieTmp);
    }

  }
  console.log('XXXXx', cookies);
}

function getFormParam() {
  let found = false;
  for (let j = 0; j < cookies.length; j++) {
    let cookieKey = cookies[j].split('=')[0];
    if (cookieKey == 'checkout.vtex.com') {
      console.log('YYYY', cookies[j]);
      return '/' + (cookies[j].split('=')[2]);
    }
  }
  return '';
}

function getCookies() {
  let cookieString = '';
  for (let i = 0; i < cookies.length; i++) {
    cookieString += cookies[i] + ';';
  }
  return cookieString.trim().length > 0 ? cookieString.trim() : null;
}

module.exports = (app, storeName, domainName, apiKey, apiToken) => {

  app.get('/api/authentication/start', (req, res) => {
    //let urlvtex = 'https://' + domainName + '/api/vtexid/pub/authentication/start?callbackUrl=https%3A%2F%2F' + domainName + '%2Fapi%2Fvtexid%2Fpub%2Fauthentication%2Ffinish&scope=' + storeName + '&user=&locale=en-MX&accountName=&returnUrl=https%253A%252F%252F' + domainName + 'https%253A%252F%252F' + domainName + '%252Fadmin&appStart=true';
    let urlvtex = 'https://' + domainName + '/api/vtexid/pub/authentication/start?callbackUrl=https%3A%2F%2F' + domainName + '%2Fapi%2Fvtexid%2Fpub%2Fauthentication%2Ffinish&scope=' + storeName + '&user=&locale=es-MX&accountName=&returnUrl=%252F&appStart=true'
    let resobj;
    axios.get(urlvtex, {
      headers: {
        Cookie: getCookies()
      }
    }).then((response) => {
      resobj = {
        success: true,
        data: response.data,
        headers: response.headers
      }
      addCookies(response.headers['set-cookie']);
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(resobj));
    }).catch((err) =>{
      resobj = {
        success: false,
        data: err
      }
      console.log('ERR', err);
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(null);
    });

  });

  app.post('/api/authentication/accesskey/send', (req, res) => {
    const { token, email } = req.body;
    let urlvtex = 'https://' + domainName + '/api/vtexid/pub/authentication/accesskey/send?recaptcha=&authenticationToken=' + token + '&email=' + email;
    let resobj;
    axios.post(urlvtex, {
      authenticationToken: token,
      email: email,
      method: 'POST',
      headers: {
        Cookie: getCookies()
      }
    }).then((response) => {
      resobj = {
        success: true,
        data: response.data,
        headers: response.headers
      }
      addCookies(response.headers['set-cookie']);
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(resobj));
    }).catch((err) =>{
      resobj = {
        success: false,
        data: err
      }
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(resobj));
    });
  });

  app.post('/api/authentication/accesskey/validate', (req, res) => {
    const { token, email, key } = req.body;
    let urlvtex = 'https://' + domainName + '/api/vtexid/pub/authentication/accesskey/validate?login=' + email + '&accesskey=' + key + '&authenticationToken=' + token;
    let resobj;
    axios.post(urlvtex, {
      login: email,
      accesskey: key,
      authenticationToken: token,
      method: 'POST',
      headers: {
        Cookie: getCookies()
      }
    }).then((response) => {
    	resobj = {
        success: true,
        data: response.data,
        headers: response.headers
      }
      addCookies(response.headers['set-cookie']);
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(resobj));
    }).catch((err) =>{
      resobj = {
        success: false,
        data: err
      }
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(resobj));
    });
  });
  //test
  app.get('/api/checkout/pub/orderForm', (req, res) => {
    let urlvtex = 'https://' + domainName + '/api/checkout/pub/orderForm';
    let resobj;
    axios.post(urlvtex, {
      expectedOrderFormSections: ["items","totalizers","clientProfileData","shippingData","paymentData","sellers","messages","marketingData","clientPreferencesData","storePreferencesData","giftRegistryData","ratesAndBenefitsData","openTextField","commercialConditionData","customData"],
      headers: {
        Cookie: getCookies()
      }
    }).then((response) => {
      resobj = {
        success: true,
        data: response.data,
        headers: response.headers
      }
      addCookies(response.headers['set-cookie']);
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(resobj));
    }).catch((err) =>{
      resobj = {
        success: false,
        data: err
      }
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(resobj));
    });
  });

  app.get('/no-cache/profileSystem/getProfile', (req, res) => {
    let urlvtex = 'https://' + domainName + '/no-cache/profileSystem/getProfile';
    let resobj;
    axios.get(urlvtex, {
      headers: {
        Cookie: getCookies()
      }
    }).then((response) => {
      resobj = {
        success: true,
        data: response.data,
        headers: response.headers
      }
      addCookies(response.headers['set-cookie']);
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(resobj));
    }).catch((err) =>{
      resobj = {
        success: false,
        data: err
      }
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(resobj));
    });
  });
  //test4
  app.get('/api/checkout/pub/orderForm2', (req, res) => {
    let urlvtex = 'https://' + domainName + '/api/checkout/pub/orderForm/f4d4ba0dab404f849b08dc436b2f0787';
    let resobj;
    axios.post(urlvtex, {
      expectedOrderFormSections: ["items","totalizers","clientProfileData","shippingData","paymentData","sellers","messages","marketingData","clientPreferencesData","storePreferencesData","giftRegistryData","ratesAndBenefitsData","openTextField","commercialConditionData","customData"],
      headers: {
        Cookie: ''
      }
    }).then((response) => {
      resobj = {
        success: true,
        data: response.data,
        headers: response.headers
      }
      addCookies(response.headers['set-cookie']);
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(resobj));
    }).catch((err) =>{
      resobj = {
        success: false,
        data: err
      }
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(resobj));
    });
  });
}
