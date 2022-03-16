const axios = require('axios');
const cheerio = require('cheerio');

export const get7520Rate = async () => {
    const { data } = await axios.get('https://www.irs.gov/businesses/small-businesses-self-employed/section-7520-interest-rates', {
        headers: {
            "Referrer": "https://robotrust.xyz",
            "content-type": "application/x-www-form-urlencoded"
        }
    });
    const chr = cheerio.load(data);
    let interestRate;
    chr('tbody').each((_id: number, element: any) => {
        const rateMonth = dateToMonthYear(new Date());
        element.children.forEach((item: any) => {
            let chooseMonth = false;
            item.children.forEach((it: any, ind: number) => {
                if(chr(it).contents() == rateMonth) {
                    chooseMonth = true;
                }
                if(chooseMonth) {
                    if(ind == 4) {
                        interestRate = +(chr(it).text());
                        console.log('Interest Rate: %s', +interestRate);
                        const exit = true;
                    }
                }
            });
        });
    });
    return interestRate;
};

const dateToMonthYear = (date: Date) => {
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