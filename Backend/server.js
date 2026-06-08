const app = require('./src/app');
const env = require('./src/config/env');
const cron = require('node-cron');
const bookingService = require('./src/services/booking.service');

const PORT = env.PORT || 5000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Set up cron job to check for overdue bookings every hour
cron.schedule('0 * * * *', async () => {
  try {
    console.log('Running overdue bookings check...');
    await bookingService.checkOverdue();
    console.log('Overdue bookings check completed');
  } catch (error) {
    console.error('Error during overdue bookings check:', error);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});