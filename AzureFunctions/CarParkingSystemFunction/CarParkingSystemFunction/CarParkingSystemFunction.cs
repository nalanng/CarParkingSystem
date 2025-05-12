using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System.Text;
using System.Text.Json;

namespace CarParkingSystemFunction
{
    public class CarParkingSystemFunction
    {
        private readonly CarParkingSystemServices carParkingSystemServices;
        private readonly HttpClient _httpClient;

        public CarParkingSystemFunction(CarParkingSystemServices carParkingSystemServices, HttpClient httpClient)
        {
            this.carParkingSystemServices = carParkingSystemServices;
            _httpClient = httpClient;
        }

        [Function("GetAllTelemetries")]
        public async Task Run(
        [ServiceBusTrigger("distancequeue", Connection = "ServiceBusConnectionString")] string myQueueItem,
        ILogger log)
        {

            var telemetry = await carParkingSystemServices.UpdateCarParkingStatus(myQueueItem);

            var json = JsonSerializer.Serialize(telemetry);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("https://localhost:9001/api/v1/DistanceHub", content);
        }
    }
}