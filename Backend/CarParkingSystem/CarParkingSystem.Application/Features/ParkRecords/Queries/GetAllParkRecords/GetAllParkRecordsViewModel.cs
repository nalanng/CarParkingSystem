
using System;

namespace CarParkingSystem.Core.Features.ParkRecords.Queries.GetAllParkRecords
{
    public class GetAllParkRecordsViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public decimal Fee { get; set; }
        public int StatusId { get; set; }
    }
}
