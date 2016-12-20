export const format = (num) => {
    return (parseInt(num).toFixed(0) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

export default {
  format: format
}