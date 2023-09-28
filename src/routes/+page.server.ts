import type { Actions } from "./$types";
import sheets, {sheetId} from "$lib/server/googleSheetClient";
import {RESEND_API_KEY} from "$env/static/private"
import { Resend } from "resend";


export const actions: Actions = {
    register: async ({request}) => {

        //add validation here
        
        const formData = await request.formData();

        const data = Object.fromEntries(formData.entries());

        const arrayFormattedData = Object.values(data);



        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: "Sheet1!A2:D2",
            insertDataOption: "INSERT_ROWS",
            valueInputOption: "RAW",
            requestBody: {
                values: [
                  //  [name, email, phone, area of interest]
                  arrayFormattedData
                ]
            }
        })


        try{
            const resend = new Resend(RESEND_API_KEY);

            await resend.emails.send({
                from:  'Acme <onboarding@resend.dev>',
                to: [data.email as string],
                subject: 'Welcome to VTDI Computing Society!',
                html: `<h1>Hi ${data.name},</h1> <p>Thank you for registering for the VTDI Computing Society. We will be in touch with you soon.</p> <p>Regards, <br/> VTDI Computing Society</p>` + 
                `<p> <a href="https://www.vtdi.org/computing-society">VTDI Computing Society</a> </p>`
    
            })
        }catch(e){
            console.log(e);
        }
        
       

    }
};