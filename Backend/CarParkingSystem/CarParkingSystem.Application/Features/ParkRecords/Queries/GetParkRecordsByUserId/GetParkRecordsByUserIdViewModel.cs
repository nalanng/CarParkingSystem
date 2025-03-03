
using System;

namespace CarParkingSystem.Core.Features.ParkRecords.Queries.GetParkRecordsByUserId
{
    public class GetParkRecordsByUserIdViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public decimal Fee { get; set; }
        public int StatusId { get; set; }
    }
}
