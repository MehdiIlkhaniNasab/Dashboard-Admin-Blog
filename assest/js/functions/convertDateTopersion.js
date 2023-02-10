const date = new Date()

const option = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

const arrayWordMonth = [
    { name: 'فروردین', value: '1' },
    { name: 'اردیبهشت', value: '2' },
    { name: 'خرداد', value: '3' },
    { name: 'تیر', value: '4' },
    { name: 'مرداد', value: '5' },
    { name: 'شهریور', value: '6' },
    { name: 'مهر', value: '7' },
    { name: 'آبان', value: '8' },
    { name: 'آذر', value: '9' },
    { name: 'دی', value: '10' },
    { name: 'بهمن', value: '11' },
    { name: 'اسفند', value: '12' },
]

let todayDate = date.toLocaleDateString('fa-IR', option)
let todayYear = todayDate.split(' ')[2]
let todayDay = todayDate.split(' ')[0]
let todayMonth = todayDate.split(' ')[1]

arrayWordMonth.forEach(item => {
    if (item.name == todayMonth) {
        todayMonth = item.value
    }
})

todayDate = {
    year: todayYear,
    month: todayMonth,
    day: todayDay
}


export { todayDate }