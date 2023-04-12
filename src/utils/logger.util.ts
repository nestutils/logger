import stringify from 'safe-stable-stringify';

export class LoggerUtils {
  // Captures the number of format (i.e. %s strings) in a given string.
  private formatRegExp: RegExp = /\{\}/g;
  private stringifyFailedMessage = '{}';

  /**
   * This method is used to convert the array of data objects into a loggable object.
   * @param message Message that needs to be logged
   * @param data replacement arguments for message string
   * @returns printable message string
   */
  public getLoggableObject(message: any, data: any[] = []): string {
    if ('string' !== typeof message) {
      message = stringify(message) || this.stringifyFailedMessage;
    }

    if (!data || data.length == 0) {
      return message;
    }

    // Replace Each Template in the String one by one.
    let updatedMessage = message.replace(
      this.formatRegExp,
      (match: string): string => {
        const placeholder = data.shift();
        return this.convertToString(placeholder) || this.stringifyFailedMessage;
      },
    );

    // If there are remaining data arguments, append them to the end of the result string
    for (let i = 0; i < data.length; i++) {
      //console.log('Value coming is', this.convertToString(data[i]));
      updatedMessage +=
        ' ' + this.convertToString(data[i]) || this.stringifyFailedMessage;
    }

    return updatedMessage;
  }

  /**
   * Method will convert provided values into string efficiently.
   * @param value
   * @returns
   */
  private convertToString(value: any): string {
    // If Nothing, then return empty string.
    if (value === null) {
      return 'null';
    }

    if (value === undefined) {
      return 'undefined';
    }

    // If String, then return as-is
    if (typeof value === 'string') {
      return value;
    }

    return stringify(value) || this.stringifyFailedMessage;
  }
}
