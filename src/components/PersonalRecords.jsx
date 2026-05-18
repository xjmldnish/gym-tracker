import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';

function PersonalRecords({ personalRecords, workouts }) {
  const exercises = Object.keys(personalRecords);

  if (exercises.length === 0) return (
    <div className="card">
      <h2>🏆 Personal Records</h2>
      <p className="empty">No PRs yet. Start logging workouts!</p>
    </div>
  );

  const getProgressData = (exercise) => {
    return workouts
      .filter(w => w.exercise === exercise)
      .slice(-8)
      .map((w, i) => ({
        session: `S${i + 1}`,
        weight: w.maxWeight,
      }));
  };

  return (
    <div className="card">
      <h2>🏆 Personal Records</h2>
      <div className="pr-list">
        {exercises.map(ex => (
          <div key={ex} className="pr-item">
            <div className="pr-header">
              <span className="pr-exercise">{ex}</span>
              <span className="pr-weight">{personalRecords[ex]}kg</span>
            </div>
            {getProgressData(ex).length > 1 && (
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={getProgressData(ex)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="session" stroke="#888" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#888" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ background: '#1a1a2e', border: '1px solid #00c9a7' }}
                  />
                  <Line
                    type="monotone" dataKey="weight"
                    stroke="#00c9a7" strokeWidth={2}
                    dot={{ fill: '#00c9a7', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonalRecords;