import axios from 'axios';
//https://elektraqa.vtexcommercestable.com.br/api/vtexid/pub/authentication/classic/setpassword
//POST
//authenticationToken: 3F2806A09A6C100762E30B05813CBB7E422A165841AD5AFEF5328F3BD8710E6C
//newPassword: Aili850311855
//login: avilafloresx@gmail.com
//accessKey: 564134
//method: POST


module.exports = (app, storeName, domainName, apiKey, apiToken) => {

  app.post('/api/authentication/accesskey/validate', (req, res) => {
    const { token, email, key } = req.body;
    let urlvtex = 'https://' + domainName + '/api/vtexid/pub/authentication/accesskey/validate?login=' + email + '&accesskey=' + key + '&authenticationToken=' + token;
    let resobj;
    axios.get(urlvtex).then((response) => {
    	resobj = {
        success: true,
        data: response.data
      }
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
    /*RIGHT*/
    /*
    "success": true,
    "data": {
        "authStatus": "Success",
        "promptMFA": false,
        "clientToken": null,
        "authCookie": {
            "Name": "VtexIdclientAutCookie_elektra",
            "Value": "eyJhbGciOiJFUzI1NiIsImtpZCI6IjcwMkMzQ0I2OTYxMkFGNEVGRTI5REU3M0UxMTY5N0U2REIwOTM1MTgiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJhYXZpbGFsLjAzMDRAZ21haWwuY29tIiwiYWNjb3VudCI6ImVsZWt0cmEiLCJhdXRob3JpemFibGVzIjpbInZybjppYW06ZWxla3RyYTp1c2Vycy9hYXZpbGFsLjAzMDRAZ21haWwuY29tIl0sImV4cCI6MTUyNzgwODY3NSwidXNlcklkIjoiYWRiNzljNDEtMzBlOC00MDY5LWE5YmMtMmY2OGY0ZThhODFlIiwiaWF0IjoxNTI3NzIyMjY2LCJqdGkiOiIyNzZkMGFkZC0xMjg5LTQwZDUtYmM2Ny1kZjdlYzc1NDRjNjMiLCJpc3MiOiJ0b2tlbi1lbWl0dGVyIn0.2szU3jrzz-dmSgINOr5Gzsb2_cFzW5aiPJPcoAbfWq3ZsohDqKChkBSvqVwaEcUct2FWqU6FWJGx32xmJWrKHg"
        },
        "accountAuthCookie": {
            "Name": "VtexIdclientAutCookie_b765f158-0145-4f52-9720-82fc7a6fa437",
            "Value": "eyJhbGciOiJFUzI1NiIsImtpZCI6IjcwMkMzQ0I2OTYxMkFGNEVGRTI5REU3M0UxMTY5N0U2REIwOTM1MTgiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJhYXZpbGFsLjAzMDRAZ21haWwuY29tIiwiYWNjb3VudCI6ImVsZWt0cmEiLCJhdXRob3JpemFibGVzIjpbInZybjppYW06ZWxla3RyYTp1c2Vycy9hYXZpbGFsLjAzMDRAZ21haWwuY29tIl0sImV4cCI6MTUyNzgwODY3NSwidXNlcklkIjoiYWRiNzljNDEtMzBlOC00MDY5LWE5YmMtMmY2OGY0ZThhODFlIiwiaWF0IjoxNTI3NzIyMjY2LCJqdGkiOiIyNzZkMGFkZC0xMjg5LTQwZDUtYmM2Ny1kZjdlYzc1NDRjNjMiLCJpc3MiOiJ0b2tlbi1lbWl0dGVyIn0.2szU3jrzz-dmSgINOr5Gzsb2_cFzW5aiPJPcoAbfWq3ZsohDqKChkBSvqVwaEcUct2FWqU6FWJGx32xmJWrKHg"
        },
        "expiresIn": 86399,
        "userId": "adb79c41-30e8-4069-a9bc-2f68f4e8a81e",
        "phoneNumber": null,
        "scope": null
    }
    */
    /*WRONG
    "success": true,
    "data": {
        "authStatus": "WrongCredentials",
        "promptMFA": false,
        "clientToken": null,
        "authCookie": null,
        "accountAuthCookie": null,
        "expiresIn": 0,
        "userId": null,
        "phoneNumber": null,
        "scope": null
    }
    */
  });
  app.post('/test', (req, res) => {
    let urlvtex = 'https://www.elektra.com.mx/no-cache/profileSystem/getProfile';
    urlvtex = 'https://www.elektra.com.mx/api/checkout/pub/orderForm';
    urlvtex = 'https://www.elektra.com.mx/api/checkout/pub/orders/';
    let resobj;
    /*
    axios.get(urlvtex,{
            headers: {
                Cookie: "VtexRCMacIdv7=42c257b1-63a0-11e8-89c8-7b1ccb13c8c5; AMCVS_1A0F1283593015600A495D98%40AdobeOrg=1; _ga=GA1.3.1508441982.1527640064; _gid=GA1.3.1429440184.1527640064; ISSMB=ScreenMedia=0&UserAcceptMobile=False; s_cc=true; VtexFingerPrint=4214c8ebef24c0a65457b310d868ccc5; cto_lwid=8f4f3718-0cef-42be-86a3-33835626dbe3; picreel_tracker__first_visit=Tue%20May%2029%202018%2019%3A27%3A47%20GMT-0500%20(hora%20de%20verano%20central); elektra_mx=visit; picreel_tracker__visited=1; inptime0_5849_null=0; cto_idcpy=06783a68-7558-43d5-a725-e6a20ab00a0c; criteo_cookie_header=1; s_camp=%3A%3A1527700746456; IPS=Parceiro=1527700746456; urlLastSearch=http://www.elektra.com.mx/audifono; __atuvc=39%7C22; VtexRCSessionIdv7=0%3A9d1e4430-645e-11e8-9259-2798f56872c4; AMCV_1A0F1283593015600A495D98%40AdobeOrg=1099438348%7CMCIDTS%7C17682%7CMCMID%7C30782364020351591183897296421645397547%7CMCAAMLH-1528244864%7C7%7CMCAAMB-1528326617%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1527729017s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-17689%7CvVersion%7C2.1.0; gpv=no%20value; s_lv_s=Less%20than%201%20day; vtex_segment=eyJjaGFubmVsIjpudWxsLCJwcmljZVRhYmxlcyI6bnVsbCwicmVnaW9uSWQiOm51bGwsInV0bV9zb3VyY2UiOm51bGx9; i18next=en-US; checkout.vtex.com=__ofid=bc02c2c7d0714b488e718419a565df84; VTEXSC=sc=1; .ASPXAUTH=FEE993C6FCD8651B72FB306CF9D1ABC82FD9025188D62D113127FD86074A27796500434261EC85E0404C0E7FB97864BE745BBE8703A049361D17BD12A0945A602F451A4A1173EF64FD40D0D617D1F1E594381B302FBCDA57AB9DDA1458C1CCEBA30DFBB2B2CF4C88304F5EEC85E6AB1CD3367B0C1232BA92F0C0B1C9FB20C4FC18DA8C8CC7FD5B1616DACFBE40FCD3C5210B97C013923F13A49F53ADD847CE391A607A47; VtexIdclientAutCookie_elektra=eyJhbGciOiJFUzI1NiIsImtpZCI6IjcwMkMzQ0I2OTYxMkFGNEVGRTI5REU3M0UxMTY5N0U2REIwOTM1MTgiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJhYXZpbGFsLjAzMDRAZ21haWwuY29tIiwiYWNjb3VudCI6ImVsZWt0cmEiLCJhdXRob3JpemFibGVzIjpbInZybjppYW06ZWxla3RyYTp1c2Vycy9hYXZpbGFsLjAzMDRAZ21haWwuY29tIl0sImV4cCI6MTUyNzgwODgxNSwidXNlcklkIjoiYWRiNzljNDEtMzBlOC00MDY5LWE5YmMtMmY2OGY0ZThhODFlIiwiaWF0IjoxNTI3NzIyNDA1LCJqdGkiOiIxMGFkODA1Ni01NTkxLTQ1MDQtOTM3ZC02OThhNjU4YmY2N2UiLCJpc3MiOiJ0b2tlbi1lbWl0dGVyIn0.W1FyPVcGQGUf8n-2YHGpvwovaG2v--IsohpOWpx8oWvYnvAk3oqs4zsTn4MBh3hIaFdSeSRhjE-ky4O0hqujAw; VtexIdclientAutCookie_b765f158-0145-4f52-9720-82fc7a6fa437=eyJhbGciOiJFUzI1NiIsImtpZCI6IjcwMkMzQ0I2OTYxMkFGNEVGRTI5REU3M0UxMTY5N0U2REIwOTM1MTgiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJhYXZpbGFsLjAzMDRAZ21haWwuY29tIiwiYWNjb3VudCI6ImVsZWt0cmEiLCJhdXRob3JpemFibGVzIjpbInZybjppYW06ZWxla3RyYTp1c2Vycy9hYXZpbGFsLjAzMDRAZ21haWwuY29tIl0sImV4cCI6MTUyNzgwODgxNSwidXNlcklkIjoiYWRiNzljNDEtMzBlOC00MDY5LWE5YmMtMmY2OGY0ZThhODFlIiwiaWF0IjoxNTI3NzIyNDA1LCJqdGkiOiIxMGFkODA1Ni01NTkxLTQ1MDQtOTM3ZC02OThhNjU4YmY2N2UiLCJpc3MiOiJ0b2tlbi1lbWl0dGVyIn0.W1FyPVcGQGUf8n-2YHGpvwovaG2v--IsohpOWpx8oWvYnvAk3oqs4zsTn4MBh3hIaFdSeSRhjE-ky4O0hqujAw; s_sq=%5B%5BB%5D%5D; VTEXRequestVerificationToken=ace689cf7cac462190e67269bc6dd7f1; SGTS=24125A99AD5042569ACF2FDAEA10352E; _gat_UA-3164251-1=1; s_lv=1527725041326; s_getNewRepeat=1527725041327-Repeat; vtex_session=eyJhbGciOiJFUzI1NiIsImtpZCI6IjZCNzMxMkQzRDhGNkQwNjNGMEFBNDY3NzJCQzI3QzVDNzk1RDc4MEMiLCJ0eXAiOiJqd3QifQ.eyJhY2NvdW50LmlkIjoiYjc2NWYxNTgtMDE0NS00ZjUyLTk3MjAtODJmYzdhNmZhNDM3IiwiaWQiOiJkYWIyYWZlMi0xMmNmLTRiZGItYTQxZi00ZjNiMmM1OTExZWUiLCJ2ZXJzaW9uIjoxMywic3ViIjoic2Vzc2lvbiIsImFjY291bnQiOiJzZXNzaW9uIiwiZXhwIjoxNjg1NDA1MDQxLCJpYXQiOjE1Mjc3MjUwMzIsImp0aSI6IjA1YWYwZThjLWE0MGQtNDRhZC05OTI0LTUxZjA0YzRmYzU5YiIsImlzcyI6InRva2VuLWVtaXR0ZXIifQ.Nlt7rpo01cTc4_xHhO9scTGfKRghnIE8u11AQJgazFQ0qgAS-oMDBm855RoFSG7fAeeCaluelTfM7ckgbaisMw; s_ppvl=https%253A%2F%2Fwww.elektra.com.mx%2F%2C35%2C35%2C947%2C1920%2C947%2C1920%2C1080%2C1%2CP; s_ppv=https%253A%2F%2Fwww.elektra.com.mx%2F%2C34%2C34%2C947%2C1920%2C947%2C1920%2C1080%2C1%2CP; picreel_tracker__page_views=87; janus_sid=37acc8be-eefe-4122-8031-d30e9f54fd70; VtexRCRequestCounter=14;"
            }
        }).then((response) => {
    	resobj = {
        success: true,
        data: response.data
      }
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
    */
    axios.post(urlvtex,{
            headers: {
                Cookie: "__cfduid=d26bcafbb6ab280ac8f9e359080325b1f1538868824; checkout.vtex.com=__ofid=c6809365684d46eeb48d9d75f6db629b; janus_sid=7159e849-624d-4081-b64d-f5fafd475176; VtexRCSessionIdv7=0%3A87443500-c9c3-11e8-bf58-0d0a971345ff; VtexRCMacIdv7=87448320-c9c3-11e8-bf58-0d0a971345ff; _ga=GA1.3.880352982.1538870226; _gid=GA1.3.2003827285.1538870226; __gads=ID=88a0fee5cb12a80d:T=1538870226:S=ALNI_MZwL92ZduoG9letohQar8-HkYKmyA; VTEXSC=sc=1; ISSMB=ScreenMedia=0&UserAcceptMobile=False; SGTS=24125A99AD5042569ACF2FDAEA10352E; VtexFingerPrint=5692693af5a145ece569b3d95d81ce1f; scarab.visitor=%22C1F2EA4844BE94%22; cto_lwid=a40b8ad5-8d9b-4dc4-b7bd-f64a39639d37; elektra_mx=visit; __zlcmid=okhhGZeErstHb5; .ASPXAUTH=6CB660DA5EB45E146FE80A8D819B209CAE34DCAB79D0FDB3EB71B45504702DFA5ED23629617058BF812DCB043B33DDEE641D3C997CA5AF4D0BEAC65B70065D8F28687E6A53517A9E6D7B74763F68AB804A8095E0F34D3F16F1110EDB4B63E4F79D719CCE798D3137FD56A945D29810CBE127F756FE599E75F3171C90155693819CDAFDC119E6945EDA7805479036F1EE033F2A4573ED1B2F02BDAF7B827DE5D1AC23FF38; i18next=es; VtexRCRequestCounter=3; _gat_UA-3164251-1=1"
            }
        }).then((response) => {
    	resobj = {
        success: true,
        data: response.data
      }
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

  app.get('/test2', (req, res) => {
    let urlvtex = 'https://www.elektra.com.mx/no-cache/profileSystem/getProfile';
    urlvtex = 'https://www.elektra.com.mx/api/checkout/pub/orderForm';
    //urlvtex = 'https://www.elektra.com.mx/api/checkout/pub/orders/';
    urlvtex = 'https://www.elektra.com.mx/api/checkout/pub/orderForm/eb77e102cb134dea828665c949c238b3';
    let resobj;

    axios.get(urlvtex,{
      headers: {
          Cookie: ".ASPXAUTH=7A93541C3B78DA71D0004F22DCDCC0777189948B3519C2BA6BEE28B7AEA15493596B631F4CD152C08461AC271DA2A57F3A628EB6CADD1510E1B6FA77C0B893C78BFB6645B0F02F8D041982CF5B0D45B49415AC0DA223C8F6C7930E982FC6990E5C639E27A39AE47A973813E09A8771162187C0197E2AD546655F9D4DBDF19CCBF379FB4AA7C94A0278C678BEA4362434482540D8B00E72084B457DB90BC8C08F98855849;"
      }
  }).then((response) => {
    	resobj = {
        success: true,
        data: response.data
      }
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
      res.send(null);
      console.log('ERR', err)
    });
  });
}


//save userId no response
/* POST
https://www.elektra.com.mx/no-cache/account/profile/save
firstName: Alexander
lastName: Avila
nickName:
birthDate: 11/03/1985
gender: male
email: aavilal.0304@gmail.com
homePhone: (555) 826-2238
businessPhone:
isCorporate: False
userId: adb79c41-30e8-4069-a9bc-2f68f4e8a81e
document: XAXX010101000
VTEXRequestVerificationToken: c8f72e46fb1042c3b150c11e20467030
*/
//save address no response sin addresID es new date
/*
https://www.elektra.com.mx/no-cache/account/address/save
addressName: ca27ce0dc8724d56ae6a8bc6eea5f843
receiverName: ALEXANDER AVILA
addressType: 1
postalCode: 14000
street: Insurgentes Surs
number: 3579
complement:
reference: Torre 2 PB
neighborhood: Tlalpan Centro
city: TLALPAN
state: CIUDAD DE MÉXICO
country: MEX
userId: adb79c41-30e8-4069-a9bc-2f68f4e8a81e
addressId: ca27ce0dc8724d56ae6a8bc6eea5f843
*/

//https://www.elektra.com.mx/buscapagina?fq=C%3a%2f1371645%2f127833%2f&PS=12&sl=b0c7aabe-3a98-47b1-88cd-dca417633ccd&cc=4&sm=0&PageNumber=2
//GET
