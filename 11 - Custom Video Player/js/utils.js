function padLeft(string, pad, length) {
  if (string.length >= length) {
    return string;
  }
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

export function formatSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds - minutes * 60);
  return `${padLeft(minutes, '0', 2)}:${padLeft(remainingSeconds, '0', 2)}`;
}
