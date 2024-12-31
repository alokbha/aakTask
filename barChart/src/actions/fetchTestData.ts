// src/actions/fetchTestData.ts
import { setTestData } from '../store/slices/testDataSlice';

export const fetchTestData = async (dispatch: any) => {
  try {
    const response = await fetch('https://django-dev.aakscience.com/candidate_test/fronted'); // Replace with actual endpoint
    const data = await response.json();

    // Check if the data structure matches the expected format
    const yearData = data[0]['2024'];
    
    if (!Array.isArray(yearData)) {
      throw new Error('Expected an array for the year data');
    }

    const parsedData = yearData.flatMap((monthData: any) => {
      // Iterate through each month's data
      return Object.entries(monthData).flatMap(([month, records]: [string, any[]]) => {
        if (Array.isArray(records)) {
          return records.map((record: any) => {
            const date = Object.keys(record)[0]; // Get the date key (e.g., '2024/01/01 , 00:00:00')
            const value = record[date];           // Get the associated value (e.g., 300)
            return { date, value };
          });
        } else {
          console.error('Expected records to be an array:', records);
          return []; // Return an empty array in case of unexpected data format
        }
      });
    });

    // Dispatch the parsed data to Redux store
    dispatch(setTestData(parsedData));
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
  }
};
