/**
 * Grade Predictor - Fixed Version
 */

function predictPerformance() {
    // Get input values
    const studyHours = parseFloat(document.getElementById('studyHours').value) || 0;
    const attendance = parseFloat(document.getElementById('attendance').value) || 0;
    const assignments = parseFloat(document.getElementById('assignments').value) || 0;
    const previousMarks = parseFloat(document.getElementById('previousMarks').value) || 0;

    // Validate - at least one value must be entered
    if (studyHours === 0 && attendance === 0 && assignments === 0 && previousMarks === 0) {
        showError('Please fill in at least one field');
        return;
    }

    // Calculate score with weights
    let score = (studyHours * 4.5) + (attendance * 0.30) + (assignments * 0.30) + (previousMarks * 0.50);
    score = Math.min(Math.round(score), 100);

    // Determine grade
    let grade, category;
    if (score >= 85) {
        grade = 'A';
        category = 'Outstanding';
    } else if (score >= 70) {
        grade = 'B';
        category = 'Great Job';
    } else if (score >= 55) {
        grade = 'C';
        category = 'Good';
    } else {
        grade = 'F';
        category = 'Keep Trying';
    }

    // Get status text
    let statusText = 'Needs Work';
    if (score >= 85) statusText = 'Excellent';
    else if (score >= 70) statusText = 'Good';
    else if (score >= 55) statusText = 'Fair';

    // Display results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="result-content">
            <p class="result-label" style="margin-bottom: 16px;">YOUR PREDICTION</p>

            <div style="margin-bottom: 20px;">
                <div class="grade-circle grade-${grade.toLowerCase()}" style="margin: 0 auto;">
                    ${grade}
                </div>
            </div>

            <p class="category-text" style="margin-bottom: 20px; font-size: 18px; font-weight: 500;">
                ${category}
            </p>

            <div style="display: flex; justify-content: center; gap: 30px; padding: 16px; background: rgba(139, 92, 246, 0.1); border-radius: 10px;">
                <div style="text-align: center;">
                    <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 6px;">Predicted Score</p>
                    <p style="font-size: 28px; font-weight: 700; color: #fff;">${score}%</p>
                </div>
                <div style="text-align: center;">
                    <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 6px;">Status</p>
                    <p style="font-size: 28px; font-weight: 700; color: #fff;">${statusText}</p>
                </div>
            </div>
        </div>
    `;
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="result-error">
            <p>⚠️ ${message}</p>
        </div>
    `;
}

// Allow pressing Enter to submit
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        predictPerformance();
    }
});