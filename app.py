import streamlit as st
import joblib
import numpy as np

# Load model
model = joblib.load("student_model.pkl")

# ---------------- PAGE CONFIG ----------------
st.set_page_config(
    page_title="Student Performance AI",
    page_icon="🎓",
    layout="centered"
)

# ---------------- CUSTOM CSS ----------------
st.markdown("""
<style>
.main {
    background-color: #0f172a;
}

.title {
    font-size: 40px;
    font-weight: bold;
    color: #38bdf8;
    text-align: center;
}

.subtitle {
    text-align: center;
    color: #94a3b8;
    margin-bottom: 30px;
}

.card {
    background: #1e293b;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 4px 20px rgba(0,0,0,0.3);
    margin-bottom: 20px;
}

.result {
    font-size: 28px;
    font-weight: bold;
    color: #22c55e;
    text-align: center;
}
</style>
""", unsafe_allow_html=True)

# ---------------- HEADER ----------------
st.markdown("<div class='title'>🎓 Student Performance AI</div>", unsafe_allow_html=True)
st.markdown("<div class='subtitle'>Predict final exam score using Machine Learning</div>", unsafe_allow_html=True)

# ---------------- INPUT CARD ----------------
st.markdown("<div class='card'>", unsafe_allow_html=True)

st.subheader("📌 Enter Student Details")

col1, col2 = st.columns(2)

with col1:
    study_hours = st.slider("Study Hours / Day", 0.0, 12.0, 5.0)
    attendance = st.slider("Attendance %", 0.0, 100.0, 75.0)
    assignments = st.slider("Assignments Completed %", 0.0, 100.0, 70.0)

with col2:
    previous_marks = st.slider("Previous Semester Marks", 0.0, 100.0, 60.0)
    class_participation = st.slider("Class Participation (1-10)", 1, 10, 5)

st.markdown("</div>", unsafe_allow_html=True)

# ---------------- PREDICT BUTTON ----------------
if st.button("🚀 Predict Final Score"):

    input_data = np.array([[study_hours, attendance, assignments,
                            previous_marks, class_participation]])

    prediction = model.predict(input_data)[0]

    # Grade logic
    if prediction >= 80:
        grade = "A 🟢"
    elif prediction >= 70:
        grade = "B 🔵"
    elif prediction >= 60:
        grade = "C 🟡"
    else:
        grade = "F 🔴"

    # ---------------- RESULT CARD ----------------
    st.markdown("<div class='card'>", unsafe_allow_html=True)

    st.markdown(f"<div class='result'>🎯 Predicted Score: {prediction:.2f}</div>",
                unsafe_allow_html=True)

    st.markdown(f"<h3 style='text-align:center;color:#fbbf24;'>Grade: {grade}</h3>",
                unsafe_allow_html=True)

    st.markdown("</div>", unsafe_allow_html=True)

# ---------------- FOOTER ----------------
st.markdown("""
---
<p style='text-align:center;color:gray'>
Built with ❤️ using Streamlit + Machine Learning
</p>
""", unsafe_allow_html=True)