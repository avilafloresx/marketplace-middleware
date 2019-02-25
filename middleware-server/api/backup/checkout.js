import axios from 'axios';

let cookies = [];

function addCookies(cookiesHeader) {
  for (let i = 0; i < cookiesHeader.length; i++) {
    let cookieTmp = cookiesHeader[i].split(';')[0];
    if (cookies.indexOf(cookieTmp) == -1) {
      cookies.push(cookieTmp);
    }
  }
  console.log('XXXXx', cookies);
}

function getCookies() {
  let cookieString = '';
  for (let i = 0; i < cookies.length; i++) {
    cookieString += cookies[i] + ';';
  }
  return cookieString.trim().length > 0 ? cookieString.trim() : null;
}

module.exports = (app, storeName, domainName, apiKey, apiToken) => {

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
/////////test///////////////
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

app.post('/api/authentication/classic/setpassword', (req, res) => {
  const { token, email, password, key } = req.body;
  let urlvtex = 'https://' + domainName + '/api/vtexid/pub/authentication/classic/setpassword';
  let resobj;
  axios.post(urlvtex, {
    authenticationToken: token,
    login: email,
    newPassword: password,
    accessKey: key,
    method: 'POST',
    headers: {
      Cookie: getCookies()
    }
  }).then((response) => {
    //console.log('RES', response);
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
    console.log('ERR', err);
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
