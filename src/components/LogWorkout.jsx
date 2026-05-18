import { useState } from 'react';
import exercises from '../data/exercises';

function LogWorkout({ onSave, personalRecords }) {
  const [muscleGroup, setMuscleGroup] = useState('Chest');
  const [exercise, setExercise] = useState(exercises['Chest'][0]);
  const [sets, setSets] = useState([{ reps: '', weight: '' }]);
  const [notes, setNotes] = useState('');

  const handleMuscleChange = (e) => {
    setMuscleGroup(e.target.value);
    setExercise(exercises[e.target.value][0]);
  };

  const addSet = () => {
    setSets([...sets, { reps: '', weight: '' }]);
  };

  const removeSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  const updateSet = (index, field, value) => {
    const updated = [...sets];
    updated[index][field] = value;
    setSets(updated);
  };

  const handleSave = () => {
    const validSets = sets.filter(s => s.reps && s.weight);
    if (validSets.length === 0) return;

    const maxWeight = Math.max(...validSets.map(s => parseFloat(s.weight)));
    const currentPR = personalRecords[exercise] || 0;
    const isNewPR = maxWeight > currentPR;

    const workout = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-MY'),
      muscleGroup,
      exercise,
      sets: validSets,
      notes,
      isNewPR,
      maxWeight,
    };

    onSave(workout, isNewPR ? { exercise, weight: maxWeight } : null);
    setSets([{ reps: '', weight: '' }]);
    setNotes('');
  };

  return (
    <div className="card">
      <h2>💪 Log Workout</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Muscle Group</label>
          <select value={muscleGroup} onChange={handleMuscleChange}>
            {Object.keys(exercises).map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Exercise</label>
          <select value={exercise} onChange={e => setExercise(e.target.value)}>
            {exercises[muscleGroup].map(ex => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>
        </div>
      </div>

      {personalRecords[exercise] && (
        <div className="pr-badge">
          🏆 Current PR: {personalRecords[exercise]}kg
        </div>
      )}

      <div className="sets-header">
        <label>Sets</label>
        <button className="btn-add-set" onClick={addSet}>+ Add Set</button>
      </div>

      <div className="sets-list">
        {sets.map((set, i) => (
          <div key={i} className="set-row">
            <span className="set-num">Set {i + 1}</span>
            <div className="set-inputs">
              <input
                type="number" placeholder="kg" min="0"
                value={set.weight}
                onChange={e => updateSet(i, 'weight', e.target.value)}
              />
              <span className="set-x">×</span>
              <input
                type="number" placeholder="reps" min="0"
                value={set.reps}
                onChange={e => updateSet(i, 'reps', e.target.value)}
              />
            </div>
            {sets.length > 1 && (
              <button className="btn-remove" onClick={() => removeSet(i)}>✕</button>
            )}
          </div>
        ))}
      </div>

      <div className="form-group" style={{ marginTop: '14px' }}>
        <label>Notes (optional)</label>
        <input
          type="text"
          placeholder="e.g. Felt strong today, close grip"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>

      <button className="btn-primary" onClick={handleSave}>
        💾 Save Workout
      </button>
    </div>
  );
}

export default LogWorkout;