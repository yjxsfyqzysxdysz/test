
import requests
import json
from tqdm import tqdm

data_id = {'id': '45bdd13e-82aa-11ea-a664-fa163e216734'}
url = 'http://114.116.94.253/sjjx/web/mslt/view'
href = 'http://114.116.94.253/dsideal_yy/sjjx/web/base/resourceInfo/view'
title = '%s.mp4' % json.loads(requests.post(url, data=data_id).text)[\"data\"][0][\"title\"]
resource_id = json.loads(requests.post(url, data=data_id).text)[\"data\"][0][\"resource_id\"]
mp4_url = json.loads(requests.post(href, data={'resourceIdInt': resource_id}).text)[\"list\"][\"pre_view_url\"].split('furl=')[1].replace('%3A', ':').replace('%2F', '/')
print(title)
print(mp4_url)
response = requests.get(mp4_url, stream=True)
with open(title, 'wb') as f:
         for i in tqdm(response.iter_content(chunk_size=1024)):
                f.write(i)
