const MAIN_API_URL = 'mockUrl'
const DAYS_NAMES = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс',]
const mockData = {
  month: 'April',
  daysAmount: 31,
  firstDayName: 'пн',
  workers: [
    {
      id: 1,
      name: 'Петров И. А.',
      data: [...Array(31).fill('')]
    },
    {
      id: 2,
      name: 'Степанов Л. А.',
      data: [...Array(31).fill('')]
    },
    {
      id: 3,
      name: 'Семин М. С.',
      data: [...Array(31).fill('')]
    }
  ]
}

export {MAIN_API_URL, mockData, DAYS_NAMES }
