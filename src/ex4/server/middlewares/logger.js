async function logger(req, res) {
  console.log(`The user accessed: ${req.url}`);
}

export { logger };
