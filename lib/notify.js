export function notify(message) {
  if (typeof window !== 'undefined' && window.alert) {
    window.alert(message);
  } else {
    console.log(message);
  }
}
