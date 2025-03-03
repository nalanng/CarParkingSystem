
using CarParkingSystem.Core.Enums;

namespace CarParkingSystem.Core.Features.ParkAreas.Queries.GetAllParkAreas
{
    public class GetAllParkAreasViewModel
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public string QrCode { get; set; }
        public ParkAreaStatus Status { get; set; }

    }
}
