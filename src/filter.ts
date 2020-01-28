import { NumberWhereInput, StringWhereInput } from 'src/schema';

export function filterNumerics(num: number | null | undefined, filter: NumberWhereInput): boolean {
  const { equalTo, notEqualTo, lessThan, lessThanOrEqualTo, greaterThan, greaterThanOrEqualTo } = filter;

  if (equalTo !== undefined) {
    return num === equalTo;
  }
  if (notEqualTo !== undefined) {
    return num !== notEqualTo
  }

  if (num === undefined || num === null) return false;

  if (lessThan !== undefined && lessThan !== null) {
    return num < lessThan
  }
  if (lessThanOrEqualTo !== undefined && lessThanOrEqualTo !== null) {
    return num <= lessThanOrEqualTo
  }
  if (greaterThan !== undefined && greaterThan !== null) {
    return num > greaterThan
  }
  if (greaterThanOrEqualTo !== undefined && greaterThanOrEqualTo !== null) {
    return num >= greaterThanOrEqualTo
  }

  return true;
}

export function filterString(str: string | null | undefined, filter: StringWhereInput): boolean {
  const { equalTo, notEqualTo, exists, matchesRegex } = filter;

  if (equalTo !== undefined) {
    return str === equalTo;
  }
  if (notEqualTo !== undefined) {
    return str !== notEqualTo;
  }
  if (exists !== undefined) {
    return !!str;
  }
  if (str && matchesRegex !== undefined && matchesRegex !== null) {
    return new RegExp(matchesRegex).test(str);
  }

  return true;
}
