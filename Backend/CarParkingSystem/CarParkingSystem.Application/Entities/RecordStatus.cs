using System.Collections.Generic;

namespace CarParkingSystem.Core.Entities
{
    public class RecordStatus
    {
        public int Id { get; set; }
        public string StatusName { get; set; }

        public ICollection<ParkRecord> ParkRecords { get; set; } = new List<ParkRecord>();
    }

}
