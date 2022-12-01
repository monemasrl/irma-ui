import json
from datetime import datetime
from random import randint

BASE_TIMESTAMP = 1_641_016_800

readings = []
alerts = []

for nSession in range(2):
    for nReading in range(4):
        for nodeID in range(2, 6):
            if nodeID == 2 and nReading > 0:
                continue
            for canID in [1, 2, 3, 4]:
                sessionID = nSession * 300 + BASE_TIMESTAMP
                readingID = nSession * 300 + nReading * 30 + BASE_TIMESTAMP

                if nSession == 1 and (
                    (nodeID == 4 and nReading == 2 and canID == 3)
                    or (nodeID == 5 and nReading == 3 and canID == 4)
                ):
                    dangerLevel = 9
                    alerts.append(
                        {
                            "nodeID": nodeID,
                            "sessionID": sessionID,
                            "readingID": readingID,
                            "canID": canID,
                            "id": "1234" if len(alerts) == 0 else "5678",
                            "raisedAt": readingID + 10,
                        }
                    )
                else:
                    dangerLevel = randint(0, 9)

                for sensorNumber in [1, 2]:
                    timedelta = (
                        nSession * 300
                        + nReading * 30
                        + nodeID * 5
                        + canID * 2
                        + sensorNumber
                    )

                    reading = {
                        "nodeID": nodeID,
                        "canID": canID,
                        "sensorNumber": sensorNumber,
                        "readingID": readingID,
                        "sessionID": sessionID,
                        "dangerLevel": dangerLevel,
                        "window1": randint(0, 10_000_000),
                        "window2": randint(0, 10_000_000),
                        "window3": randint(0, 10_000_000),
                        "publishedAt": datetime.fromtimestamp(
                            BASE_TIMESTAMP + timedelta
                        ).isoformat(),
                    }

                    readings.append(reading)

print(json.dumps(readings))
print()
print(json.dumps(alerts))
