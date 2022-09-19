import json
from random import randint
from datetime import datetime


BASE_TIMESTAMP = 1_641_016_800

readings = []

# readingID
for k in range(4 * 2):
    # nodeID
    for p in range(6):
        # canID
        for x in [1, 2, 3, 4]:
            dangerLevel = randint(0, 9)
            # sensorNumber
            for y in [1, 2]:
                sessionID = k % 2
                timedelta = k * 100 + p * 5 + x * 2 + y

                reading = {
                    "nodeID": p,
                    "canID": x,
                    "sensorNumber": y,
                    "readingID": k,
                    "sessionID": sessionID,
                    "dangerLevel": dangerLevel,
                    "window1Count": randint(0, 10_000_000),
                    "window2Count": randint(0, 10_000_000),
                    "window3Count": randint(0, 10_000_000),
                    "publishedAt": datetime.fromtimestamp(BASE_TIMESTAMP + timedelta).isoformat()
                }

                readings.append(reading)

print(json.dumps(readings))
