from flask import Flask, jsonify, request
from flask_cors import CORS
import boto3
from botocore.exceptions import ClientError
import json

app = Flask(__name__)
CORS(app)

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='us-west-2')  # Change region if needed
table = dynamodb.Table('your_table_name')  # Replace with your DynamoDB table name

@app.route('/markers', methods=['GET'])
def get_markers():
    search_term = request.args.get('search', '').lower()
    print("Search term received:", search_term)

    # Fetch data from DynamoDB
    try:
        # Scan the DynamoDB table (can be optimized with Query if needed)
        response = table.scan()  # Change to query if you want to filter based on a specific condition
        
        # Extract the items from the response
        items = response.get('Items', [])
        
        # If there's more data (pagination), you may need to handle it, but for now we'll just get one batch
        while 'LastEvaluatedKey' in response:
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            items.extend(response.get('Items', []))
        
        # Print to verify what was fetched from DynamoDB
        print("Data fetched from DynamoDB:", items)

        # Save the fetched data to a JSON file
        with open("fetched_data.json", "w") as json_file:
            json.dump(items, json_file, indent=4)
            print("Data saved to fetched_data.json")

        return jsonify(items)

    except ClientError as e:
        print(f"Error fetching data from DynamoDB: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
