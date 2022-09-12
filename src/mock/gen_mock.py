from random import randint
from datetime import datetime


BASE_TIMESTAMP = 1_641_016_800

print("[")

# readingID
for k in range(4 * 2):
    # nodeID
    for p in range(6):
        # canID
        for x in [1, 2, 3, 4]:
            # sensorNumber
            for y in [1, 2]:
                sessionID = k % 2
                timedelta = k * 100 + p * 5 + x * 2 + y

                reading = {
                    "nodeID": p,
                    "canID": str(x),
                    "sensorNumber": str(y),
                    "readingID": k,
                    "sessionID": sessionID,
                    "dangerLevel": randint(0, 9),
                    "totalCount": randint(0, 10_000_000),
                    "publishedAt": datetime.fromtimestamp(BASE_TIMESTAMP + timedelta).isoformat()
                }

                print(str(reading) + ",")

print("],[")

# readingID
for k in range(4 * 2):
    # nodeID
    for p in range(6):
        # canID
        for x in [1, 2, 3, 4]:
            # sensorNumber
            for y in [1, 2]:
                for w in [1, 2, 3]:
                    sessionID = k % 2
                    timedelta = k * 100 + p * 5 + x * 2 + y

                    reading = {
                        "nodeID": p,
                        "canID": str(x),
                        "sensorNumber": str(y),
                        "readingID": k,
                        "sessionID": sessionID,
                        "windowNumber": w,
                        "count": randint(0, 10_000_000),
                        "publishedAt": datetime.fromtimestamp(BASE_TIMESTAMP + timedelta).isoformat()
                    }

                    print(str(reading) + ",")

print("]")