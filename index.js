const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8082;
const host = `http://localhost:${PORT}`;

// Static assets
app.use('/assets', express.static(path.resolve(__dirname, './assets')));
app.use('/dist', express.static(path.resolve(__dirname, './dist')));

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started at ${host}`);
  
  // Only open browser in development
  if (process.env.NODE_ENV !== 'production') {
    try {
      const opn = require('opn');
      opn(host);
    } catch (e) {
      console.log('opn failed or not installed. Skipping browser launch.');
    }
  }
});
