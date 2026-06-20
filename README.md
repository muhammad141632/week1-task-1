#  Student Performance Prediction

## Overview

This project was developed to predict a student's academic performance using machine learning techniques. The model analyzes factors such as study hours, attendance, assignment completion, previous academic records, and class participation to estimate a student's final performance.

The main goal of this project is to demonstrate the complete machine learning workflow, starting from data preprocessing and visualization to model training, evaluation, and deployment through a simple web interface.

---

## Features

* Student performance prediction based on academic factors
* Data cleaning and preprocessing
* Handling missing values and duplicate records
* Feature selection and visualization
* Training and comparison of multiple machine learning models
* Interactive user interface for predictions
* Performance categorization for easier interpretation

---

## Dataset Attributes

The model uses the following input features:

* Study Hours per Day
* Attendance Percentage
* Assignment Completion Percentage
* Previous Marks
* Class Participation

---

## Machine Learning Models Used

Two regression models were trained and evaluated:

1. Linear Regression
2. Decision Tree Regressor

The models were compared using standard evaluation metrics, and the best-performing model was selected for prediction.

---

## Model Evaluation Metrics

The following metrics were used to evaluate model performance:

* Mean Absolute Error (MAE)
* Mean Squared Error (MSE)
* R² Score

---

## Performance Categories

Predicted results are grouped into the following categories:

* Excellent
* Good
* Average
* Needs Improvement

These categories help users understand the prediction more easily than a numerical score alone.

---

## Technologies Used

* Python
* Pandas
* NumPy
* Scikit-Learn
* Matplotlib
* Streamlit
* HTML
* CSS
* JavaScript

---

## How to Run

1. Clone the repository

```bash
git clone <repository-link>
```

2. Install required packages

```bash
pip install -r requirements.txt
```

3. Run the application

```bash
streamlit run app.py
```

---

## Learning Outcomes

Through this project, I gained practical experience in:

* Data preprocessing and feature engineering
* Machine learning model development
* Model evaluation and comparison
* Data visualization
* Building user-friendly interfaces for machine learning applications
* Managing projects using Git and GitHub

---

## Author

Muhammad Ahmad

BS Computer Science Student | Machine Learning & AI Enthusiast
