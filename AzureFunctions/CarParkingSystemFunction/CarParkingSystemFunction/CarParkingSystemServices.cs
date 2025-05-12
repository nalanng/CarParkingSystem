using CarParkingSystem.Core.DTOs.Telemetry;
using CarParkingSystem.Infrastructure.Contexts;
using Newtonsoft.Json.Linq;

namespace CarParkingSystemFunction
{
    public class CarParkingSystemServices
    {

        public async Task<Telemetry> UpdateCarParkingStatus(string myQueueItem)
        {
            JObject messageJson = JObject.Parse(myQueueItem);

            float distance1 = messageJson["telemetry"]?["distance1"]?.Value<float>() ?? 0;
            float distance2 = messageJson["telemetry"]?["distance2"]?.Value<float>() ?? 0;
            float distance3 = messageJson["telemetry"]?["distance3"]?.Value<float>() ?? 0;

            var telemetry = new Telemetry
            {
                Distance1 = distance1,
                Distance2 = distance2,
                Distance3 = distance3,
            };

            return telemetry;
        }

    }

}
