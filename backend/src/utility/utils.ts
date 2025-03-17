export default class Utils {
  static isValidMySQLDate(dateString: string): boolean {
    // Check format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;

    // Check if it's a real date
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && date.toISOString().startsWith(dateString);
  }
}
