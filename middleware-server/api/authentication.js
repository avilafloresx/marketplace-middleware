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
}

function getCookies() {
  let cookieString = '';
  for (let i = 0; i < cookies.length; i++) {
    cookieString += cookies[i] + ';';
  }
  return cookieString.trim().length > 0 ? cookieString.trim() : null;
}

function getFormId() {
  for (let j = 0; j < cookies.length; j++) {
    let cookieKey = cookies[j].split('=')[0];
    if (cookieKey == 'checkout.vtex.com') {
      return (cookies[j].split('=')[2]);
    }
  }
  return null;
}

module.exports = (app, storeName, domainName, apiKey, apiToken) => {

  app.get('/api/authentication/start', (req, res) => {
    //let urlvtex = 'https://' + domainName + '/api/vtexid/pub/authentication/start?callbackUrl=https%3A%2F%2F' + domainName + '%2Fapi%2Fvtexid%2Fpub%2Fauthentication%2Ffinish&scope=' + storeName + '&user=&locale=en-MX&accountName=&returnUrl=https%253A%252F%252F' + domainName + 'https%253A%252F%252F' + domainName + '%252Fadmin&appStart=true';
    let urlvtex = 'https://' + domainName + '/api/vtexid/pub/authentication/start?callbackUrl=https%3A%2F%2F' + domainName + '%2Fapi%2Fvtexid%2Fpub%2Fauthentication%2Ffinish&scope=' + storeName + '&user=&locale=es-MX&accountName=&returnUrl=%252F&appStart=true'
    let resobj;


    axios.request({
      url: urlvtex,
      method: 'get',
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

    axios.request({
      url: urlvtex,
      method: 'post',
      data: {
        authenticationToken: token,
        email: email,
        method: 'POST'
      },
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
    axios.request({
      url: urlvtex,
      method: 'post',
      data: {
        login: email,
        accesskey: key,
        authenticationToken: token,
        method: 'POST'
      },
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

  app.post('/api/sessions', (req, res) => {
    let urlvtex = 'https://' + domainName + '/api/sessions/';
    let resobj;
    axios.request(urlvtex, {
      url: urlvtex,
      method: 'post',
      data: {
        public: {}
      },
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
    axios.request({
      url: urlvtex,
      method: 'get',
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

  app.get('/api/checkout/pub/orderForm', (req, res) => {
    let urlvtex = 'https://' + domainName + '/api/checkout/pub/orderForm';
    let resobj;
    axios.request({
      url: urlvtex,
      method: 'post',
      data: {
        expectedOrderFormSections: ["items","totalizers","clientProfileData","shippingData","paymentData","sellers","messages","marketingData","clientPreferencesData","storePreferencesData","giftRegistryData","ratesAndBenefitsData","openTextField","commercialConditionData","customData"]
      },
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

  app.get('/api/catalog_system/pub/category/tree', (req, res) => {
    //define deep tree
    let urlvtex = 'https://' + domainName + '/api/catalog_system/pub/category/tree/3';
    let resobj;
    axios.request({
      url: urlvtex,
      method: 'get',
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

  app.get('/api/catalog_system/pub/category/items', (req, res) => {
    ///buscapagina?fq=C%3a%2f1371643%2f1371670%2f&PS=12&sl=b0c7aabe-3a98-47b1-88cd-dca417633ccd&cc=4&sm=0&PageNumber=1
    const { categories } = req.body;
    //pending form URL
    let urlvtex = 'https://' + domainName + '/buscapagina?fq=C%3a%2f1371649%2f1371695%2f1371974%2f&PS=12&sl=2543899b-5eaa-484c-9977-75b0fffb97a9&cc=4&sm=0&PageNumber=1';
    let resobj;
    axios.request({
      url: urlvtex,
      method: 'get',
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

  app.post('/api/checkout/pub/orderForm/item/add', (req, res) => {
    let orderFormId = getFormId();
    let urlvtex = 'https://' + domainName + '/api/checkout/pub/orderForm/' + orderFormId + '/items?sc=1';
    let resobj;
    const { items } = req.body;

    axios.request({
      url: urlvtex,
      method: 'post',
      data: {
        expectedOrderFormSections: ["items","totalizers","clientProfileData","shippingData","paymentData","sellers","messages","marketingData","clientPreferencesData","storePreferencesData","giftRegistryData","ratesAndBenefitsData","openTextField","commercialConditionData","customData"],
        orderItems: items
      },
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

  app.post('/api/checkout/pub/orderForm/item/update', (req, res) => {
    let orderFormId = getFormId();
    let urlvtex = 'https://' + domainName + '/api/checkout/pub/orderForm/' + orderFormId + '/items/update/';
    let resobj;
    const { items } = req.body;
    //{id: "851557", seller: "1", quantity: 0, index: 1}
    axios.request({
      url: urlvtex,
      method: 'post',
      data: {
        expectedOrderFormSections: ["items","totalizers","clientProfileData","shippingData","paymentData","sellers","messages","marketingData","clientPreferencesData","storePreferencesData","giftRegistryData","ratesAndBenefitsData","openTextField","commercialConditionData","customData"],
        noSplitItem: true,
        orderItems: items
      },
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

  //checkout
  app.post('/api/checkout/pub/orderForm/attachments/clientProfileData', (req, res) => {
    let orderFormId = getFormId();
    let urlvtex = 'https://' + domainName + '/api/checkout/pub/orderForm/' + orderFormId + '/attachments/clientProfileData';
    let resobj;
    const { email, name, lastname, phone } = req.body;
    //{id: "851557", seller: "1", quantity: 0, index: 1}
    axios.request({
      url: urlvtex,
      method: 'post',
      data: {
        expectedOrderFormSections: ["items","totalizers","clientProfileData","shippingData","paymentData","sellers","messages","marketingData","clientPreferencesData","storePreferencesData","giftRegistryData","ratesAndBenefitsData","openTextField","commercialConditionData","customData"],
        corporateDocument: null,
        corporateName: null,
        document: null,
        documentType: 'rfc',
        email: email,
        firstEmail: email,
        firstName: name,
        lastName: lastname,
        phone: phone,
        isCorporate: false,
        tradeName: null
      },
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

  app.post('/api/checkout/pub/orderForm/attachments/clientPreferencesData', (req, res) => {
    let orderFormId = getFormId();
    let urlvtex = 'https://' + domainName + '/api/checkout/pub/orderForm/' + orderFormId + '/attachments/clientPreferencesData';
    let resobj;
    const { optinNewsLetter } = req.body;
    //optinNewsLetter = true
    axios.request({
      url: urlvtex,
      method: 'post',
      data: {
        expectedOrderFormSections: ["items","totalizers","clientProfileData","shippingData","paymentData","sellers","messages","marketingData","clientPreferencesData","storePreferencesData","giftRegistryData","ratesAndBenefitsData","openTextField","commercialConditionData","customData"],
        locale: "es-MX",
        optinNewsLetter: optinNewsLetter
      },
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

  app.post('/api/checkout/pub/orderForm/attachments/shippingData', (req, res) => {
    let orderFormId = getFormId();
    let urlvtex = 'https://' + domainName + '/api/checkout/pub/orderForm/' + orderFormId + '/attachments/shippingData';
    let resobj;
    const { shippingData } = req.body;
    shippingData['expectedOrderFormSections'] = ["items","totalizers","clientProfileData","shippingData","paymentData","sellers","messages","marketingData","clientPreferencesData","storePreferencesData","giftRegistryData","ratesAndBenefitsData","openTextField","commercialConditionData","customData"];
    //1
    //address = null
    //availableAddresses = []
    //pickupPoints = []
    //selectedAddresses,
    //logisticsInfo:[{"itemIndex":0,"selectedSla":"Envío domicilio","selectedDeliveryChannel":"delivery","addressId":null,"slas":[],"shipsTo":["MEX"],"itemId":"851557","deliveryChannels":[{"id":"delivery"}]}],
    //2 load preform (before zipcode)
    //clearAddressIfPostalCodeNotFound: true
    //"address":{"postalCode":"11000","city":"MIGUEL HIDALGO","state":"Ciudad de México","country":"MEX","street":"","number":"","neighborhood":"","complement":"","reference":"","geoCoordinates":[],"neighborhoods":"Lomas de Chapultepec I Sección::Lomas de Chapultepec II Sección::Lomas de Chapultepec VIII Sección::Lomas de Chapultepec VI Sección::Lomas de Chapultepec IV Sección::Lomas de Chapultepec V Sección::Lomas de Chapultepec VII Sección::Lomas de Chapultepec III Sección","receiverName":"Jimena Avila","postalCodeIsValid":true},
    //3 (el 2 devuelve addressId)
    //address:{"addressId":"6d3c0c2fab66454787cd95003c5a6c7b","addressType":"residential","city":"MIGUEL HIDALGO","complement":null,"country":"MEX","geoCoordinates":[],"neighborhood":"Lomas de Chapultepec I Sección","number":"2","postalCode":"11000","receiverName":"Jimena Avila","reference":null,"state":"CIUDAD DE MÉXICO","street":"calle"},
    //logisticsInfo:[{"itemIndex":0,"selectedSla":"Envío domicilio","selectedDeliveryChannel":"delivery"}]
    //

    axios.request({
      url: urlvtex,
      method: 'post',
      data: shippingData,
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

  app.get('/api/checkout/pub/postal-code/MEX', (req, res) => {
    ///buscapagina?fq=C%3a%2f1371643%2f1371670%2f&PS=12&sl=b0c7aabe-3a98-47b1-88cd-dca417633ccd&cc=4&sm=0&PageNumber=1
    const { zipcode } = req.body;
    //pending form URL
    let urlvtex = 'https://' + domainName + '/api/checkout/pub/postal-code/MEX/' + zipcode;
    let resobj;
    axios.request({
      url: urlvtex,
      method: 'get',
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

  app.post('/api/checkout/pub/orderForm/attachments/paymentData', (req, res) => {
    let orderFormId = getFormId();
    let urlvtex = 'https://' + domainName + '/api/checkout/pub/orderForm/' + orderFormId + '/attachments/paymentData';
    let resobj;
    const { payments } = req.body;
    //payment of paymentData.installmentOptions || paymentData.paymentSystems
    //payments = [{"paymentSystem":18,"referenceValue":3689700,"installments":1}]
    axios.request({
      url: urlvtex,
      method: 'post',
      data: {
        expectedOrderFormSections: ["items","totalizers","clientProfileData","shippingData","paymentData","sellers","messages","marketingData","clientPreferencesData","storePreferencesData","giftRegistryData","ratesAndBenefitsData","openTextField","commercialConditionData","customData"],
        giftCards: [],
        payments: payments
      },
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
}
