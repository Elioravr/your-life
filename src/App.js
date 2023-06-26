import { useState, useMemo } from 'react';
import './App.scss';

const NUMBER_OF_YEARS = 95;

function App() {
  const [selectedDate, setSelectedDate] = useState('1992-03-10');

  console.log('selectedDate', selectedDate);

  const calculatedWeeks = useMemo(() => {
    const weeks = [];
    const startDate = new Date(selectedDate);
    const endDate = new Date(startDate.getTime());
    endDate.setFullYear(startDate.getFullYear() + NUMBER_OF_YEARS);

    const currentDate = new Date(startDate.getTime());
    let weekNumber = 1;
    let yearNumber = 1;

    while (currentDate <= endDate) {
      const firstDayOfWeek = new Date(currentDate.getTime());
      firstDayOfWeek.setDate(
        firstDayOfWeek.getDate() - firstDayOfWeek.getDay()
      );

      const hasPassed = currentDate < new Date();

      weeks.push({
        numberOfWeek: weekNumber,
        date: firstDayOfWeek,
        hasPassed,
        yearNumber,
      });

      currentDate.setDate(currentDate.getDate() + 7);
      weekNumber++;
      if (weekNumber > 52) {
        weekNumber = 1;
        yearNumber++;
      }
    }

    return weeks;
  }, [selectedDate]);

  console.log('calculatedWeeks', calculatedWeeks);

  return (
    <div className='App'>
      <div className='app-title'>Your Life</div>
      <div className='main-container'>
        <div className='form-container'>
          <input
            className='date-input'
            type='date'
            placeholder='Choose Birth Date'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        {selectedDate != null && (
          <div className='life-container'>
            <div className='years-container'>
              {calculatedWeeks.map((currentWeek, index) => {
                if (index % 52 === 0 && index % 5 === 0) {
                  return (
                    <div className={`year-text year-${index / 52}`}>
                      {index / 52}
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className='weeks-container'>
              {calculatedWeeks.map((currentWeek, index) => {
                const className = `week ${
                  currentWeek.hasPassed ? 'passed' : ''
                }`;
                return <div className={className}></div>;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
