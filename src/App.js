import { useState, useEffect } from 'react';
import LogWorkout from './components/LogWorkout';
import PersonalRecords from './components/PersonalRecords';
import History from './components/History';
import './App.css';

const TABS = ['Log Workout', 'Personal Records', 'History'];

function App() {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('gym-workouts');
    return saved ? JSON.parse(saved) : [];
  });

  const [personalRecords, setPersonalRecords] = useState(() => {
    const saved = localStorage.getItem('gym-prs');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeTab, setActiveTab] = useState('Log Workout');
  const [prAlert, setPrAlert] = useState(null);

  useEffect(() => {
    localStorage.setItem('gym-workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('gym-prs', JSON.stringify(personalRecords));
  }, [personalRecords]);

  const saveWorkout = (workout, newPR) => {
    setWorkouts(prev => [...prev, workout]);

    if (newPR) {
      setPersonalRecords(prev => ({
        ...prev,
        [newPR.exercise]: newPR.weight,
      }));
      setPrAlert(newPR.exercise);
      setTimeout(() => setPrAlert(null), 3000);
    }

    setActiveTab('History');
  };

  const deleteWorkout = (id) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  const totalWorkouts = workouts.length;
  const totalPRs = Object.keys(personalRecords).length;

  return (
    <div className="App">
      <header className="header">
        <div className="header-inner">
          <div className="header-title">
            <span>🏋️</span>
            <div>
              <h1>Gym Tracker</h1>
              <p className="header-sub">
                {totalWorkouts} sessions · {totalPRs} PRs set
              </p>
            </div>
          </div>
        </div>
      </header>

      {prAlert && (
        <div className="pr-alert">
          🏆 New PR on {prAlert}! Keep crushing it!
        </div>
      )}

      <nav className="tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="main">
        {activeTab === 'Log Workout' && (
          <LogWorkout onSave={saveWorkout} personalRecords={personalRecords} />
        )}
        {activeTab === 'Personal Records' && (
          <PersonalRecords personalRecords={personalRecords} workouts={workouts} />
        )}
        {activeTab === 'History' && (
          <History workouts={workouts} onDelete={deleteWorkout} />
        )}
      </main>
    </div>
  );
}

export default App;