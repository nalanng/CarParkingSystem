using CarParkingSystem.Core.Enums;

namespace CarParkingSystem.Core.DTOs.Responses
{
    public class UpdateParkAreaStatusResponce
    {
        public ParkAreaStatus Status { get; set; }
        public int LocationId { get; set; }
    }
}
