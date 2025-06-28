import html2canvas from 'html2canvas';

// Function to generate ticket image from DOM element
export const generateTicketImage = async (ticketElement: HTMLElement): Promise<Blob> => {
  try {
    console.log('🎫 Generating ticket image...');
    
    // Configure html2canvas options for better quality
    const canvas = await html2canvas(ticketElement, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: ticketElement.offsetWidth,
      height: ticketElement.offsetHeight,
      scrollX: 0,
      scrollY: 0,
    });

    // Convert canvas to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          console.log('✅ Ticket image generated successfully');
          resolve(blob);
        } else {
          reject(new Error('Failed to generate ticket image'));
        }
      }, 'image/png', 0.95);
    });
  } catch (error) {
    console.error('❌ Error generating ticket image:', error);
    throw error;
  }
};

// Function to download ticket image
export const downloadTicketImage = (blob: Blob, bookingNumber: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `temple-ticket-${bookingNumber}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to create a printable ticket layout
export const createPrintableTicket = (booking: any): string => {
  const isVehicleBooking = booking.type === 'vehicle';
  const serviceData = isVehicleBooking ? booking.vehicleType : booking.darshanType;
  const count = isVehicleBooking ? booking.vehicleCount : booking.ticketCount;
  const userData = booking.userDetails || {};

  return `
    <div style="
      width: 400px;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      overflow: hidden;
      font-family: Arial, sans-serif;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    ">
      <!-- Header -->
      <div style="
        background: ${isVehicleBooking ? 'linear-gradient(135deg, #059669, #3b82f6)' : 'linear-gradient(135deg, #dc2626, #ea580c)'};
        color: white;
        padding: 20px;
        text-align: center;
      ">
        <div style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">
          🕉 Sri Maha Temple 🕉
        </div>
        <div style="font-size: 16px; opacity: 0.9;">
          ${isVehicleBooking ? 'Vehicle Pooja' : 'Darshan'} Entry Pass
        </div>
      </div>

      <!-- Content -->
      <div style="padding: 24px;">
        <!-- Booking ID -->
        <div style="
          text-align: center;
          background: ${isVehicleBooking ? '#f0fdf4' : '#fef2f2'};
          border: 2px solid ${isVehicleBooking ? '#bbf7d0' : '#fecaca'};
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
        ">
          <div style="font-size: 20px; font-weight: bold; color: ${isVehicleBooking ? '#059669' : '#dc2626'};">
            ${booking.bookingNumber}
          </div>
          <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">
            Booking Reference Number
          </div>
        </div>

        <!-- Details Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Customer Name</div>
            <div style="font-weight: 600; color: #374151;">${userData.name || 'Guest User'}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Phone</div>
            <div style="font-weight: 600; color: #374151;">${userData.phone || 'N/A'}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Date</div>
            <div style="font-weight: 600; color: #374151;">${new Date(booking.date).toLocaleDateString('en-IN')}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">${isVehicleBooking ? 'Vehicles' : 'Tickets'}</div>
            <div style="font-weight: 600; color: #374151;">${count}</div>
          </div>
        </div>

        <!-- Service Details -->
        <div style="
          border-top: 1px solid #e5e7eb;
          padding-top: 16px;
          margin-bottom: 20px;
        ">
          <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Service</div>
          <div style="font-weight: 600; color: #374151; margin-bottom: 8px;">${serviceData.name}</div>
          <div style="font-size: 14px; color: #6b7280;">${serviceData.description}</div>
        </div>

        <!-- Amount -->
        <div style="
          text-align: center;
          border-top: 1px solid #e5e7eb;
          padding-top: 16px;
          margin-bottom: 20px;
        ">
          <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Amount Paid</div>
          <div style="font-size: 24px; font-weight: bold; color: #059669;">₹${booking.totalAmount}</div>
        </div>

        <!-- Instructions -->
        <div style="
          background: #fef3c7;
          border: 1px solid #fbbf24;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 20px;
        ">
          <div style="font-size: 12px; font-weight: 600; color: #92400e; margin-bottom: 8px;">
            📋 Important Instructions:
          </div>
          <div style="font-size: 10px; color: #92400e; line-height: 1.4;">
            • Show this ticket at temple entrance<br>
            • Carry valid photo ID for verification<br>
            • ${isVehicleBooking ? 'Bring vehicle registration documents' : 'Arrive 15 minutes before visit'}<br>
            • Non-transferable and non-refundable
          </div>
        </div>

        <!-- Barcode -->
        <div style="text-align: center; border-top: 1px solid #e5e7eb; padding-top: 16px;">
          <div style="display: inline-block;">
            <div style="display: flex; gap: 1px; justify-content: center;">
              ${Array.from({length: 20}, () => 
                `<div style="width: 2px; height: ${Math.random() > 0.5 ? '24px' : '12px'}; background: #374151;"></div>`
              ).join('')}
            </div>
            <div style="font-size: 10px; color: #6b7280; margin-top: 8px; font-family: monospace;">
              ${booking.bookingNumber}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="
          text-align: center;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
          font-size: 10px;
          color: #6b7280;
        ">
          Generated on ${new Date().toLocaleString('en-IN')}<br>
          Sri Maha Temple • 123 Temple Street, Sacred City<br>
          Phone: +91 98765 43210
        </div>
      </div>
    </div>
  `;
};