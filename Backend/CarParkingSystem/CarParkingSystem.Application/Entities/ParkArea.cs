using CarParkingSystem.Core.Enums;
using System.Collections.Generic;

namespace CarParkingSystem.Core.Entities
{
    public class ParkArea: AuditableBaseEntity
    {
        public string Location { get; set; }
        public string QrCode { get; set; }
        public ParkAreaStatus Status { get; set; } 

        public ICollection<ParkRecord> ParkRecords { get; set; } = new List<ParkRecord>();
    }

}
