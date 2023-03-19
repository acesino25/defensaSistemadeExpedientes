export function insertSeparatorBeforeLastElement(str, separator, separatorBeforeLast) {
    const arr = str.split(separator);
    const lastIndex = arr.length - 1;
    const lastElement = arr[lastIndex];
    if (lastElement.endsWith(separatorBeforeLast)) {
      arr[lastIndex] = lastElement.slice(0, -separatorBeforeLast.length);
    }
    arr.splice(lastIndex, 0, separatorBeforeLast);
    const modifiedSeparator = separator.replace(/,\s*$/, '') + separatorBeforeLast.trim();
    return arr.join(modifiedSeparator);
  }