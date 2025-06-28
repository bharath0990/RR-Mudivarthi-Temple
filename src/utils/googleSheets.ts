// ticketSheets.ts
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

export interface TicketData {
  bookingNumber: string;
  customerName: string;
  phone: string;
  email: string;
  serviceType: string;
  serviceName: string;
  date: string;
  count: number;
  amount: number;
  status: string;
  timestamp: string;
  ticketImageUrl?: string;
}

// Google Sheets API - Real configuration from environment variables
const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: process.env.SPREADSHEET_ID!,
  RANGE: 'Sheet1!A:L',
  CLIENT_EMAIL: process.env.CLIENT_EMAIL!,
  PRIVATE_KEY: process.env.PRIVATE_KEY!.replace(/\\n/g, '\n'),
};

// Function to save ticket data to Google Sheets
export const saveTicketToGoogleSheets = async (ticketData: TicketData): Promise<boolean> => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_SHEETS_CONFIG.CLIENT_EMAIL,
        private_key: GOOGLE_SHEETS_CONFIG.PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const values = [[
      ticketData.bookingNumber,
      ticketData.customerName,
      ticketData.phone,
      ticketData.email,
      ticketData.serviceType,
      ticketData.serviceName,
      ticketData.date,
      ticketData.count,
      ticketData.amount,
      ticketData.status,
      ticketData.timestamp,
      ticketData.ticketImageUrl || ''
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      range: GOOGLE_SHEETS_CONFIG.RANGE,
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    console.log('✅ Ticket saved to Google Sheets successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error saving to Google Sheets:', error);
    return false;
  }
};

// Function to prepare ticket data for Google Sheets
export const prepareTicketData = (booking: any): TicketData => {
  const isVehicleBooking = booking.type === 'vehicle';
  const serviceData = isVehicleBooking ? booking.vehicleType : booking.darshanType;
  const count = isVehicleBooking ? booking.vehicleCount : booking.ticketCount;
  const userData = booking.userDetails || {};

  return {
    bookingNumber: booking.bookingNumber,
    customerName: userData.name || 'Guest User',
    phone: userData.phone || '',
    email: userData.email || '',
    serviceType: isVehicleBooking ? 'Vehicle Pooja' : 'Darshan',
    serviceName: serviceData.name,
    date: new Date(booking.date).toLocaleDateString('en-IN'),
    count: count,
    amount: booking.totalAmount,
    status: 'Confirmed',
    timestamp: new Date().toISOString(),
  };
};

// Function to create Google Sheets headers (run once to set up the sheet)
export const createSheetsHeaders = async (): Promise<boolean> => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_SHEETS_CONFIG.CLIENT_EMAIL,
        private_key: GOOGLE_SHEETS_CONFIG.PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const headers = [[
      'Booking Number',
      'Customer Name',
      'Phone',
      'Email',
      'Service Type',
      'Service Name',
      'Date',
      'Count',
      'Amount (₹)',
      'Status',
      'Timestamp',
      'Ticket Image URL'
    ]];

    await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      requestBody: { values: headers },
    });

    console.log('✅ Headers created in Google Sheets successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error creating headers in Google Sheets:', error);
    return false;
  }
};