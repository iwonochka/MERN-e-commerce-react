import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";

const Payment = () => {
  console.log(process.env.REACT_APP_PAY_PAL_CLIENT_ID)

  return (
    <div>
      <PayPalScriptProvider options={{"client-id": process.env.REACT_APP_PAY_PAL_CLIENT_ID}}>
        <PayPalButtons style={{ color: 'black', shape: 'rect',  label: 'paypal', layout: 'vertical' }}

          createOrder={(data, actions) => {
            return actions.order
                .create({
                    purchase_units: [
                        {
                            amount: {
                                currency_code: "USD",
                                value: "2",
                            },
                        },
                    ],
                })
                .then((orderId) => {
                    // Your code here after create the order
                    return orderId;
                });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
            //Message for the user
        })
          }}
        />
      </PayPalScriptProvider>
    </div>


  )
}

export default Payment


