import { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  studentData,
  calculateStats,
  getAttendanceDistribution,
  getMarksDistribution,
  getGradeDistribution,
  getCorrelationData,
  trainModel,
  predictScore
} from './data/studentData';
import './App.css';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

function App() {
  const stats = useMemo(() => calculateStats(studentData), []);
  const attendanceDist = useMemo(() => getAttendanceDistribution(studentData), []);
  const marksDist = useMemo(() => getMarksDistribution(studentData), []);
  const gradeDist = useMemo(() => getGradeDistribution(studentData), []);
  const correlationData = useMemo(() => getCorrelationData(studentData), []);

  // Prediction state
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    studyHours: 5,
    attendance: 75,
    assignments: 70,
    previousMarks: 65,
    classParticipation: 5
  });

  const handlePredict = (e) => {
    e.preventDefault();
    const result = predictScore(formData);
    setPrediction(result);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value)
    });
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📊 Student Performance Dashboard</h1>
        <p>Academic Analytics & Insights</p>
      </header>

      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>Total Records</h3>
            <p className="stat-value">{stats.totalRecords}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>Average Marks</h3>
            <p className="stat-value">{stats.avgMarks}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Average Attendance</h3>
            <p className="stat-value">{stats.avgAttendance}%</p>
          </div>
        </div>
      </section>

      {/* 🎯 Prediction Section */}
      <section className="prediction-section">
        <div className="chart-card prediction-card">
          <h2>🎯 Predict Your Score</h2>
          <p className="prediction-subtitle">Enter your academic details to predict your final score</p>

          <form className="prediction-form" onSubmit={handlePredict}>
            <div className="form-grid">
              <div className="form-group">
                <label>📖 Study Hours/Day</label>
                <input
                  type="number"
                  name="studyHours"
                  value={formData.studyHours}
                  onChange={handleChange}
                  min="0"
                  max="12"
                  step="0.1"
                />
                <span className="range-label">0 - 12 hours</span>
              </div>

              <div className="form-group">
                <label>✅ Attendance %</label>
                <input
                  type="number"
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
                <span className="range-label">0 - 100%</span>
              </div>

              <div className="form-group">
                <label>📝 Assignments Completed %</label>
                <input
                  type="number"
                  name="assignments"
                  value={formData.assignments}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
                <span className="range-label">0 - 100%</span>
              </div>

              <div className="form-group">
                <label>📚 Previous Semester Marks</label>
                <input
                  type="number"
                  name="previousMarks"
                  value={formData.previousMarks}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
                <span className="range-label">0 - 100%</span>
              </div>

              <div className="form-group">
                <label>🙋 Class Participation (1-10)</label>
                <input
                  type="number"
                  name="classParticipation"
                  value={formData.classParticipation}
                  onChange={handleChange}
                  min="1"
                  max="10"
                />
                <span className="range-label">1 - 10</span>
              </div>
            </div>

            <button type="submit" className="predict-btn">
              🔮 Predict My Score
            </button>
          </form>

          {prediction && (
            <div className="prediction-result">
              <div className="result-main">
                <span className="result-label">Predicted Score</span>
                <span className="result-value">{prediction.score}</span>
              </div>
              <div className={`result-grade ${prediction.grade.toLowerCase()}`}>
                <span className="grade-label">Predicted Grade</span>
                <span className="grade-value">{prediction.grade}</span>
              </div>
              <p className="result-tip">{prediction.tip}</p>
            </div>
          )}
        </div>
      </section>

      <section className="charts-section">
        <div className="chart-card">
          <h2>Attendance Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceDist}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="range" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Marks Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={marksDist}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="range" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Performance Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeDist}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
                nameKey="grade"
                label={({ grade, count }) => `${grade}: ${count}`}
              >
                {gradeDist.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card heatmap-card">
          <h2>Feature Correlation Heatmap</h2>
          <div className="heatmap">
            {correlationData.length > 0 && (
              <div className="heatmap-grid">
                <div className="heatmap-row heatmap-header">
                  <div className="heatmap-cell"></div>
                  {['Study Hours', 'Attendance', 'Assignments', 'Previous Marks', 'Class Particip.', 'Final Score'].map(label => (
                    <div key={label} className="heatmap-cell header-cell">{label}</div>
                  ))}
                </div>
                {['Study Hours', 'Attendance', 'Assignments', 'Previous Marks', 'Class Particip.', 'Final Score'].map((rowLabel, rowIndex) => (
                  <div key={rowLabel} className="heatmap-row">
                    <div className="heatmap-cell row-header">{rowLabel}</div>
                    {['Study Hours', 'Attendance', 'Assignments', 'Previous Marks', 'Class Particip.', 'Final Score'].map((colLabel, colIndex) => {
                      const cellData = correlationData.find(c => c.x === colLabel && c.y === rowLabel);
                      const value = cellData ? parseFloat(cellData.value) : 0;
                      const color = getHeatmapColor(value);
                      return (
                        <div key={colLabel} className="heatmap-cell" style={{ backgroundColor: color }}>
                          {value}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="heatmap-legend">
            <span>-1.0</span>
            <div className="legend-gradient"></div>
            <span>+1.0</span>
          </div>
        </div>
      </section>
    </div>
  );
}

const getHeatmapColor = (value) => {
  const absValue = Math.abs(value);
  if (value > 0) {
    const intensity = Math.min(absValue, 1);
    return `rgba(16, 185, 129, ${intensity})`;
  } else if (value < 0) {
    const intensity = Math.min(absValue, 1);
    return `rgba(239, 68, 68, ${intensity})`;
  }
  return 'rgba(107, 114, 128, 0.3)';
};

export default App;