const invalidRoute = (req, res, next) => {
  return res.status(404).json({
    error: "Invalid route",
    ip: String(req.ip),
    path: decodeURI(String(req.originalUrl)),
  });
}

module.exports = {
  invalidRoute,
};