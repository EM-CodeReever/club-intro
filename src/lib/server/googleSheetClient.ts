import {google} from "googleapis"
import { GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from "$env/static/private";



const client = new google.auth.JWT(GOOGLE_CLIENT_EMAIL , undefined, GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'), ["https://www.googleapis.com/auth/spreadsheets"])


const sheets = google.sheets({version: "v4", auth: client})

export default sheets

export const sheetId = GOOGLE_SHEET_ID;