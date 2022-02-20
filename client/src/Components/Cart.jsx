import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

export default function ({ data }) {
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

    // let [loading, setLoading] = React.useState(true);

    console.log("aca", data);
    let datita = data.data;
    useEffect(() => {
        // setTimeout(function () {
        // setLoading(false)
        const script = document.createElement("script");
        const attr_data_preference = document.createAttribute('data-preference-id');
        console.log(data.data)
        attr_data_preference.value = datita;

        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.setAttributeNode(attr_data_preference)

        document.getElementById("form1")?.appendChild(script);
        return () => {
            document.getElementById("form1")?.removeChild(script);
        };
        // }, 2000);
    }, [datita]);
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: "1rem" }}>
            <form id="form1">
                <form id="form2"></form>
            </form>
        </Box>
    );
}