const hindiMonths = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
const hindiDays = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];

const indianFestivals = {
    '2024-01-26': { name: '🇮🇳 गणतंत्र दिवस', type: 'holiday' },
    '2024-03-08': { name: '🎨 होली', type: 'festival' },
    '2024-03-25': { name: '🙏 रामनवमी', type: 'festival' },
    '2024-04-11': { name: '🌙 ईद-उल-फित्र', type: 'festival' },
    '2024-04-21': { name: '🐏 ईद-उल-अधा', type: 'festival' },
    '2024-05-23': { name: '🙏 बुद्ध पूर्णिमा', type: 'festival' },
    '2024-08-15': { name: '🇮🇳 स्वतंत्रता दिवस', type: 'holiday' },
    '2024-08-26': { name: '🙏 जन्माष्टमी', type: 'festival' },
    '2024-10-02': { name: '🙏 गांधी जयंती', type: 'holiday' },
    '2024-10-12': { name: '🎊 दशहरा', type: 'festival' },
    '2024-10-31': { name: '💥 दिवाली', type: 'festival' },
    '2024-11-01': { name: '🎆 गोवर्धन पूजा', type: 'festival' },
    '2024-11-15': { name: '🎂 गुरु नानक जयंती', type: 'festival' },
    '2024-12-25': { name: '🎄 क्रिसमस', type: 'festival' },
    '2025-01-26': { name: '🇮🇳 गणतंत्र दिवस', type: 'holiday' },
    '2025-03-14': { name: '🎨 होली', type: 'festival' },
    '2025-08-15': { name: '🇮🇳 स्वतंत्रता दिवस', type: 'holiday' },
    '2025-10-02': { name: '🙏 गांधी जयंती', type: 'holiday' },
    '2025-10-20': { name: '💥 दिवाली', type: 'festival' }
};

let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthYearElement = document.getElementById('monthYear');
    monthYearElement.textContent = `${hindiMonths[month]} ${year}`;

    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    let date = 1;
    let row = document.createElement('tr');

    for (let i = firstDay - 1; i >= 0; i--) {
        const cell = document.createElement('td');
        cell.textContent = daysInPrevMonth - i;
        cell.classList.add('other-month');
        row.appendChild(cell);
    }

    for (let i = firstDay; i < 7 && date <= daysInMonth; i++) {
        const cell = createDateCell(date, year, month);
        row.appendChild(cell);
        date++;
    }

    calendarBody.appendChild(row);

    while (date <= daysInMonth) {
        row = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            if (date <= daysInMonth) {
                const cell = createDateCell(date, year, month);
                row.appendChild(cell);
                date++;
            } else {
                const cell = document.createElement('td');
                cell.textContent = date - daysInMonth;
                cell.classList.add('other-month');
                row.appendChild(cell);
                date++;
            }
        }
        calendarBody.appendChild(row);
    }
}

function createDateCell(day, year, month) {
    const cell = document.createElement('td');
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const today = new Date();
    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    cell.innerHTML = `<span class="day-number">${day}</span>`;

    if (isToday) {
        cell.classList.add('today');
    }

    if (indianFestivals[dateStr]) {
        const festival = indianFestivals[dateStr];
        cell.classList.add(festival.type);
    }

    return cell;
}

function updateTodayInfo() {
    const today = new Date();
    const dayName = hindiDays[today.getDay()];
    const date = today.getDate();
    const month = hindiMonths[today.getMonth()];
    const year = today.getFullYear();
    const shakYear = year - 78;

    const todayInfo = document.getElementById('todayInfo');
    todayInfo.innerHTML = `
        <strong>आज:</strong> ${dayName}, ${date} ${month} ${year} | <strong>शक संवत:</strong> ${shakYear}
    `;
}

function updateFestivalsList() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const festivalsList = document.getElementById('festivalsList');
    festivalsList.innerHTML = '';

    const monthFestivals = [];
    for (const [date, festival] of Object.entries(indianFestivals)) {
        const [fYear, fMonth, fDay] = date.split('-').map(Number);
        if (fYear === year && fMonth === month + 1) {
            monthFestivals.push({ date: fDay, ...festival });
        }
    }

    if (monthFestivals.length === 0) {
        festivalsList.innerHTML = '<li style="text-align: center; color: #999;">इस महीने कोई त्योहार नहीं</li>';
    } else {
        monthFestivals.sort((a, b) => a.date - b.date);
        monthFestivals.forEach(festival => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="festival-date">${festival.date}:</span> ${festival.name}`;
            festivalsList.appendChild(li);
        });
    }
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    updateFestivalsList();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    updateFestivalsList();
});

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    updateTodayInfo();
    updateFestivalsList();
});