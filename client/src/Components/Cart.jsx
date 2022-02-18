import React, { useEffect } from 'react'

export default function (data) {
    // function createCheckoutButton(data) {
    //     // Initialize the checkout
    //     mercadopago.checkout({
    //         preference: {
    //             id: data
    //         },
    //         render: {
    //             container: '#button-checkout', // Class name where the payment button will be displayed
    //             label: 'Comprar', // Change the payment button text (optional)
    //         }
    //     });
    // }

    useEffect(() => {
        const script = document.createElement("script");
        const attr_data_preference = document.createAttribute('data-preference-id');
        console.log(data.data)
        attr_data_preference.value = data.data?.id;

        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.setAttributeNode(attr_data_preference)

        console.log(data.data)

        document.getElementById('form1')?.appendChild(script);
        return () => {
            document.getElementById('form1')?.removeChild(script);
        }
    }, [])
    return (
        <div>
            <form id="form1">
                <form id="form2">

                </form>
            </form>
        </div>
    )
}
