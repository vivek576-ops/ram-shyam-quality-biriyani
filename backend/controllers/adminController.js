const verifyAdminPin = async (req, res, next) => {
  try {
    const { pin } = req.body;
    const validPin = process.env.ADMIN_PIN;

    if (!validPin || !pin || String(pin) !== String(validPin)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Owner PIN.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Owner PIN verified.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyAdminPin
};