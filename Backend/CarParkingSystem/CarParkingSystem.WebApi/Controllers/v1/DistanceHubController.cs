using CarParkingSystem.Core.DTOs.Requests;
using CarParkingSystem.Core.Interfaces;
using CarParkingSystem.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace CarParkingSystem.WebApi.Controllers.v1
{
    public class DistanceHubController : Controller
    {
        private readonly IDistanceHubService distanceHubService;
        private readonly IHubContext<DistanceHub> hubContext;

        public DistanceHubController(IDistanceHubService distanceHubService, IHubContext<DistanceHub> hubContext)
        {
            this.distanceHubService = distanceHubService;
            this.hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> UpdateParkAreaStatus(UpdateParkAreaStatusRequest updateParkAreaStatusRequest)
        {
            var responce = await this.distanceHubService.UpdateParkAreaStatus(updateParkAreaStatusRequest);

            await this.hubContext.Clients.All.SendAsync("ParkAreaStatus", responce);

            return Ok();
        }
    }
}
