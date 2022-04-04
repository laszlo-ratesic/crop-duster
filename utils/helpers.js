module.exports = {
  format_date: (date) =>
    `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`,

  format_plural: (obj, amount) =>
    amount !== 1 ? `${obj.toLowerCase()}s` : `${obj.toLowerCase()}`,

  format_url: (url) => {
    return url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split('/')[0]
      .split('?')[0];
  },
};
