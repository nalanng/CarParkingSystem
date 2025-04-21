
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
        private readonly IParkRecordRepositoryAsync parkRecordRepositoryAsync;

        public DistanceHubService(IParkAreaRepositoryAsync parkAreaRepositoryAsync, IParkRecordRepositoryAsync parkRecordRepositoryAsync)
        {
            this.parkAreaRepositoryAsync = parkAreaRepositoryAsync;
            this.parkRecordRepositoryAsync = parkRecordRepositoryAsync;
        }

        public async Task<UpdateParkAreaStatusResponce> UpdateParkAreaStatus(UpdateParkAreaStatusRequest distanceRequest)
        {
            ParkAreaStatus status = distanceRequest.Distance < 14 ? ParkAreaStatus.Waiting : ParkAreaStatus.Empty;

            await this.parkAreaRepositoryAsync.UpdateParkAreaStatus(distanceRequest.LocationId, status);

            if(status == ParkAreaStatus.Empty)
            {
                await this.parkRecordRepositoryAsync.StoppedRecord(distanceRequest.LocationId);
            }

            var responce = new UpdateParkAreaStatusResponce
            {
                Status = status,
                LocationId = distanceRequest.LocationId
            };

            return responce;
        }
    }
}
