
using CarParkingSystem.Core.DTOs.Requests;
using CarParkingSystem.Core.DTOs.Responses;
using CarParkingSystem.Core.Enums;
using CarParkingSystem.Core.Interfaces;
using CarParkingSystem.Core.Interfaces.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarParkingSystem.Infrastructure.Services
{
    public class DistanceHubService : IDistanceHubService
    {
        private readonly IParkAreaRepositoryAsync parkAreaRepositoryAsync;
        private readonly IParkRecordRepositoryAsync parkRecordRepositoryAsync;

        public DistanceHubService(IParkAreaRepositoryAsync parkAreaRepositoryAsync, IParkRecordRepositoryAsync parkRecordRepositoryAsync)
        {
            this.parkAreaRepositoryAsync = parkAreaRepositoryAsync;
            this.parkRecordRepositoryAsync = parkRecordRepositoryAsync;
        }

        public async Task<List<UpdateParkAreaStatusResponce>> UpdateParkAreaStatus(UpdateParkAreaStatusRequest distanceRequest)
        {
            var responses = new List<UpdateParkAreaStatusResponce>();

            var distances = new[] { distanceRequest.Distance1, distanceRequest.Distance2, distanceRequest.Distance3 };

            for (int i = 0; i < distances.Length; i++)
            {
                int locationId = i + 1;
                double distance = distances[i];

                ParkAreaStatus status = distance < 14 ? ParkAreaStatus.Waiting : ParkAreaStatus.Empty;

                var result = await this.parkAreaRepositoryAsync.UpdateParkAreaStatus(locationId, status);

                if (status == ParkAreaStatus.Empty)
                {
                    await this.parkRecordRepositoryAsync.StoppedRecord(locationId);
                }

                if(result)
                {
                    responses.Add(new UpdateParkAreaStatusResponce
                    {
                        LocationId = locationId,
                        Status = status
                    });
                }
            }

            return responses;
        }

    }
}
