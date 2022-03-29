const { User } = require('../models');

const userData = [
  {
    username: 'laszlo-ratesic',
    email: 'keenanrc@hotmail.com',
    password: '123456',
  },
  {
    username: 'bmarfell0',
    email: 'zmcilhagga0@yandex.ru',
    password: 'eVL3u4mD',
  },
  {
    username: 'mmercey1',
    email: 'norum1@omniture.com',
    password: 'KsKWthAAyZ',
  },
  {
    username: 'kurwin2',
    email: 'eszymanowicz2@tmall.com',
    password: 'p4Rc54nC',
  },
  {
    username: 'dduddle3',
    email: 'fhotson3@domainmarket.com',
    password: 'b9dfC2EGJ8Mc',
  },
  {
    username: 'fprivost4',
    email: 'sledbury4@bloomberg.com',
    password: '3cSYwOD2QWyf',
  },
  {
    username: 'hblann5',
    email: 'obraywood5@wikispaces.com',
    password: 'WtwqPor',
  },
  {
    username: 'pgreyes6',
    email: 'cglozman6@nytimes.com',
    password: 'WNZLU10y9I',
  },
  {
    username: 'cfoale7',
    email: 'wcreek7@bloglovin.com',
    password: 'PMq6z62W',
  },
  {
    username: 'sreichert8',
    email: 'mbraisted8@unc.edu',
    password: 'L3YRescPAac',
  },
  {
    username: 'fpow9',
    email: 'kklulik9@jiathis.com',
    password: 'EKkXaJ',
  },
  {
    username: 'ckillocka',
    email: 'cdentona@ning.com',
    password: 'OIkuHp2',
  },
  {
    username: 'dmaragesb',
    email: 'ajerdonb@com.com',
    password: 'RXcmjI',
  },
  {
    username: 'rlomisc',
    email: 'rwissbeyc@soup.io',
    password: '6TyWP4',
  },
  {
    username: 'mwannopd',
    email: 'emeagherd@ow.ly',
    password: 'hZgaAvRCOXsa',
  },
  {
    username: 'dantrame',
    email: 'swonfore@hostgator.com',
    password: 'Kzmh1Y',
  },
  {
    username: 'ccastletinef',
    email: 'ewerlockf@cbslocal.com',
    password: '9jYQbE6W',
  },
  {
    username: 'anewnsg',
    email: 'vwallickerg@issuu.com',
    password: 'J8SokAEd',
  },
  {
    username: 'mstivanih',
    email: 'aormesherh@ebay.com',
    password: '6JhjO0EE8',
  },
  {
    username: 'agoomesi',
    email: 'agosswelli@telegraph.co.uk',
    password: 'QTG6F5G',
  },
  {
    username: 'ddaversj',
    email: 'rhornigj@vkontakte.ru',
    password: 'dIfbirvk9rn',
  },
  {
    username: 'ccourtesek',
    email: 'hschutterk@bbc.co.uk',
    password: 'QIgT7i1h',
  },
  {
    username: 'mwannesl',
    email: 'ddiessl@washingtonpost.com',
    password: '4mkBma7qfGi',
  },
  {
    username: 'cmaevelam',
    email: 'cgutchm@smugmug.com',
    password: 'q0L9KZg',
  },
  {
    username: 'sburnyaten',
    email: 'degern@sakura.ne.jp',
    password: 'k8BGgFgV',
  },
  {
    username: 'kdominoo',
    email: 'tdackeo@telegraph.co.uk',
    password: 'nTMZH7421l',
  },
  {
    username: 'rbeddiep',
    email: 'kgommeyp@nydailynews.com',
    password: 'u7zgg3DmQ',
  },
  {
    username: 'tsillettq',
    email: 'codwyerq@mapquest.com',
    password: 'bsmvGHZ6SBH',
  },
  {
    username: 'sniaver',
    email: 'jraffonr@guardian.co.uk',
    password: '3cn4WE',
  },
  {
    username: 'lleverentzs',
    email: 'abirchs@reference.com',
    password: 'B1JsJziBMUqA',
  },
  {
    username: 'tbourthouloumet',
    email: 'gdrinant@irs.gov',
    password: 'GrGnTEAQbj7D',
  },
  {
    username: 'tquiddintonu',
    email: 'obynethu@blogger.com',
    password: 'ChIorGj2sHc',
  },
  {
    username: 'cbattabeev',
    email: 'lbirtwellv@webmd.com',
    password: 'eFWDnSsC',
  },
  {
    username: 'mfruinw',
    email: 'dbeedw@exblog.jp',
    password: 'rufj3iCkKu',
  },
  {
    username: 'areadshallx',
    email: 'wlealex@yellowbook.com',
    password: 'vvittMcF6lJo',
  },
  {
    username: 'tsmeuiny',
    email: 'rmickay@photobucket.com',
    password: '385MgQictbqr',
  },
  {
    username: 'cmephamz',
    email: 'slindlz@economist.com',
    password: 'VonsvmKVV',
  },
  {
    username: 'evogel10',
    email: 'bfidoe10@phpbb.com',
    password: 'tYDPVgF8b5',
  },
  {
    username: 'jericsson11',
    email: 'gepp11@dailymotion.com',
    password: 'fStE2q',
  },
  {
    username: 'kobey12',
    email: 'lmardee12@hatena.ne.jp',
    password: 'nLRcEG0',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
