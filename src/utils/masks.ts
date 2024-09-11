export function cpfMask(value: string) {
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d)/, '$1.$2')

  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  return value
}

export function numericMask(value: string) {
  return value.replace(/\D/g, '')
}
