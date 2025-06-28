# Temple Ticket Booking Website

A modern, responsive temple booking system with Google Sheets integration for ticket management.

## Features

### 🎫 Booking System
- **Darshan Booking**: Traditional temple visits with multiple package options
- **Vehicle Pooja**: Sacred vehicle blessings for safe journeys
- **Real-time Availability**: Live slot management and booking confirmation
- **User Details Collection**: Name, phone, and optional email capture

### 📊 Google Sheets Integration
- **Automatic Data Backup**: All ticket details saved to Google Sheets
- **Ticket Image Storage**: Generated ticket images uploaded to cloud storage
- **Real-time Sync**: Instant data synchronization with spreadsheet
- **Comprehensive Records**: Complete booking history with customer details

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Optimized scroll and hover effects
- **Celebration Effects**: Sparkles and confetti on successful booking
- **Visual Feedback**: Loading states and progress indicators

### 🔧 Technical Features
- **React + TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **HTML2Canvas**: Ticket image generation
- **Google APIs**: Sheets and Drive integration
- **QR Code Generation**: Digital ticket verification

## Setup Instructions

### 1. Google Sheets Setup

1. **Create a Google Sheets document** with the following columns:
   ```
   A: Booking Number
   B: Customer Name
   C: Phone
   D: Email
   E: Service Type
   F: Service Name
   G: Date
   H: Count
   I: Amount (₹)
   J: Status
   K: Timestamp
   L: Ticket Image URL
   ```

2. **Enable Google Sheets API**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google Sheets API
   - Create service account credentials
   - Download the JSON key file

3. **Share your spreadsheet** with the service account email

### 2. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Google Sheets credentials:
   ```env
   VITE_GOOGLE_SHEETS_API_KEY=your_api_key
   VITE_GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
   VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   VITE_GOOGLE_PRIVATE_KEY=your_private_key
   ```

### 3. Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Google Sheets Integration Details

### Data Structure
Each booking creates a row with:
- **Booking Number**: Unique identifier (TKT/VPJ + timestamp)
- **Customer Details**: Name, phone, email
- **Service Information**: Type, name, date, count
- **Payment Details**: Amount and status
- **Metadata**: Timestamp and ticket image URL

### Ticket Image Generation
1. **HTML to Canvas**: Converts ticket DOM element to image
2. **Cloud Upload**: Stores image in Google Drive or cloud storage
3. **URL Storage**: Saves image URL in spreadsheet for easy access

### Real-time Updates
- Booking confirmation triggers immediate save
- Progress indicator shows save status
- Error handling with retry mechanism
- Offline support with queue system

## API Integration

### Google Sheets API
```typescript
// Save ticket data
const ticketData = {
  bookingNumber: 'TKT1703158234',
  customerName: 'John Doe',
  phone: '+91 98765 43210',
  email: 'john@example.com',
  serviceType: 'Darshan',
  serviceName: 'VIP Darshan',
  date: '2024-01-15',
  count: 2,
  amount: 400,
  status: 'Confirmed',
  timestamp: '2024-01-15T10:30:00Z',
  ticketImageUrl: 'https://storage.googleapis.com/tickets/ticket-123.png'
};

await saveTicketToGoogleSheets(ticketData);
```

### Ticket Image Generation
```typescript
// Generate and upload ticket image
const ticketElement = document.getElementById('ticket');
const imageBlob = await generateTicketImage(ticketElement);
const imageUrl = await uploadTicketImage(imageBlob, bookingNumber);
```

## Deployment

### Production Setup
1. **Environment Variables**: Set all required API keys
2. **CORS Configuration**: Allow your domain in Google Cloud Console
3. **SSL Certificate**: Ensure HTTPS for API calls
4. **CDN Setup**: Optimize image delivery

### Monitoring
- **Error Tracking**: Monitor API failures
- **Performance**: Track save operation times
- **Usage Analytics**: Monitor booking patterns

## Security Considerations

- **API Key Protection**: Never expose keys in client-side code
- **Service Account**: Use least-privilege access
- **Data Validation**: Sanitize all user inputs
- **Rate Limiting**: Implement API call limits
- **Backup Strategy**: Regular spreadsheet backups

## Support

For technical support or questions:
- 📧 Email: support@srimahatemple.org
- 📞 Phone: +91 98765 43210
- 🕐 Hours: 8:00 AM - 8:00 PM

## License

This project is licensed under the MIT License - see the LICENSE file for details.