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



       const sheetRes =  await sheets.spreadsheets.values.append({
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

            const emailRes = await resend.emails.send({
                from:  'VTDICS <clubopenday@mbcole.com>',
                to: data.email as string,
                subject: 'Welcome to VTDI Computing Society!',
                html: `<h3>Hi ${data.name},</h3>` + 
                `<p>Here are the relevant links for the society: </p>` +
                `<p><a href="https://chat.whatsapp.com/H9xwnUVIBJL0iNH0jZAZ1a">Whatsapp</a> </p>` 


    
            })


    
        }catch(e){
            console.log(e);
        }
        
       

    }
};