import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";

const App = () => {
  const [data, setData] = useState([]); // State to store the fetched data

  // Configure AWS DynamoDB
  useEffect(() => {
    const fetchData = async () => {
      AWS.config.update({
        region: "us-west-2", // Replace with your AWS region (e.g., "us-east-1")
        accessKeyId: "", // Replace with your Access Key ID
        secretAccessKey: "", // Replace with your Secret Access Key
      });

      const dynamoDB = new AWS.DynamoDB.DocumentClient();

      const params = {
        TableName: "UTopia-Events", // Replace with your DynamoDB table name
      };

      try {
        const data = await dynamoDB.scan(params).promise(); // Fetch data from DynamoDB
        console.log("Fetched data:", data.Items); // Log the fetched data to the console
        setData(data.Items); // Store data in the state
      } catch (error) {
        console.error("Error fetching data from DynamoDB:", error);
      }
    };

    fetchData();
  }, []); // Runs only once when the component mounts

  return (
    <div>
      <h1>DynamoDB Data</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {JSON.stringify(item)} {/* Render each item as JSON */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default App;
