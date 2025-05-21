
using CarParkingSystem.Core.DTOs.Requests;
using CarParkingSystem.Core.DTOs.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarParkingSystem.Core.Interfaces
{
    public interface IDistanceHubService
    {
        Task<List<UpdateParkAreaStatusResponce>> UpdateParkAreaStatus(UpdateParkAreaStatusRequest distanceRequest);
    }
}
