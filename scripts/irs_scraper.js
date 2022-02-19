const axios = require('axios');
const cheerio = require('cheerio');

const get7520Rate = async () => {
    const { data } = await axios.get('https://www.irs.gov/businesses/small-businesses-self-employed/section-7520-interest-rates');
    const chr = cheerio.load(data);
    let interestRate;
    chr('tbody').each((_id, element) => {
        const rateMonth = dateToMonthYear(new Date());
        element.children.forEach((item) => {
            let chooseMonth = false;
            item.children.forEach((it, ind) => {
                if(chr(it).contents() == rateMonth) {
                    chooseMonth = true;
                }
                if(chooseMonth) {
                    if(ind == 4) {
                        interestRate = +(chr(it).text());
                        console.log('Interest Rate: %s', +interestRate);
                        exit = true;
                    }
                }
            });
        });
    });
    return interestRate;
};

const dateToMonthYear = (date) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

      return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

module.exports = {
    get7520Rate: function () {return await get7520Rate()}
} 