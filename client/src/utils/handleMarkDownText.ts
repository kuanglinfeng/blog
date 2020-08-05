export default function (text: string) {
  text = text.replace(/\s+/ig," ");
  text = text.replace(/`+/ig, '')
  text = text.replace(/#+/ig, '')
  text = text.replace(/-/ig, ' ')
  text = text.replace(/\*+/ig, ' ')
  return text
}