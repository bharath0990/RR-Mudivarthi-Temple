// Google Sheets API integration for saving ticket details
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

// Google Sheets configuration
const GOOGLE_SHEETS_CONFIG = {
  // These would be set in environment variables in production
  SPREADSHEET_ID: '1BvGQHm7AgYddaP0VUuNbulyiSuGdId0FMxCls3W-St8', // Example ID
  RANGE: 'Sheet1!A:L', // Columns A through L
  API_KEY: 'YOUR_GOOGLE_SHEETS_API_KEY', // Set in .env file
  CLIENT_EMAIL: 'your-service-account@project.iam.gserviceaccount.com',
  PRIVATE_KEY: 'YOUR_PRIVATE_KEY' // Set in .env file
};

// Mock function for demo - In production, this would use actual Google Sheets API
export const saveTicketToGoogleSheets = async (ticketData: TicketData): Promise<boolean> => {
  try {
    console.log('📊 Saving ticket to Google Sheets...', ticketData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, this would be the actual Google Sheets API call:
    /*
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_SHEETS_CONFIG.CLIENT_EMAIL,
        private_key: GOOGLE_SHEETS_CONFIG.PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    const values = [
      [
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
      ]
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      range: GOOGLE_SHEETS_CONFIG.RANGE,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
    */

    // Mock successful response
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
    const headers = [
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
    ];

    console.log('📋 Creating Google Sheets headers:', headers);
    
    // In production, this would create the headers in the first row
    /*
    const values = [headers];
    
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      range: 'Sheet1!A1:L1',
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
    */

    return true;
  } catch (error) {
    console.error('❌ Error creating headers:', error);
    return false;
  }
};

// Function to upload ticket image to cloud storage (mock implementation)
export const uploadTicketImage = async (imageBlob: Blob, bookingNumber: string): Promise<string> => {
  try {
    console.log('📸 Uploading ticket image for booking:', bookingNumber);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, this would upload to Google Drive, AWS S3, or similar
    /*
    const formData = new FormData();
    formData.append('file', imageBlob, `ticket-${bookingNumber}.png`);
    
    const response = await fetch('/api/upload-ticket-image', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    return result.imageUrl;
    */
    
    // Mock URL for demo
    const mockImageUrl = `https://storage.googleapis.com/temple-tickets/ticket-${bookingNumber}.png`;
    console.log('✅ Ticket image uploaded:', mockImageUrl);
    
    return mockImageUrl;
  } catch (error) {
    console.error('❌ Error uploading ticket image:', error);
    throw error;
  }
};