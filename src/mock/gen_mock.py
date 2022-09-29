import json
from random import randint
from datetime import datetime


BASE_TIMESTAMP = 1_641_016_800

readings = []

# sessionIDnum
for s in range(2):
    # readingIDnum
    for k in range(4):
        # nodeID
        for p in range(2, 6):
            if p == 2 and k > 0:
                continue
            # canID
            for x in [1, 2, 3, 4]:
                dangerLevel = randint(0, 9)
                # sensorNumber
                for y in [1, 2]:
                    timedelta = s * 300 + k * 30 + p * 5 + x * 2 + y

                    sessionID = s * 300 + BASE_TIMESTAMP
                    readingID = s * 300 + k * 30 + BASE_TIMESTAMP

                    reading = {
                        "nodeID": p,
                        "canID": x,
                        "sensorNumber": y,
                        "readingID": readingID,
                        "sessionID": sessionID,
                        "dangerLevel": dangerLevel,
                        "window1": randint(0, 10_000_000),
                        "window2": randint(0, 10_000_000),
                        "window3": randint(0, 10_000_000),
                        "publishedAt": datetime.fromtimestamp(BASE_TIMESTAMP + timedelta).isoformat()
                    }

                    readings.append(reading)

print(json.dumps(readings))
