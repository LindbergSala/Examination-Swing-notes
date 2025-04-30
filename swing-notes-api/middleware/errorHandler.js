module.exports = (err, req, res, next) => {
  console.log("🔴 CAUGHT ERROR:", err);

  if (err.stack) {
    console.error(err.stack);
  } else {
    console.error(err);
  }

  const status = err.status || 500;
  const message =
    typeof err === 'object' && err.message
      ? err.message
      : String(err);

  res.setHeader('Content-Type', 'application/json');
  res.status(status).json({ error: message });
};
