export async function modifyTone(text, { mood, lang }) {
  let modified = text;
  if(mood === 'bored') {
    modified = "😄 " + text + " 😄"; // simple funny effect
  } else if(mood === 'sad') {
    modified = "💪 " + text + " 💪"; // motivating effect
  }
  // Add more language-based or style modifications here
  return modified;
}