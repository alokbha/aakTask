// src/components/BarChart.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestData } from '../actions/fetchTestData';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const dispatch = useDispatch();
  const testData = useSelector((state: any) => state.testData.data);
  //dispatch the output
  useEffect(() => {
    dispatch(fetchTestData);
  }, [dispatch]);

  // Format the date and remove "00:00:00"
  const formattedData = testData.map((item: { date: string; value: number }) => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString(); // Formats the date to 'MM/DD/YYYY'
    return { date: formattedDate, value: item.value };
  });

  const chartData = {
    labels: formattedData.map((item) => item.date), // Use the formatted date
    datasets: [
      {
        label: 'Test Data',
        data: formattedData.map((item) => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    margin: 0,
    padding: '20px',
  };

  const chartWrapperStyle = {
    width: '100%',
    maxWidth: '1200px',
    height: '80vh',
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#333',
  };

  const loadingTextStyle = {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#777',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Candidate Task Overview</h2>
      {formattedData.length > 0 ? (
        <div style={chartWrapperStyle}>
          <Bar data={chartData} />
        </div>
      ) : (
        <p style={loadingTextStyle}>Loading data...</p>
      )}
    </div>
  );
};

export default BarChart;
