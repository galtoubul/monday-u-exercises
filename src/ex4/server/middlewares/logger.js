async function logger(req, res, next) {
  console.log(`The user accessed: ${req.url}`);
  next();
}

export { logger };
