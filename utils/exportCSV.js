// utils/exportCSV.js
const { createObjectCsvStringifier } = require('csv-writer');

const exportContactsToCSV = async (contacts) => {
    const csvStringifier = createObjectCsvStringifier({
        header: [
            { id: 'name', title: 'Name' },
            { id: 'numbers', title: 'Phone Numbers' },
            { id: 'image', title: 'Image' }
        ]
    });

    const records = contacts.map(contact => ({
        name: contact.name,
        numbers: contact.numbers.join(', '),
        image: contact.image
    }));

    return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
};

module.exports = { exportContactsToCSV };
