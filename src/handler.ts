export function handleEnumValidation(value: any, allowedValues: object, propertyName: string) {
  if (Object.values(allowedValues).indexOf(value) === -1) {
    throw Error(`${propertyName} ${value} not allowed. Use one of ${Object.values(allowedValues).join(' | ')}`);
  }
}
