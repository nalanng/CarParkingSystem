using System;

namespace CarParkingSystem.Core.Entities
{
    public class ParkRecord : AuditableBaseEntity
    {
        public int LotId { get; set; }
        public string UserId { get; set; } 
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public decimal Fee { get; set; }
        public int StatusId { get; set; }   

        public virtual ParkArea Lot { get; set; }
        public virtual RecordStatus Status { get; set; }
    }
}
