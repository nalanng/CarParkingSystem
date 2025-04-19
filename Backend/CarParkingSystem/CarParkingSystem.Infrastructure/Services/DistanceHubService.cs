
using CarParkingSystem.Core.DTOs.Requests;
using CarParkingSystem.Core.DTOs.Responses;
using CarParkingSystem.Core.Enums;
using CarParkingSystem.Core.Interfaces;
using CarParkingSystem.Core.Interfaces.Repositories;
using System.Threading.Tasks;

namespace CarParkingSystem.Infrastructure.Services
{
    public class DistanceHubService : IDistanceHubService
    {
        private readonly IParkAreaRepositoryAsync parkAreaRepositoryAsync;

        public DistanceHubService(IParkAreaRepositoryAsync parkAreaRepositoryAsync)
        {
            this.parkAreaRepositoryAsync = parkAreaRepositoryAsync;
        }

        public async Task<UpdateParkAreaStatusResponce> UpdateParkAreaStatus(UpdateParkAreaStatusRequest distanceRequest)
        {
            ParkAreaStatus status = distanceRequest.Distance < 2 ? ParkAreaStatus.Waiting : ParkAreaStatus.Empty;

            await this.parkAreaRepositoryAsync.UpdateParkAreaStatus(distanceRequest.LocationId, status);

            var responce = new UpdateParkAreaStatusResponce
            {
                Status = status,
                LocationId = distanceRequest.LocationId
            };

            return responce;
        }
    }
}
