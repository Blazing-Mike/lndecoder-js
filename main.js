import "./style.scss";

const maxSendable = document.querySelector(".max-sendable");
const decodeBtn = document.querySelector(".decode-button");
const lnInputField = document.querySelector(".ln-input");
const lnOutput = document.querySelector(".ln-output");
const status = document.querySelector(".status");
const message = document.querySelector(".message");
const callback =  document.querySelector(".callback");
const tag =  document.querySelector(".tag");
const description = document.querySelector(".description");
const minSendable = document.querySelector(".min-sendable");
const chain =document.querySelector(".chain");
const payeePubkey = document.querySelector(".payee-pubkey");
const invoice = document.querySelector(".invoice");
const transactionSig = document.querySelector(".tx-sig");
const paymenthash = document.querySelector(".payment-hash");
const expiryTime =document.querySelector(".expiry-time");
const amount = document.querySelector(".amount");
const timeCreated = document.querySelector(".created-time");
const cltv_delta = document.querySelector(".cltv-delta");
const destination = document.querySelector(".destination");
const identifier = document.querySelector(".id");


const API_KEY = import.meta.env.VITE_SECRET_KEY;
//mikeoxygen@bitrefill.me
decodeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  lnOutput.style.display = "flex";
  const lnInput = lnInputField.value.trim();

  var baseUrl = "https://sandboxapi.bitnob.co/api/v1/";

  const thenRes = (apiUrl, options) => {
    const body = httpClient(options);
    fetch(apiUrl, body)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);  
        status.innerHTML = 'status : ' + response.status
        message.innerHTML = 'message : ' + response.message
        description.innerHTML = 'description : ' + response.data.description
   
        if(lnInput.includes('@')) {
          callback.innerHTML = 'callback: ' + response.data.callback
          tag.innerHTML = 'tag: ' + response.data.tag
          minSendable.innerHTML = 'min sendable: ' + response.data.satMinSendable
          maxSendable.innerHTML = 'max sendable: ' + response.data.satMaxSendable  
        } else if(lnInput.includes("lntb" )) {
          chain.innerHTML = 'chain: ' + 'testnet BTC'
          payeePubkey.innerHTML = 'payee pubkey: ' + response.data.payeePubkey
          invoice.innerHTML = 'invoice: ' + response.data.invoice
          paymenthash.innerHTML = 'payment hash: ' + response.data.payment
          cltv_delta.innerHTML = 'cltv_delta: ' + response.data.cltv_delta
          timeCreated.innerHTML = 'created_at: ' + response.data.created_at
          destination.innerHTML = 'destination: ' + response.data.destination
          amount.innerHTML = 'amount: ' + response.data.mtokens
          expiryTime.innerHTML = 'expiring_at: ' + response.data.expires_at
          identifier.innerHTML = 'identifier: ' + response.data.id
          callback.innerHTML = 'callback: ' + 'none';
          tag.innerHTML = 'tag: ' + response.data.tag
          minSendable.innerHTML = 'min sendable: ' + response.data.satMinSendable
          maxSendable.innerHTML = 'max sendable: ' + response.data.satMaxSendable
        } else if (lnInput.includes('lnurl')){
          identifier.innerHTML = 'identifier: ' + response.data.identifier
          callback.innerHTML = 'callback: ' + response.data.callback
          tag.innerHTML = 'tag: ' + response.data.tag
          minSendable.innerHTML = 'min sendable: ' + response.data.satMinSendable
          maxSendable.innerHTML = 'max sendable: ' + response.data.satMaxSendable

        }
      })
      .catch((err) => console.error(err));
    //lnOutput.innerHTML = "Please check if your input is validd";
  };

  if (lnInput.includes("@")) {
    const body = JSON.stringify({
      lnAddress: lnInput,
    });
    thenRes(baseUrl + "lnurl/decodelnaddress", body);
  } else if (lnInput.includes("lnurl")) {
    const body = JSON.stringify({
      encodedLnUrl: lnInput,
    });
    thenRes(baseUrl + "lnurl/decodelnurl", body);
  } else if (lnInput.includes("lntb" || lnInput.value.length > 50)) {
    {
      const body = JSON.stringify({
        request: lnInput,
      });
      thenRes(baseUrl + "wallets/ln/decodepaymentrequest", body);
    }
  }  else if (lnInput === ""|| lnInput.length ==  0) {

    {
      lnOutput.innerHTML = "Please fill in your input field";
    } 
  } else {
    lnOutput.innerHTML = "Please check if your input is valid";
  }
});

const httpClient = (body) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    body: body,
  };
};


