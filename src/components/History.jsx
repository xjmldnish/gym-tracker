function History({ workouts, onDelete }) {
  if (workouts.length === 0) return (
    <div className="card">
      <h2>📅 Workout History</h2>
      <p className="empty">No workouts logged yet. Get to the gym! 💪</p>
    </div>
  );

  return (
    <div className="card">
      <h2>📅 Workout History</h2>
      <div className="history-list">
        {[...workouts].reverse().map(w => (
          <div key={w.id} className="history-item">
            <div className="history-left">
              <div className="history-exercise">
                {w.exercise}
                {w.isNewPR && <span className="pr-tag">🏆 PR</span>}
              </div>
              <div className="history-meta">
                {w.date} · {w.muscleGroup} · {w.sets.length} sets
              </div>
              <div className="history-sets">
                {w.sets.map((s, i) => (
                  <span key={i} className="set-tag">
                    {s.weight}kg × {s.reps}
                  </span>
                ))}
              </div>
              {w.notes && <div className="history-notes">💬 {w.notes}</div>}
            </div>
            <button className="delete-btn" onClick={() => onDelete(w.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;