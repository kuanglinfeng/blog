export default function formatTime(date: string | Date) {
  if (typeof date === 'string')
    return new Date(date).toLocaleDateString().replace('-', '/')
  else
    return date.toLocaleDateString().replace('-', '/')
}