
using CarParkingSystem.Core.DTOs.Requests;
using CarParkingSystem.Core.DTOs.Responses;
using System.Threading.Tasks;

namespace CarParkingSystem.Core.Interfaces
{
    public interface IDistanceHubService
    {
        Task<UpdateParkAreaStatusResponce> UpdateParkAreaStatus(UpdateParkAreaStatusRequest distanceRequest);
    }
}
