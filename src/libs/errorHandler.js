export function errorHandler(func) {
  try {
    func();
  } catch (error) {
    console.error(error);
  }
}
