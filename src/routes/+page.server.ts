import type { Actions } from "./$types";
import sheets, {sheetId} from "$lib/server/googleSheetClient";


export const actions: Actions = {
    register: async ({request}) => {


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


    }
};