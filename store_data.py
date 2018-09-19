import requests
import pandas as pd
import json

aSX_DF = pd.read_csv('../ASXListedCompanies.csv')

url = 'http://localhost:4000/companies/create'
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    
for index, row in aSX_DF.iterrows():
    data = row.to_json(orient='index')

    print data

    r = requests.post(url, json=json.loads(data))

    print r.status_code


