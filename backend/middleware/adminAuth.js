const verifyAdminPin = (req, res, next) => {
  const pin = req.headers['x-admin-pin'];
  const validPin = process.env.ADMIN_PIN;

  if (!validPin || !pin || String(pin) !== String(validPin)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid Owner PIN.'
    });
  }

  next();
};

module.exports = verifyAdminPin;